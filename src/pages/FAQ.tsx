import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const faqs = [
  { q: "What is VentureCapsule?", a: "VentureCapsule is a business, finance and economics competition for students. Participants create, nurture and execute solutions to real-life challenges across subsections including business pitching, financial literacy, case studies and professional mentoring." },
  { q: "Who can participate?", a: "The competition is open to youth worldwide who are interested in business, finance and economics. Teams of 2–6 members register through the waitlist and select a subsection such as Initiation, Path Drawer, Operator or Planned Chaos." },
  { q: "How is the competition structured?", a: "VentureCapsule features 4 main rounds and 2 bring-back rounds. Eliminated teams can re-enter during bring-back rounds, reflecting the 'nurture and execute' philosophy for refining ideas." },
  { q: "Where and when does it take place?", a: "Check the timeline page for the latest dates and details." },
  { q: "What makes VentureCapsule different?", a: "VentureCapsule goes beyond pitching with diverse subsections, professional mentoring, idea incubation opportunities after the competition, and a unique bring-back round system that gives participants multiple chances to succeed." },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="pt-32 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">FAQs</p>
              <h1 className="section-headline mb-8">Frequently Asked Questions</h1>
              <p className="body-large">Everything you need to know about the competition.</p>
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
      <Footer />
    </div>
  );
};

export default FAQ;
