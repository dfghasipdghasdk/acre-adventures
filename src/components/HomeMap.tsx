import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { MapPin, TreePine } from "lucide-react";

// Approx bounding box for AP + Telangana: lon 76.5–84.8, lat 19.9 (top) – 12.6 (bottom)
const lonLatToPercent = (lon: number, lat: number) => ({
  left: `${((lon - 76.5) / (84.8 - 76.5)) * 100}%`,
  top: `${((19.9 - lat) / (19.9 - 12.6)) * 100}%`,
});

// Stylised outline of Andhra Pradesh + Telangana (combined), viewBox 0 0 100 100
const APTS_PATH =
  "M22,8 L34,6 L46,9 L55,7 L66,12 L74,16 L80,22 L78,30 L82,36 L86,40 L84,46 L80,50 L76,56 L72,62 L70,70 L66,78 L60,86 L54,92 L48,94 L44,90 L42,84 L38,80 L34,74 L30,68 L28,60 L26,52 L22,46 L18,40 L16,32 L18,24 L20,16 Z";
const TS_DIVIDER =
  "M22,18 L34,22 L46,24 L58,26 L70,28 L78,30";

const HomeMap = () => (
  <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg">
    <div className="relative min-h-[600px]" style={{ backgroundColor: "hsl(45 30% 96%)" }}>
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Andhra Pradesh + Telangana map */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
      >
        <path d={APTS_PATH} fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.4" />
        <path d={TS_DIVIDER} fill="none" stroke="hsl(var(--primary) / 0.5)" strokeWidth="0.25" strokeDasharray="1 1" />
        <text x="40" y="16" fontSize="2.4" fill="hsl(var(--primary))" opacity="0.55" fontWeight="600">TELANGANA</text>
        <text x="50" y="60" fontSize="2.6" fill="hsl(var(--primary))" opacity="0.6" fontWeight="600">ANDHRA PRADESH</text>
      </svg>

      <div className="absolute left-6 top-6 max-w-sm rounded-xl border border-border bg-background/90 p-5 backdrop-blur">
        <div className="flex items-center gap-2 mb-2">
          <TreePine className="h-4 w-4 text-accent" />
          <p className="text-xs font-heading uppercase tracking-[0.24em] text-accent">Project Locator</p>
        </div>
        <h3 className="font-heading text-xl font-bold">Our Agroforestry Estates</h3>
        <p className="mt-2 font-body text-sm text-muted-foreground">Projects across Andhra Pradesh & Telangana. Click a marker to explore plots, pricing, and sandalwood yield data.</p>
      </div>

      {projects.map((project) => {
        const [lat, lon] = project.coordinates;
        const pos = lonLatToPercent(lon, lat);
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
