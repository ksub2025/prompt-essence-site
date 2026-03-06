import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, TrendingUp, FileText, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import HeroScene from "@/components/HeroScene";


const subsectionPreviews = [{
  icon: Briefcase,
  title: "Business Pitching",
  path: "/subsections"
}, {
  icon: TrendingUp,
  title: "Financial Literacy",
  path: "/subsections"
}, {
  icon: FileText,
  title: "Case Studies",
  path: "/subsections"
}, {
  icon: Users,
  title: "Professional Mentoring",
  path: "/subsections"
}];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-line", { opacity: 0, y: 40 });
      gsap.to(".hero-line", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return <div className="min-h-screen bg-background relative">
      <Navigation />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        <div className="section-container relative z-10">
          <div ref={heroRef} className="max-w-4xl">
            <p className="hero-line text-primary text-sm font-medium mb-6 uppercase tracking-widest">
              Business • Finance • Economics
            </p>
            <h1 className="hero-line hero-headline mb-8 font-headline">Venture Capsule</h1>
            <p className="hero-line body-large max-w-2xl mb-10 font-body">Create, nurture, and execute solutions to real-life challenges through our round-based competition system.</p>
            <div className="hero-line flex flex-wrap gap-4">
              <Link to="/waitlist"><Button size="lg" className="group">Join Waitlist<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Button></Link>
              <Link to="/structure"><Button variant="outline" size="lg">How It Works</Button></Link>
            </div>
          </div>
        </div>
      </section>


      <section className="py-24 bg-muted/30">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="section-headline mb-8">What is VentureCapsule?</h2>
              <p className="body-large leading-relaxed">We are an online business, finance and economics based competition that allows students to create, nurture and execute solutions to real life challenges within different subsections. This considers financial literacy, business pitching, case studies and measuring those with professionals as you get to foster new ideas and grow these solutions in our round based competition system.</p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subsectionPreviews.map((section, index) => <AnimatedSection key={section.title} delay={index * 0.1}>
                <Link to={section.path}>
                  <div className="glass-card p-8 text-center hover:border-primary/30 transition-all group cursor-pointer h-full">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <section.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{section.title}</h3>
                  </div>
                </Link>
              </AnimatedSection>)}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="section-headline mb-4 text-center">Frequently Asked Questions</h2>
              <p className="body-large text-center mb-12 text-muted-foreground">Everything you need to know about the competition.</p>
              <div className="space-y-6">
                {[
                  { q: "What is VentureCapsule?", a: "VentureCapsule is a business, finance and economics competition for students. Participants create, nurture and execute solutions to real-life challenges across subsections including business pitching, financial literacy, case studies and professional mentoring." },
                  { q: "Who can participate?", a: "The competition is open to youth worldwide who are interested in business, finance and economics. Teams of 2–6 members register through the waitlist and select a subsection such as Initiation, Path Drawer, Operator or Planned Chaos." },
                  { q: "How is the competition structured?", a: "VentureCapsule features 4 main rounds and 2 bring-back rounds. Eliminated teams can re-enter during bring-back rounds, reflecting the 'nurture and execute' philosophy for refining ideas." },
                  { q: "Where and when does it take place?", a: "Check the timeline page for the latest dates and details." },
                  { q: "What makes VentureCapsule different?", a: "VentureCapsule goes beyond pitching with diverse subsections, professional mentoring, idea incubation opportunities after the competition, and a unique bring-back round system that gives participants multiple chances to succeed." },
                ].map((faq, i) => (
                  <AnimatedSection key={i} delay={i * 0.05}>
                    <div className="glass-card p-6">
                      <h3 className="font-display text-lg font-semibold mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Competition Overview Table */}
      <section className="py-24 bg-muted/30">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="section-headline mb-8 text-center">Competition at a Glance</h2>
              <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-4 font-display font-semibold">Detail</th>
                      <th className="p-4 font-display font-semibold">Info</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr><td className="p-4 font-medium">Event</td><td className="p-4 text-muted-foreground">VentureCapsule Business Pitch Competition</td></tr>
                    <tr><td className="p-4 font-medium">Format</td><td className="p-4 text-muted-foreground">Online</td></tr>
                    <tr><td className="p-4 font-medium">Eligibility</td><td className="p-4 text-muted-foreground">Youth interested in business, finance & economics, <tr><td className="p-4 font-medium">Eligibility</td><td className="p-4 text-muted-foreground">Youth interested in business, finance & economics, teams of 2–6</td></tr></td></tr>
                    <tr><td className="p-4 font-medium">Rounds</td><td className="p-4 text-muted-foreground">4 main rounds + 2 bring-back rounds</td></tr>
                    <tr><td className="p-4 font-medium">Subsections</td><td className="p-4 text-muted-foreground">Initiation · Path Drawer · Operator · Planned Chaos</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>


      <Footer />
    </div>;
};
export default Index;