import { Plot } from "@/data/projects";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  available: "bg-secondary hover:border-gold cursor-pointer",
  booked: "bg-accent/20 border-accent/50 cursor-not-allowed",
  sold: "bg-muted border-muted-foreground/20 cursor-not-allowed opacity-60",
};

const statusLabels: Record<string, string> = {
  available: "Available",
  booked: "Booked",
  sold: "Sold",
};

interface PlotGridProps {
  plots: Plot[];
  onSelectPlot: (plot: Plot) => void;
}

const PlotGrid = ({ plots, onSelectPlot }: PlotGridProps) => (
  <div>
    <div className="flex gap-4 mb-6 text-sm font-body">
      {Object.entries(statusLabels).map(([key, label]) => (
        <div key={key} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded border ${statusColors[key].split(" ")[0]}`} />
          <span className="text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>

    {/* 3D-perspective plot layout */}
    <div className="relative" style={{ perspective: "1200px" }}>
      <motion.div
        className="grid grid-cols-5 gap-3 p-6 bg-card rounded-lg border border-border"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(15deg) rotateY(-5deg)" }}
        whileHover={{ rotateX: 5, rotateY: 0 }}
        transition={{ duration: 0.6 }}
      >
        {plots.map((plot, i) => (
          <motion.button
            key={plot.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => plot.status === "available" && onSelectPlot(plot)}
            className={`relative p-3 rounded-md border transition-all ${statusColors[plot.status]}`}
            style={{ transformStyle: "preserve-3d", transform: "translateZ(10px)" }}
            whileHover={plot.status === "available" ? { translateZ: 30, scale: 1.05 } : {}}
          >
            <p className="font-heading font-bold text-sm">{plot.number}</p>
            <p className="text-xs text-muted-foreground">{plot.sqft} sqft</p>
            <p className="text-xs font-semibold text-gold mt-1">
              ₹{(plot.price / 100000).toFixed(1)}L
            </p>
            <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
              plot.status === "available" ? "bg-green-500" : plot.status === "booked" ? "bg-accent" : "bg-muted-foreground"
            }`} />
          </motion.button>
        ))}
      </motion.div>
    </div>
  </div>
);

export default PlotGrid;
