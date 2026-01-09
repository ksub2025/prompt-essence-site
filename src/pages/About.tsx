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
                Lorem ipsum dolor,
                <br />
                sit amet consectetur
              </h1>
              <p className="body-large">
                Adipiscing elit sed do eiusmod tempor incididunt ut labore 
                et dolore magna aliqua enim ad minim veniam.
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
                  Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                  commodo consequat duis aute irure dolor.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
                  qui officia deserunt mollit anim id est laborum sed ut perspiciatis.
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
                  Unde omnis iste natus error sit voluptatem accusantium 
                  doloremque laudantium totam rem aperiam.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Eaque ipsa quae ab illo inventore veritatis et quasi architecto 
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia 
                  voluptas sit aspernatur aut odit aut fugit sed quia consequuntur.
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
                title: "Excellentia",
                description: "Magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam."
              },
              {
                title: "Integritas",
                description: "Dolorem ipsum quia dolor sit amet consectetur adipisci velit sed quia non."
              },
              {
                title: "Impactum",
                description: "Numquam eius modi tempora incidunt ut labore et dolore magnam aliquam."
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
