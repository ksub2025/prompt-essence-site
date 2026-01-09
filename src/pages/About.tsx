import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">About Us</p>
              <h1 className="section-headline mb-8">
                Building the future,
                <br />
                one idea at a time
              </h1>
              <p className="body-large">
                We believe that extraordinary ideas can come from anywhere. Our mission is 
                to find them, nurture them, and help them change the world.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="glass-card aspect-square flex items-center justify-center">
                <span className="text-8xl font-display font-bold gradient-text">01</span>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div>
                <h2 className="font-display text-3xl font-bold mb-6">Our Mission</h2>
                <p className="body-large mb-6">
                  IGNITE was founded on a simple premise: the most transformative ideas often 
                  lack the resources and support needed to reach their full potential.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We exist to bridge that gap. Through rigorous competition, expert mentorship, 
                  and strategic investment, we identify and accelerate the innovations that will 
                  define the next decade—whether in technology, sustainability, healthcare, or beyond.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <div>
                <h2 className="font-display text-3xl font-bold mb-6">Our Vision</h2>
                <p className="body-large mb-6">
                  We envision a world where brilliant ideas are never held back by 
                  circumstance, geography, or lack of access to resources.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By creating an inclusive, global platform for innovation, we're building 
                  a future where the next breakthrough can come from anyone, anywhere. Our 
                  alumni network spans six continents and includes founders who have raised 
                  over $500 million in combined funding.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} className="order-1 lg:order-2">
              <div className="glass-card aspect-square flex items-center justify-center">
                <span className="text-8xl font-display font-bold gradient-text">02</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="section-container">
          <AnimatedSection>
            <h2 className="section-headline mb-16 text-center">What We Stand For</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description: "We pursue the highest standards in everything we do, from selection to mentorship to outcomes."
              },
              {
                title: "Integrity",
                description: "Transparency and honesty guide every decision. We build trust through action."
              },
              {
                title: "Impact",
                description: "Ideas are only as valuable as the change they create. We focus on real-world results."
              }
            ].map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.15}>
                <div className="text-center">
                  <h3 className="font-display text-2xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
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

export default About;
