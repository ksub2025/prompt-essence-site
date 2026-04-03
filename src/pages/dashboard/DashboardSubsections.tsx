import AnimatedSection from "@/components/AnimatedSection";

const pathways = [
  { emoji: "💡", title: "Idea Lab", description: "Business ideas are made and initiated in this subsection. You make ideas based on your current location to fully develop a business that can survive and make profits within the location you live at." },
  { emoji: "📊", title: "Portfolio Pathways", description: "Making a portfolio is your key goal. You will be given base resources to develop your portfolio, with daily notifications about market trends and economical changes to base your decisions around." },
  { emoji: "⚙️", title: "Intrapreneurship", description: "From a single business, you analyze, manage and develop strategies for its future operations, mapping out the logic behind each action and addressing current problems accordingly." },
  { emoji: "🌀", title: "Case of Crisis", description: "A case study based competition where you handle a specific project as an intrapreneur, using provided documents and bi-daily updates to develop and adapt your approach." },
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
