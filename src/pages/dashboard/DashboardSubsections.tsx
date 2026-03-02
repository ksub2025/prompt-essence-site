import AnimatedSection from "@/components/AnimatedSection";

const pathways = [
  { emoji: "💡", title: "Initiation", description: "Build business ideas based on your location. Present how you accounted for local challenges and made a thriving business." },
  { emoji: "📊", title: "Path Drawer", description: "Explore financial literacy, manage your own portfolio, and grow your finances using FinLit — our investing simulation tool." },
  { emoji: "⚙️", title: "Operator", description: "Handle decisions and operations of a business as an intrapreneur. Analyse the business and provide the best course of action." },
  { emoji: "🌀", title: "Planned Chaos", description: "Navigate interconnected crisis scenarios across multiple rounds. Each situation links together for a final strategic outcome." },
];

const DashboardSubsections = () => (
  <div className="max-w-3xl mx-auto">
    <AnimatedSection>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Competition Pathways</h1>
      <p className="text-muted-foreground mb-8">Four unique challenges testing different aspects of entrepreneurship, finance, and strategy.</p>
    </AnimatedSection>

    <div className="grid gap-5 md:grid-cols-2">
      {pathways.map((p, i) => (
        <AnimatedSection key={p.title} delay={i * 0.07}>
          <div className="glass-card p-6 h-full">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{p.emoji}</span>
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </div>
);

export default DashboardSubsections;
