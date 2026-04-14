import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeMap from "@/components/HomeMap";
import { projects, firmDetails } from "@/data/projects";
import { TreePine, Users, Award, MapPin, ArrowRight } from "lucide-react";

const stats = [
  { icon: TreePine, label: "Projects", value: `${projects.length}+` },
  { icon: MapPin, label: "Plots Delivered", value: "500+" },
  { icon: Users, label: "Happy Families", value: "350+" },
  { icon: Award, label: "Years of Trust", value: "19+" },
];

const Index = () => (
  <div className="min-h-screen">
    <Header />

    <section className="gradient-forest py-20 text-primary-foreground lg:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] opacity-60 font-body flex items-center gap-2">
            <TreePine className="h-4 w-4" /> Red Sandalwood Agroforestry
          </p>
          <h1 className="mb-4 font-heading text-4xl font-bold leading-tight lg:text-6xl">
            Invest in <span className="text-accent">Nature</span>,{" "}
            <span className="text-accent">Grow</span> Your Future
          </h1>
          <p className="mb-8 font-body text-lg leading-relaxed opacity-90">
            {firmDetails.tagline}. Premium plotted agroforestry estates across Bangalore with red sandalwood cultivation, transparent pricing, and guaranteed yield projections.
          </p>
          <div className="flex gap-4">
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-heading font-semibold text-accent-foreground transition-opacity hover:opacity-90">
              Explore Projects <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#contact" className="inline-block rounded-lg border border-secondary/30 px-6 py-3 font-heading font-medium text-primary-foreground transition-colors hover:border-accent/50">
              Contact Us
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <Icon className="mx-auto mb-2 h-6 w-6 text-accent" />
              <p className="font-heading text-2xl font-bold">{value}</p>
              <p className="text-sm opacity-80">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="container py-16">
      <h2 className="mb-2 text-center font-heading text-3xl font-bold">Our Project Locations</h2>
      <p className="mb-8 text-center font-body text-muted-foreground">Choose a project marker to explore its agroforestry estate</p>
      <HomeMap />
    </section>

    <section className="bg-card py-16">
      <div className="container text-center">
        <TreePine className="mx-auto mb-4 h-10 w-10 text-accent" />
        <h2 className="mb-4 font-heading text-3xl font-bold">Why Red Sandalwood?</h2>
        <p className="mx-auto mb-10 max-w-2xl font-body text-muted-foreground">
          Red Sandalwood (Pterocarpus santalinus) is one of the most valuable timber species in the world. 
          Our agroforestry estates combine premium land ownership with sustainable forestry investment.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "High Returns", desc: "15-30% annual yield on sandalwood over 12-15 years", icon: "📈" },
            { title: "Sustainable", desc: "Eco-friendly investment that fights deforestation", icon: "🌱" },
            { title: "Asset Appreciation", desc: "Land value + timber value = dual returns", icon: "💎" },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-background p-6">
              <span className="mb-3 block text-3xl">{item.icon}</span>
              <h3 className="mb-2 font-heading text-lg font-bold">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
        <Link to="/sandalwood-benefits" className="mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          Learn More About Red Sandalwood <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
