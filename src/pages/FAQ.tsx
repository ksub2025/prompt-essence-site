import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";

const faqs = [
  { q: "What is VentureCapsule?", a: <>VentureCapsule is a business, finance and economics competition for students. Participants create, nurture and execute solutions to real-life challenges across subsections including business pitching, financial literacy, case studies and professional mentoring. <Link to="/about" className="text-primary hover:underline">Learn more about us</Link>.</> },
  { q: "Who can participate?", a: <>The competition is open to youth worldwide who are interested in business, finance and economics. Teams of 2–6 members <Link to="/register" className="text-primary hover:underline">register</Link> and select a subsection such as Idea Lab, Portfolio Pathways, Intrapreneurship or Case of Crisis.</> },
  { q: "How is the competition structured?", a: <>VentureCapsule features 4 main rounds and 2 bring-back rounds. Eliminated teams can re-enter during bring-back rounds. See the full <Link to="/structure" className="text-primary hover:underline">competition structure</Link> for details.</> },
  { q: "Where and when does it take place?", a: <>The competition is held online. Check the <Link to="/timeline" className="text-primary hover:underline">competition timeline</Link> for the latest dates and details.</> },
  { q: "What makes VentureCapsule different?", a: <>VentureCapsule goes beyond pitching with diverse <Link to="/subsections" className="text-primary hover:underline">competition pathways</Link>, professional mentoring, idea incubation opportunities after the competition, and a unique bring-back round system. See all <Link to="/benefits" className="text-primary hover:underline">participant benefits</Link>.</> },
];

const FAQ = () => {
  return (
    <>
      <section className="pt-8 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">FAQs</p>
              <h1 className="section-headline mb-8">Frequently Asked Questions</h1>
              <p className="body-large">Everything you need to know about the competition. Can't find your answer? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
