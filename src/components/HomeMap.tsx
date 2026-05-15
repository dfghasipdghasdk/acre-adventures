import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { MapPin, TreePine } from "lucide-react";

// Real (simplified) outline of undivided Andhra Pradesh = AP + Telangana combined.
// Source: datameet/geohacker India state boundaries, RDP-simplified, projected to a
// 0..100 viewBox with bbox lon 76.757–84.761, lat 12.612–19.916.
const APTS_PATH =
  "M69.25,44.37 L67.74,44.35 L68.73,44.69 L68.86,46.25 L69.36,46.21 L64.79,48.36 L61.99,49.42 L57.57,48.81 L55.90,50.37 L54.81,53.63 L52.59,56.65 L50.79,56.88 L50.58,55.26 L49.10,54.77 L45.90,55.73 L43.90,57.39 L41.52,61.85 L41.12,64.83 L41.28,68.04 L43.00,70.99 L42.05,76.85 L44.45,85.36 L42.33,81.73 L42.24,83.12 L41.85,81.92 L41.16,83.43 L43.79,84.87 L44.36,86.11 L43.29,84.78 L40.44,84.16 L40.83,84.70 L39.48,86.52 L37.04,87.46 L37.81,88.06 L37.25,88.30 L36.34,87.36 L35.16,87.69 L33.24,86.76 L32.84,87.10 L33.28,88.47 L31.74,89.56 L30.71,89.18 L29.79,90.66 L27.67,89.84 L27.06,90.51 L26.40,89.69 L24.29,90.23 L23.28,91.10 L22.33,94.72 L21.52,94.15 L21.17,95.58 L20.03,95.59 L17.90,94.73 L18.59,92.64 L20.04,91.88 L21.24,92.45 L20.85,91.16 L22.60,88.63 L22.73,87.44 L20.13,86.67 L20.28,83.52 L17.80,83.79 L17.36,82.66 L16.53,82.73 L16.75,80.12 L16.06,79.87 L14.88,80.47 L15.11,78.90 L14.35,79.54 L13.21,79.15 L13.17,80.13 L11.87,81.61 L10.71,81.28 L8.59,82.09 L8.27,80.37 L6.20,80.08 L5.85,79.59 L5.22,80.02 L5.16,79.33 L4.60,80.25 L5.01,81.35 L2.93,81.47 L3.27,79.10 L1.75,76.26 L3.30,76.18 L3.39,77.64 L4.97,78.40 L6.99,78.02 L8.14,79.67 L8.37,78.62 L7.17,77.79 L7.99,76.90 L7.47,76.74 L9.32,76.32 L9.24,74.89 L7.77,74.32 L7.79,75.75 L6.45,74.14 L4.87,74.14 L4.23,75.67 L2.24,75.18 L1.62,73.38 L2.65,72.30 L1.33,72.35 L0.04,70.76 L1.33,66.35 L0.06,66.10 L0.19,64.98 L4.04,65.69 L4.94,64.15 L5.01,62.54 L2.66,59.61 L3.40,59.44 L3.44,57.90 L4.60,57.56 L3.62,56.40 L4.00,54.43 L6.26,53.87 L9.47,54.00 L9.27,50.08 L10.36,49.08 L7.19,48.45 L6.02,47.39 L7.62,47.21 L8.84,45.96 L8.50,44.97 L9.26,40.61 L7.60,38.74 L7.83,38.01 L8.69,37.22 L9.02,36.19 L9.66,36.08 L9.58,35.35 L11.60,34.49 L8.56,33.36 L8.72,32.13 L10.11,31.26 L9.51,30.71 L11.12,28.68 L9.88,27.52 L10.54,27.07 L10.51,24.80 L9.55,23.75 L9.71,22.78 L10.32,22.72 L10.67,21.47 L12.22,21.27 L12.34,19.77 L13.77,18.14 L14.85,17.91 L12.54,15.18 L13.63,14.66 L14.29,12.35 L13.92,12.00 L15.06,11.67 L16.25,12.82 L17.82,12.80 L18.00,10.73 L19.43,10.00 L18.95,7.44 L20.11,5.89 L19.21,5.13 L19.52,4.38 L21.82,5.92 L26.19,6.60 L26.50,7.61 L27.62,7.83 L27.58,8.94 L30.39,10.09 L31.21,8.18 L34.02,9.52 L34.83,9.04 L35.53,9.47 L37.45,8.29 L38.23,8.71 L40.17,10.92 L39.78,13.76 L38.77,14.68 L38.91,15.37 L39.68,15.87 L39.47,18.35 L41.97,19.87 L43.90,19.40 L44.87,20.96 L46.62,20.48 L48.43,21.84 L50.37,25.19 L49.83,26.25 L50.94,25.40 L51.53,26.65 L52.68,26.33 L52.42,27.41 L53.71,31.02 L55.21,30.20 L60.70,30.53 L65.88,27.60 L68.84,28.48 L70.07,26.57 L69.50,25.80 L70.36,24.42 L69.71,24.31 L70.08,23.15 L71.52,21.58 L73.36,25.45 L75.14,24.07 L75.73,22.83 L76.85,23.82 L78.70,23.60 L78.20,22.72 L79.09,21.55 L78.14,20.33 L79.73,18.68 L80.58,19.35 L82.98,17.90 L81.84,15.93 L83.77,16.33 L83.79,14.92 L84.66,15.66 L85.85,13.95 L87.45,16.86 L87.83,15.71 L88.92,18.09 L91.56,19.00 L94.66,18.38 L94.74,17.49 L95.74,16.69 L95.74,15.66 L96.40,16.03 L97.59,15.02 L97.95,15.57 L98.73,14.93 L97.92,14.27 L99.32,14.02 L99.81,15.21 L92.04,24.45 L85.15,28.09 L80.66,33.42 L70.11,39.32 L68.62,41.68 L69.93,42.66 L69.56,40.94 L69.98,41.27 L69.25,44.37Z";

// Same projection used to build APTS_PATH so markers land on real coordinates.
const BBOX = { minLon: 76.757, minLat: 12.612, scale: 12.494, oy: 4.371 };
const lonLatToPercent = (lon: number, lat: number) => ({
  left: `${(lon - BBOX.minLon) * BBOX.scale}%`,
  top: `${100 - ((lat - BBOX.minLat) * BBOX.scale + BBOX.oy)}%`,
});

const HomeMap = () => (
  <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg">
    <div className="relative min-h-[600px]" style={{ backgroundColor: "hsl(45 30% 96%)" }}>
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Andhra Pradesh + Telangana map */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path d={APTS_PATH} fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="0.3" strokeLinejoin="round" />
        <text x="22" y="30" fontSize="2.2" fill="hsl(var(--primary))" opacity="0.55" fontWeight="600">TELANGANA</text>
        <text x="35" y="70" fontSize="2.4" fill="hsl(var(--primary))" opacity="0.6" fontWeight="600">ANDHRA PRADESH</text>
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
