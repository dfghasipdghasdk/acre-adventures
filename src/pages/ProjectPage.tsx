import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projects, Plot } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlotGrid from "@/components/PlotGrid";
import PrebookDialog from "@/components/PrebookDialog";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Grid3X3, Ruler, IndianRupee } from "lucide-react";

const goldIcon = new L.DivIcon({
  html: `<div style="width:40px;height:40px;background:linear-gradient(135deg,#c9a84c,#e0c97a);border-radius:50%;border:3px solid #064e3b;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:16px;color:#064e3b;box-shadow:0 4px 12px rgba(0,0,0,0.3);">R</div>`,
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [tab, setTab] = useState<"plots" | "amenities">("plots");
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [prebookOpen, setPrebookOpen] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Project not found</h1>
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

      {/* Hero */}
      <section className="gradient-emerald text-primary-foreground py-12">
        <div className="container">
          <Link to="/" className="inline-flex items-center gap-1 text-sm opacity-60 hover:opacity-100 mb-4 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mb-2">{project.name}</h1>
            <p className="flex items-center gap-1 opacity-70 mb-4">
              <MapPin className="w-4 h-4" /> {project.location}, {project.city}
            </p>
            <p className="max-w-2xl opacity-80 font-body leading-relaxed mb-6">{project.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Grid3X3, label: "Total Plots", val: project.totalPlots },
                { icon: Grid3X3, label: "Available", val: project.availablePlots },
                { icon: Ruler, label: "Plot Sizes", val: project.plotSizeRange },
                { icon: IndianRupee, label: "Price Range", val: project.priceRange },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="bg-secondary/10 rounded-lg p-3">
                  <Icon className="w-4 h-4 text-gold mb-1" />
                  <p className="text-xs opacity-60">{label}</p>
                  <p className="font-heading font-bold">{val}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {project.highlights.map((h) => (
                <span key={h} className="text-xs bg-accent/20 text-gold px-3 py-1 rounded-full">{h}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="container py-8">
        <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit mb-8">
          {(["plots", "amenities"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-md font-heading font-medium text-sm transition-all ${
                tab === t ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "plots" ? "📍 Plots & Map" : "✨ Amenities"}
            </button>
          ))}
        </div>

        {tab === "plots" ? (
          <motion.div key="plots" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Project Location Map */}
            <div className="mb-8">
              <h3 className="font-heading text-xl font-bold mb-4">Project Location</h3>
              <div className="h-[350px] rounded-lg overflow-hidden border border-border">
                <MapContainer center={project.coordinates} zoom={13} className="w-full h-full" scrollWheelZoom={false}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={project.coordinates} icon={goldIcon}>
                    <Popup>
                      <strong>{project.name}</strong><br />{project.location}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Plot Grid with 3D */}
            <h3 className="font-heading text-xl font-bold mb-4">Plot Layout (3D View)</h3>
            <PlotGrid plots={project.plots} onSelectPlot={handleSelectPlot} />
            <p className="text-sm text-muted-foreground mt-4 font-body">
              Click on an available plot to pre-book. Prices are indicative and subject to change.
            </p>
          </motion.div>
        ) : (
          <motion.div key="amenities" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="font-heading text-xl font-bold mb-6">World-Class Amenities</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.amenities.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border rounded-lg p-5 hover:border-gold/30 transition-colors"
                >
                  <span className="text-3xl mb-3 block">{a.icon}</span>
                  <h4 className="font-heading font-semibold mb-1">{a.title}</h4>
                  <p className="text-sm text-muted-foreground font-body">{a.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <PrebookDialog
        plot={selectedPlot}
        projectName={project.name}
        open={prebookOpen}
        onOpenChange={setPrebookOpen}
      />

      <Footer />
    </div>
  );
};

export default ProjectPage;
