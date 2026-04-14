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
    <section className="gradient-emerald text-primary-foreground py-20 lg:py-28">
      <div className="container max-w-3xl">
        <h1 className="font-heading text-4xl lg:text-6xl font-bold leading-tight mb-4">
          Your Dream <span className="text-gold">Plot</span> Awaits
        </h1>
        <p className="font-body text-lg opacity-80 mb-8 leading-relaxed">
          {firmDetails.tagline}. Explore our premium plotted developments across Bangalore with transparent pricing and easy pre-booking.
        </p>
      </div>
    </section>
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
