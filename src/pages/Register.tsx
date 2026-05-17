import AnimatedSection from "@/components/AnimatedSection";
import WaitlistForm from "@/components/WaitlistForm";

const Register = () => {
  return (
    <>
      <section className="pt-8 pb-20">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary text-sm font-medium mb-4 uppercase tracking-widest">Join Us</p>
              <h1 className="section-headline mb-8">Join the Waitlist</h1>
              <p className="body-large">Be the first to know when VentureCapsule opens applications. Get exclusive updates and early access.</p>
              <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-left max-w-md mx-auto">
                <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-2">Waitlist Exclusive Pricing</p>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>&#8226; ₹1,100 for teams of 3 members or less</li>
                  <li>&#8226; ₹1,500 for teams of more than 3 members</li>
                </ul>
                <p className="text-muted-foreground text-xs mt-2">Prices will be higher after the waitlist period ends. The waitlist closes after 40 teams register overall, so sign up early!</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-xl mx-auto">
              <WaitlistForm />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Register;
