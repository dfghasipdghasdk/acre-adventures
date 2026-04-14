import { Link } from "react-router-dom";
import { Project } from "@/data/projects";
import { MapPin, Grid3X3, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15, duration: 0.5 }}
  >
    <Link
      to={`/project/${project.slug}`}
      className="group block rounded-lg overflow-hidden bg-card border border-border hover:border-gold/50 transition-all hover:shadow-xl"
    >
      <div className="h-48 gradient-emerald relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-6xl font-bold text-secondary/20">{project.name.split(" ").pop()}</span>
        </div>
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-heading font-semibold px-3 py-1 rounded-full">
          {project.availablePlots} plots available
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-gold transition-colors">{project.name}</h3>
        <p className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3 h-3" /> {project.location}, {project.city}
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4 text-gold" />
            <div>
              <p className="text-muted-foreground text-xs">Plots</p>
              <p className="font-semibold">{project.totalPlots}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gold" />
            <div>
              <p className="text-muted-foreground text-xs">Price Range</p>
              <p className="font-semibold">{project.priceRange}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default ProjectCard;
