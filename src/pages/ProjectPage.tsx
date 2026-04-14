import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlotGrid from "@/components/PlotGrid";
import { ArrowLeft, MapPin, Grid3X3, Ruler, IndianRupee, ExternalLink, TreePine } from "lucide-react";

const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [tab, setTab] = useState<"plots" | "amenities">("plots");

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 font-heading text-2xl font-bold">Project not found</h1>
          <Link to="/" className="text-accent underline">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section className="gradient-forest py-12 text-primary-foreground">
        <div className="container">
          <Link to="/projects" className="mb-4 inline-flex items-center gap-1 text-sm opacity-60 transition-opacity hover:opacity-100">
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <TreePine className="h-6 w-6 text-accent" />
            <h1 className="font-heading text-3xl font-bold lg:text-5xl">{project.name}</h1>
          </div>
          <p className="mb-4 flex items-center gap-1 opacity-70">
            <MapPin className="h-4 w-4" /> {project.location}, {project.city}
          </p>
          <p className="mb-6 max-w-2xl font-body leading-relaxed opacity-80">{project.description}</p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: Grid3X3, label: "Total Plots", val: project.totalPlots },
              { icon: Grid3X3, label: "Available", val: project.availablePlots },
              { icon: Ruler, label: "Plot Sizes", val: project.plotSizeRange },
              { icon: IndianRupee, label: "Price Range", val: project.priceRange },
              { icon: TreePine, label: "Tree Stage", val: project.treeStage },
              { icon: TreePine, label: "Tree Age", val: `${project.treeAgeYears} yrs (Planted ${project.plantedYear})` },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="rounded-lg bg-secondary/20 p-3">
                <Icon className="mb-1 h-4 w-4 text-accent" />
                <p className="text-xs opacity-60">{label}</p>
                <p className="font-heading font-bold text-sm">{val}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.highlights.map((h) => (
              <span key={h} className="rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">{h}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="mb-8 flex w-fit gap-1 rounded-lg bg-muted p-1">
          {(["plots", "amenities"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-6 py-2 text-sm font-heading font-medium transition-all ${tab === t ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t === "plots" ? "🌳 Plots & Yield" : "✨ Amenities"}
            </button>
          ))}
        </div>

        {tab === "plots" ? (
          <div>
            <div className="mb-8 rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-heading text-xl font-bold">Project Location</h3>
              <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="min-h-[240px] rounded-lg border border-border bg-accent/5 p-6">
                  <p className="text-xs font-heading uppercase tracking-[0.24em] text-accent">Location Overview</p>
                  <h4 className="mt-3 font-heading text-2xl font-bold">{project.location}</h4>
                  <p className="mt-3 max-w-xl font-body text-muted-foreground">
                    The project is presented as an interactive 3D-style plot layout below, where users can select individual plots to view size, facing, pricing, and booking details.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-6">
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="mb-4 font-heading text-lg font-bold">{project.city}</p>
                  <p className="text-sm text-muted-foreground">Layout Status Date</p>
                  <p className="mb-4 font-medium">4th April, 2026</p>
                  <p className="text-sm text-muted-foreground">Coordinates</p>
                  <p className="mb-6 font-medium">{project.coordinates[0]}, {project.coordinates[1]}</p>
                  <a
                    href={`https://www.google.com/maps?q=${project.coordinates[0]},${project.coordinates[1]}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 font-heading text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90"
                  >
                    Open in Maps <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <h3 className="mb-2 font-heading text-xl font-bold">Select a Plot</h3>
            <p className="mb-4 font-body text-sm text-muted-foreground">
              Hover on each plot to view quick details. Click to pin full details for that specific plot.
            </p>
            <PlotGrid plots={project.plots} onSelectPlot={() => {}} />
          </div>
        ) : (
          <div>
            <h3 className="mb-6 font-heading text-xl font-bold">Estate Amenities</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.amenities.map((amenity) => (
                <div key={amenity.title} className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/30">
                  <span className="mb-3 block text-3xl">{amenity.icon}</span>
                  <h4 className="mb-1 font-heading font-semibold">{amenity.title}</h4>
                  <p className="font-body text-sm text-muted-foreground">{amenity.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProjectPage;
