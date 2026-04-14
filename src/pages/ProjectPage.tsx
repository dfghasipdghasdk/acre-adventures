import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projects, Plot } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlotGrid from "@/components/PlotGrid";
import PrebookDialog from "@/components/PrebookDialog";
import { ArrowLeft, MapPin, Grid3X3, Ruler, IndianRupee, ExternalLink } from "lucide-react";

const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [tab, setTab] = useState<"plots" | "amenities">("plots");
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [prebookOpen, setPrebookOpen] = useState(false);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 font-heading text-2xl font-bold">Project not found</h1>
          <Link to="/" className="text-gold underline">Go Home</Link>
        </div>
      </div>
    );
  }

  const handleSelectPlot = (plot: Plot) => {
    setSelectedPlot(plot);
    setPrebookOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="gradient-emerald py-12 text-primary-foreground">
        <div className="container">
          <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm opacity-60 transition-opacity hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
          <h1 className="mb-2 font-heading text-3xl font-bold lg:text-5xl">{project.name}</h1>
          <p className="mb-4 flex items-center gap-1 opacity-70">
            <MapPin className="h-4 w-4" /> {project.location}, {project.city}
          </p>
          <p className="mb-6 max-w-2xl font-body leading-relaxed opacity-80">{project.description}</p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Grid3X3, label: "Total Plots", val: project.totalPlots },
              { icon: Grid3X3, label: "Available", val: project.availablePlots },
              { icon: Ruler, label: "Plot Sizes", val: project.plotSizeRange },
              { icon: IndianRupee, label: "Price Range", val: project.priceRange },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="rounded-lg bg-secondary/10 p-3">
                <Icon className="mb-1 h-4 w-4 text-gold" />
                <p className="text-xs opacity-60">{label}</p>
                <p className="font-heading font-bold">{val}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.highlights.map((highlight) => (
              <span key={highlight} className="rounded-full bg-accent/20 px-3 py-1 text-xs text-gold">{highlight}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="mb-8 flex w-fit gap-1 rounded-lg bg-muted p-1">
          {(["plots", "amenities"] as const).map((nextTab) => (
            <button
              key={nextTab}
              onClick={() => setTab(nextTab)}
              className={`rounded-md px-6 py-2 text-sm font-heading font-medium transition-all ${tab === nextTab ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
            >
              {nextTab === "plots" ? "📍 Plots & Location" : "✨ Amenities"}
            </button>
          ))}
        </div>

        {tab === "plots" ? (
          <div>
            <div className="mb-8 rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 font-heading text-xl font-bold">Project Location</h3>
              <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="min-h-[280px] rounded-lg border border-border bg-[radial-gradient(circle_at_25%_25%,hsl(var(--accent)/0.18),transparent_20%),linear-gradient(135deg,hsl(var(--background)),hsl(var(--card)))] p-6">
                  <p className="text-xs font-heading uppercase tracking-[0.24em] text-gold">Location Overview</p>
                  <h4 className="mt-3 font-heading text-2xl font-bold">{project.location}</h4>
                  <p className="mt-3 max-w-xl font-body text-muted-foreground">This project page is ready for richer GIS-style plotting later. For now, the location module is stable and linked to the dedicated project inventory below.</p>
                </div>
                <div className="rounded-lg border border-border bg-background p-6">
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="mb-4 font-heading text-lg font-bold">{project.city}</p>
                  <p className="text-sm text-muted-foreground">Coordinates</p>
                  <p className="mb-6 font-medium">{project.coordinates[0]}, {project.coordinates[1]}</p>
                  <a
                    href={`https://www.google.com/maps?q=${project.coordinates[0]},${project.coordinates[1]}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-heading text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Open in Maps <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <h3 className="mb-4 font-heading text-xl font-bold">Plot Layout (3D View)</h3>
            <PlotGrid plots={project.plots} onSelectPlot={handleSelectPlot} />
            <p className="mt-4 font-body text-sm text-muted-foreground">Click an available plot to pre-book. Prices are indicative and subject to change.</p>
          </div>
        ) : (
          <div>
            <h3 className="mb-6 font-heading text-xl font-bold">World-Class Amenities</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.amenities.map((amenity) => (
                <div key={amenity.title} className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-gold/30">
                  <span className="mb-3 block text-3xl">{amenity.icon}</span>
                  <h4 className="mb-1 font-heading font-semibold">{amenity.title}</h4>
                  <p className="font-body text-sm text-muted-foreground">{amenity.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <PrebookDialog plot={selectedPlot} projectName={project.name} open={prebookOpen} onOpenChange={setPrebookOpen} />
      <Footer />
    </div>
  );
};

export default ProjectPage;
