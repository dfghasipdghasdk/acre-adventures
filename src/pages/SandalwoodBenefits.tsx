import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TreePine, ArrowRight, TrendingUp, Shield, Leaf, Globe, Gem, Heart } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Exceptional ROI",
    summary: "15–30% annual yield over a 12–15 year growth cycle",
    detail:
      "Red Sandalwood (Pterocarpus santalinus) heartwood is among the most valuable timber globally, fetching ₹20–40 lakh per tonne on the legal market. Each acre can yield 15–20 tonnes at maturity, translating into multi-crore returns on a modest initial investment.",
  },
  {
    icon: Shield,
    title: "Asset-Backed Security",
    summary: "Land + timber = dual appreciating assets",
    detail:
      "Unlike purely financial instruments, your investment is secured by registered agricultural land that appreciates independently. The sandalwood trees growing on it provide a second layer of value that compounds year after year.",
  },
  {
    icon: Leaf,
    title: "Sustainable & Legal",
    summary: "Fully compliant with Karnataka Forest Department regulations",
    detail:
      "Since the 2002 amendment, private cultivation of Red Sandalwood is legal in India. Every project by Rudra Sandal Projects is registered, and harvesting is done with proper transit permits — giving investors peace of mind.",
  },
  {
    icon: Globe,
    title: "Global Demand",
    summary: "Used in luxury furniture, medicine, and cosmetics worldwide",
    detail:
      "Red Sandalwood is prized in China, Japan, and the Middle East for premium furniture, musical instruments, and traditional medicine. International demand consistently outstrips supply, keeping prices on an upward trend.",
  },
  {
    icon: Gem,
    title: "Low Maintenance",
    summary: "Minimal care needed after initial 3-year establishment",
    detail:
      "Once saplings cross the 3-year mark, Red Sandalwood is remarkably hardy. It thrives in the Deccan Plateau climate with minimal irrigation and is naturally resistant to most pests — reducing ongoing maintenance costs.",
  },
  {
    icon: Heart,
    title: "Legacy Investment",
    summary: "A green heritage asset for the next generation",
    detail:
      "Unlike volatile market instruments, a sandalwood estate is a tangible, appreciating asset you can pass on. Many investors choose it as a retirement corpus or a gift for their children's future.",
  },
];

const timeline = [
  { year: "Year 0–2", stage: "Sapling", desc: "Nursery-raised saplings planted with drip irrigation. Height reaches 4–6 ft." },
  { year: "Year 3–5", stage: "Young Growth", desc: "Trees establish deep root systems. Canopy begins forming. Minimal heartwood." },
  { year: "Year 6–8", stage: "Juvenile", desc: "Trunk girth increases. Early heartwood formation begins. Trees reach 15–20 ft." },
  { year: "Year 9–12", stage: "Maturing", desc: "Significant heartwood development. Trees reach 25–30 ft. Wood density increases." },
  { year: "Year 13–15+", stage: "Harvest Ready", desc: "Full heartwood maturity. Optimal harvest window. Maximum timber value achieved." },
];

const SandalwoodBenefits = () => (
  <div className="min-h-screen">
    <Header />

    <section className="gradient-forest py-16 text-primary-foreground">
      <div className="container">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] opacity-60 font-body">Investment Guide</p>
        <h1 className="mb-4 font-heading text-4xl font-bold lg:text-5xl">
          Why Invest in <span className="text-accent">Red Sandalwood</span>?
        </h1>
        <p className="max-w-2xl font-body text-lg opacity-80 leading-relaxed">
          Pterocarpus santalinus — one of the world's most valuable timber species — offers a unique blend of ecological sustainability and outstanding financial returns.
        </p>
      </div>
    </section>

    {/* Benefits Grid */}
    <section className="container py-16">
      <h2 className="mb-2 text-center font-heading text-3xl font-bold">Key Benefits</h2>
      <p className="mb-10 text-center font-body text-muted-foreground">Why savvy investors are choosing Red Sandalwood agroforestry</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map(({ icon: Icon, title, summary, detail }) => (
          <div key={title} className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/40 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
              <Icon className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="mb-1 font-heading text-lg font-bold">{title}</h3>
            <p className="mb-3 font-body text-sm font-medium text-accent">{summary}</p>
            <p className="font-body text-sm leading-relaxed text-muted-foreground">{detail}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Growth Timeline */}
    <section className="bg-card py-16">
      <div className="container">
        <h2 className="mb-2 text-center font-heading text-3xl font-bold">Growth Timeline</h2>
        <p className="mb-10 text-center font-body text-muted-foreground">From sapling to harvest — the red sandalwood journey</p>
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-6 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
          {timeline.map((item, idx) => (
            <div key={item.year} className={`relative mb-10 flex flex-col md:flex-row ${idx % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
              <div className="ml-14 md:ml-0 md:w-1/2 md:px-8">
                <div className="rounded-xl border border-border bg-background p-5">
                  <p className="mb-1 font-heading text-xs font-semibold uppercase tracking-wider text-accent">{item.year}</p>
                  <h4 className="mb-2 font-heading text-lg font-bold">{item.stage}</h4>
                  <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <div className="absolute left-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 border-secondary bg-background md:left-1/2 md:-translate-x-1/2">
                <TreePine className="h-3 w-3 text-secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Quick Facts */}
    <section className="container py-16">
      <div className="mx-auto max-w-4xl rounded-xl border border-accent/30 bg-accent/5 p-8 text-center">
        <TreePine className="mx-auto mb-4 h-10 w-10 text-accent" />
        <h2 className="mb-6 font-heading text-2xl font-bold">Quick Facts</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[
            { label: "Market Price", value: "₹20–40L/tonne" },
            { label: "Growth Cycle", value: "12–15 years" },
            { label: "Yield/Acre", value: "15–20 tonnes" },
            { label: "Legal Since", value: "2002" },
          ].map((f) => (
            <div key={f.label}>
              <p className="font-heading text-2xl font-bold text-secondary">{f.value}</p>
              <p className="text-sm text-muted-foreground">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary py-12 text-center text-primary-foreground">
      <div className="container">
        <h2 className="mb-4 font-heading text-2xl font-bold">Ready to Grow Your Future?</h2>
        <p className="mb-6 font-body opacity-80">Explore our agroforestry projects and secure your plot today.</p>
        <Link to="/projects" className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-heading font-semibold text-accent-foreground transition-opacity hover:opacity-90">
          View Projects <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>

    <Footer />
  </div>
);

export default SandalwoodBenefits;
