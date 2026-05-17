import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What is VentureCapsule?", a: "VentureCapsule is a business, finance and economics competition for students. Participants create, nurture and execute solutions to real-life challenges across subsections including business pitching, financial literacy, case studies and professional mentoring." },
  { q: "Who can participate?", a: "The competition is open to youth worldwide who are interested in business, finance and economics. Teams of 2–6 members register and select a subsection such as Idea Lab, Portfolio Pathways, Intrapreneurship or Case of Crisis." },
  { q: "How is the competition structured?", a: "VentureCapsule features 4 main rounds and 2 bring-back rounds. Eliminated teams can re-enter during bring-back rounds to refine their ideas and come back stronger." },
  { q: "Where and when does it take place?", a: "The competition is held online. Check the Timeline page in your dashboard for the latest dates and details." },
  { q: "What makes VentureCapsule different?", a: "VentureCapsule goes beyond pitching with diverse competition pathways, professional mentoring, idea incubation opportunities after the competition, and a unique bring-back round system." },
  { q: "What are the prizes?", a: "Winners of each subsection receive ₹10,000 and second place receives ₹6,500. All participants receive global certificates." },
];

const DashboardFAQs = () => (
  <div className="max-w-3xl mx-auto">
    <AnimatedSection>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Frequently Asked Questions</h1>
      <p className="text-muted-foreground mb-8">
        Everything you need to know. Still have questions?{" "}
        <Link to="/dashboard/support" className="text-primary hover:underline">Contact support</Link>.
      </p>
    </AnimatedSection>

    <AnimatedSection delay={0.1}>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 border-none">
            <AccordionTrigger className="font-display font-semibold text-left hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </AnimatedSection>
  </div>
);

export default DashboardFAQs;
