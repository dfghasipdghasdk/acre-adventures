import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeMap from "@/components/HomeMap";
import ProjectCard from "@/components/ProjectCard";
import { projects, firmDetails } from "@/data/projects";
import { Building2, Users, Award, MapPin } from "lucide-react";

const stats = [
  { icon: Building2, label: "Projects", value: `${projects.length}+` },
  { icon: MapPin, label: "Plots Delivered", value: "500+" },
  { icon: Users, label: "Happy Families", value: "350+" },
  { icon: Award, label: "Years of Trust", value: "19+" },
];

const Index = () => (
  <div className="min-h-screen">
    <Header />

    {/* Hero */}
    <section className="gradient-emerald text-primary-foreground py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h1 className="font-heading text-4xl lg:text-6xl font-bold leading-tight mb-4">
            Your Dream <span className="text-gold">Plot</span> Awaits
          </h1>
          <p className="font-body text-lg opacity-80 mb-8 leading-relaxed">
            {firmDetails.tagline}. Explore our premium plotted developments across Bangalore with transparent pricing and easy pre-booking.
          </p>
          <div className="flex gap-4">
            <a href="#projects" className="inline-block gradient-gold text-primary font-heading font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
              Explore Projects
            </a>
            <a href="#contact" className="inline-block border border-secondary/30 text-primary-foreground font-heading font-medium px-6 py-3 rounded-lg hover:border-gold/50 transition-colors">
              Contact Us
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-center"
            >
              <Icon className="w-6 h-6 text-gold mx-auto mb-2" />
              <p className="font-heading text-2xl font-bold">{value}</p>
              <p className="text-sm opacity-60">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Map */}
    <section className="py-16 container">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="font-heading text-3xl font-bold text-center mb-2">Our Project Locations</h2>
        <p className="text-muted-foreground text-center mb-8 font-body">Click on a marker to explore the project</p>
        <HomeMap />
      </motion.div>
    </section>

    {/* Project Cards */}
    <section id="projects" className="py-16 bg-card">
      <div className="container">
        <h2 className="font-heading text-3xl font-bold text-center mb-2">Featured Projects</h2>
        <p className="text-muted-foreground text-center mb-10 font-body">Premium plotted developments with world-class amenities</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
