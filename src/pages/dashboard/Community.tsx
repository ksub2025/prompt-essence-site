import { useState, useEffect, useCallback } from "react";
import { MessageSquare, Heart, Flag, Reply, Send, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedSection from "@/components/AnimatedSection";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Comment {
  id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  display_name: string;
  created_at: string;
  likes_count: number;
  liked_by_me: boolean;
  replies: Comment[];
}

const REPORT_REASONS = [
  "Spam or misleading",
  "Harassment or hate speech",
  "Inappropriate content",
  "Off-topic",
  "Other",
];

const Community = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userDisplayName, setUserDisplayName] = useState("");
  const [reportDialog, setReportDialog] = useState<{ open: boolean; commentId: string; content: string; author: string }>({ open: false, commentId: "", content: "", author: "" });
  const [reportReason, setReportReason] = useState("");
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const fetchComments = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const currentUserId = user?.id || null;
    setUserId(currentUserId);

    if (user) {
      const meta = user.user_metadata;
      setUserDisplayName(meta?.full_name || meta?.name || user.email?.split("@")[0] || "User");
    }

    const { data: commentsData, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch comments:", error);
      return;
    }

    const { data: likesData } = await supabase
      .from("comment_likes")
      .select("comment_id, user_id");

    const likesMap = new Map<string, { count: number; likedByMe: boolean }>();
    (likesData || []).forEach((like: { comment_id: string; user_id: string }) => {
      const existing = likesMap.get(like.comment_id) || { count: 0, likedByMe: false };
      existing.count++;
      if (like.user_id === currentUserId) existing.likedByMe = true;
      likesMap.set(like.comment_id, existing);
    });

    const allComments: Comment[] = (commentsData || []).map((c: any) => ({
      id: c.id,
      user_id: c.user_id,
      parent_id: c.parent_id,
      content: c.content,
      display_name: c.display_name,
      created_at: c.created_at,
      likes_count: likesMap.get(c.id)?.count || 0,
      liked_by_me: likesMap.get(c.id)?.likedByMe || false,
      replies: [],
    }));

    // Build tree
    const topLevel: Comment[] = [];
    const childMap = new Map<string, Comment[]>();

    allComments.forEach((c) => {
      if (c.parent_id) {
        const existing = childMap.get(c.parent_id) || [];
        existing.push(c);
        childMap.set(c.parent_id, existing);
      } else {
        topLevel.push(c);
      }
    });

    topLevel.forEach((c) => {
      c.replies = (childMap.get(c.id) || []).sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });

    setComments(topLevel);
  }, []);

  useEffect(() => {
    fetchComments();

    const channel = supabase
      .channel("community-comments")
      .on("postgres_changes", { event: "*", schema: "public", table: "comments" }, () => fetchComments())
      .on("postgres_changes", { event: "*", schema: "public", table: "comment_likes" }, () => fetchComments())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchComments]);

  const handleSubmit = async (parentId: string | null = null) => {
    if (!userId) {
      toast({ title: "Sign in required", description: "Please sign in to comment.", variant: "destructive" });
      return;
    }

    const content = parentId ? replyContent.trim() : newComment.trim();
    if (!content) return;

    setIsSubmitting(true);
    const { error } = await supabase.from("comments").insert({
      user_id: userId,
      parent_id: parentId,
      content,
      display_name: userDisplayName,
    });
    setIsSubmitting(false);

    if (error) {
      toast({ title: "Error", description: "Failed to post comment.", variant: "destructive" });
      return;
    }

    if (parentId) {
      setReplyContent("");
      setReplyTo(null);
      setExpandedReplies((prev) => new Set(prev).add(parentId));
    } else {
      setNewComment("");
    }
  };

  const handleLike = async (commentId: string, liked: boolean) => {
    if (!userId) {
      toast({ title: "Sign in required", description: "Please sign in to like.", variant: "destructive" });
      return;
    }

    if (liked) {
      await supabase.from("comment_likes").delete().eq("comment_id", commentId).eq("user_id", userId);
    } else {
      await supabase.from("comment_likes").insert({ comment_id: commentId, user_id: userId });
    }
  };

  const handleDelete = async (commentId: string) => {
    const { error } = await supabase.from("comments").delete().eq("id", commentId);
    if (error) {
      toast({ title: "Error", description: "Failed to delete.", variant: "destructive" });
    }
  };

  const handleReport = async () => {
    if (!reportReason) {
      toast({ title: "Select a reason", variant: "destructive" });
      return;
    }

    const { error } = await supabase.functions.invoke("report-comment", {
      body: {
        commentId: reportDialog.commentId,
        reason: reportReason,
        commentContent: reportDialog.content,
        commentAuthor: reportDialog.author,
      },
    });

    if (error) {
      toast({ title: "Error", description: "Failed to submit report.", variant: "destructive" });
    } else {
      toast({ title: "Reported", description: "Thank you. We'll review this comment." });
    }

    setReportDialog({ open: false, commentId: "", content: "", author: "" });
    setReportReason("");
  };

  const toggleReplies = (id: string) => {
    setExpandedReplies((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? "ml-8 md:ml-12 border-l-2 border-border pl-4" : ""}`}>
      <div className="glass-card p-4 md:p-5 mb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
              {getInitials(comment.display_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-foreground">{comment.display_name}</span>
              <span className="text-xs text-muted-foreground">{timeAgo(comment.created_at)}</span>
            </div>
            <p className="text-sm text-foreground/90 mt-1.5 whitespace-pre-wrap break-words">{comment.content}</p>

            <div className="flex items-center gap-1 mt-3 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                className={`h-7 px-2 text-xs gap-1 ${comment.liked_by_me ? "text-red-400" : "text-muted-foreground"}`}
                onClick={() => handleLike(comment.id, comment.liked_by_me)}
              >
                <Heart className={`w-3.5 h-3.5 ${comment.liked_by_me ? "fill-red-400" : ""}`} />
                {comment.likes_count > 0 && comment.likes_count}
              </Button>

              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs gap-1 text-muted-foreground"
                  onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                >
                  <Reply className="w-3.5 h-3.5" />
                  Reply
                </Button>
              )}

              {userId && userId !== comment.user_id && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs gap-1 text-muted-foreground"
                  onClick={() =>
                    setReportDialog({
                      open: true,
                      commentId: comment.id,
                      content: comment.content,
                      author: comment.display_name,
                    })
                  }
                >
                  <Flag className="w-3.5 h-3.5" />
                  Report
                </Button>
              )}

              {userId === comment.user_id && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs gap-1 text-destructive"
                  onClick={() => handleDelete(comment.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Reply input */}
        {replyTo === comment.id && (
          <div className="mt-3 ml-11 flex gap-2">
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="min-h-[60px] text-sm flex-1"
            />
            <Button
              size="sm"
              className="self-end"
              disabled={isSubmitting || !replyContent.trim()}
              onClick={() => handleSubmit(comment.id)}
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        )}
      </div>

      {/* Replies */}
      {!isReply && comment.replies.length > 0 && (
        <div className="mb-3">
          <button
            className="text-xs text-primary font-medium flex items-center gap-1 ml-2 mb-2 hover:underline"
            onClick={() => toggleReplies(comment.id)}
          >
            {expandedReplies.has(comment.id) ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
          </button>
          {expandedReplies.has(comment.id) &&
            comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatedSection>
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h1 className="font-display text-2xl md:text-3xl font-bold">Community</h1>
        </div>
        <p className="text-muted-foreground mb-8">
          Share ideas, ask questions, and connect with fellow participants.
        </p>
      </AnimatedSection>

      {/* New comment box */}
      <AnimatedSection delay={0.1}>
        {userId ? (
          <div className="glass-card p-4 md:p-5 mb-8">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-[80px] mb-3"
            />
            <div className="flex justify-end">
              <Button
                disabled={isSubmitting || !newComment.trim()}
                onClick={() => handleSubmit(null)}
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                Post
              </Button>
            </div>
          </div>
        ) : (
          <div className="glass-card p-6 mb-8 text-center">
            <p className="text-muted-foreground">Sign in to join the conversation.</p>
          </div>
        )}
      </AnimatedSection>

      {/* Comments list */}
      <AnimatedSection delay={0.2}>
        {comments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No comments yet. Be the first to share!</p>
          </div>
        ) : (
          comments.map((comment) => renderComment(comment))
        )}
      </AnimatedSection>

      {/* Report dialog */}
      <Dialog open={reportDialog.open} onOpenChange={(open) => !open && setReportDialog({ open: false, commentId: "", content: "", author: "" })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Comment</DialogTitle>
            <DialogDescription>
              Why are you reporting this comment by {reportDialog.author}?
            </DialogDescription>
          </DialogHeader>
          <Select value={reportReason} onValueChange={setReportReason}>
            <SelectTrigger>
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              {REPORT_REASONS.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportDialog({ open: false, commentId: "", content: "", author: "" })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReport} disabled={!reportReason}>
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Community;
