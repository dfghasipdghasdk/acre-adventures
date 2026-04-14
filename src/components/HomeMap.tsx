import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { MapPin, TreePine } from "lucide-react";

const markerPositions = [
  { left: "62%", top: "62%" },
  { left: "64%", top: "68%" },
  { left: "58%", top: "66%" },
];

const HomeMap = () => (
  <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg">
    <div className="relative min-h-[550px]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='60 5 40 40' fill='none' stroke='%23295e3e' stroke-width='0.15' opacity='0.25'%3E%3Cpath d='M75 8 L78 10 L82 9 L85 11 L88 10 L90 12 L92 11 L93 14 L95 15 L94 18 L96 20 L95 22 L97 24 L96 26 L94 27 L95 29 L93 31 L91 30 L89 32 L87 31 L85 33 L83 32 L81 34 L79 33 L77 35 L75 34 L73 36 L71 35 L69 37 L67 35 L65 36 L64 34 L62 33 L63 31 L61 29 L62 27 L61 25 L62 23 L61 21 L63 19 L62 17 L64 15 L63 13 L65 11 L67 12 L69 10 L71 11 L73 9 Z'/%3E%3Cpath d='M72 18 L74 20 L76 19 L78 21 L80 20 L81 22 L79 24 L80 26 L78 27 L76 26 L74 28 L72 26 L71 24 L72 22 L71 20 Z' fill='%23295e3e' opacity='0.08'/%3E%3Cpath d='M82 22 L84 24 L86 23 L87 25 L85 27 L83 26 L82 24 Z' fill='%23295e3e' opacity='0.06'/%3E%3Ctext x='75' y='16' font-size='1.5' fill='%23295e3e' opacity='0.3' text-anchor='middle'%3EKarnataka%3C/text%3E%3C/svg%3E")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "hsl(45 30% 96%)",
    }}>
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="absolute left-6 top-6 max-w-sm rounded-xl border border-border bg-background/90 p-5 backdrop-blur">
        <div className="flex items-center gap-2 mb-2">
          <TreePine className="h-4 w-4 text-accent" />
          <p className="text-xs font-heading uppercase tracking-[0.24em] text-accent">Project Locator</p>
        </div>
        <h3 className="font-heading text-xl font-bold">Our Agroforestry Estates</h3>
        <p className="mt-2 font-body text-sm text-muted-foreground">Click a project marker to explore plots, pricing, and sandalwood yield data.</p>
      </div>

      {projects.map((project, index) => {
        const pos = markerPositions[index] ?? { left: "50%", top: "50%" };
        return (
          <div key={project.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={pos}>
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg ring-4 ring-background animate-pulse">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="w-[230px] rounded-lg border border-border bg-background/95 p-4 text-center shadow-xl backdrop-blur">
                <h4 className="font-heading text-base font-bold">{project.name}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{project.location}</p>
                <p className="mt-2 text-xs font-medium text-accent">{project.availablePlots} plots available</p>
                <p className="text-xs text-muted-foreground">{project.priceRange}</p>
                <Link
                  to={`/project/${project.slug}`}
                  className="mt-3 inline-flex rounded-md bg-secondary px-4 py-1.5 font-heading text-xs font-semibold text-secondary-foreground transition-opacity hover:opacity-90"
                >
                  Explore Estate →
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
