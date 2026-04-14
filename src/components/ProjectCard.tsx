import { Link } from "react-router-dom";
import { Project } from "@/data/projects";
import { MapPin, Grid3X3, TrendingUp } from "lucide-react";

const ProjectCard = ({ project }: { project: Project }) => (
  <Link
    to={`/project/${project.slug}`}
    className="group block overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-accent hover:shadow-xl"
  >
    <div className="relative h-48 gradient-emerald overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-heading text-6xl font-bold text-primary-foreground/15">{project.name.split(" ").pop()}</span>
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-heading font-semibold text-accent-foreground">
        {project.availablePlots} plots available
      </div>
    </div>
    <div className="p-5">
      <h3 className="mb-1 font-heading text-lg font-bold transition-colors group-hover:text-gold">{project.name}</h3>
      <p className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="h-3 w-3" /> {project.location}, {project.city}
      </p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <Grid3X3 className="h-4 w-4 text-gold" />
          <div>
            <p className="text-xs text-muted-foreground">Plots</p>
            <p className="font-semibold">{project.totalPlots}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-gold" />
          <div>
            <p className="text-xs text-muted-foreground">Price Range</p>
            <p className="font-semibold">{project.priceRange}</p>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default ProjectCard;
