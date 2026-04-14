import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { MapPin } from "lucide-react";

const markerPositions = [
  { left: "62%", top: "24%" },
  { left: "74%", top: "48%" },
  { left: "42%", top: "68%" },
];

const HomeMap = () => (
  <div className="rounded-lg border border-border bg-card overflow-hidden shadow-lg">
    <div className="relative min-h-[500px] bg-[radial-gradient(circle_at_20%_20%,hsl(var(--accent)/0.18),transparent_18%),radial-gradient(circle_at_80%_30%,hsl(var(--secondary)/0.16),transparent_18%),linear-gradient(135deg,hsl(var(--background)),hsl(var(--card)))]">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute left-6 top-6 max-w-sm rounded-lg border border-border bg-background/90 p-5 backdrop-blur">
        <p className="text-xs font-heading uppercase tracking-[0.24em] text-gold">Project Locator</p>
        <h3 className="mt-2 font-heading text-2xl font-bold">Choose a development to open its dedicated page</h3>
        <p className="mt-2 font-body text-sm text-muted-foreground">Each project has plot inventory, pricing, amenities, and pre-book options.</p>
      </div>

      {projects.map((project, index) => {
        const pos = markerPositions[index] ?? { left: "50%", top: "50%" };
        return (
          <div key={project.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={pos}>
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg ring-4 ring-background animate-pulse">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="w-[250px] rounded-lg border border-border bg-background/95 p-4 text-center shadow-xl backdrop-blur">
                <h4 className="font-heading text-lg font-bold">{project.name}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>
                <p className="mt-3 text-sm font-medium">{project.availablePlots} plots available · {project.priceRange}</p>
                <Link
                  to={`/project/${project.slug}`}
                  className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 font-heading text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Open Project
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default HomeMap;
