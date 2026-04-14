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

    <section className="gradient-emerald py-20 text-primary-foreground lg:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <h1 className="mb-4 font-heading text-4xl font-bold leading-tight lg:text-6xl">
            Your Dream <span className="text-gold">Plot</span> Awaits
          </h1>
          <p className="mb-8 font-body text-lg leading-relaxed opacity-80">
            {firmDetails.tagline}. Explore our premium plotted developments across Bangalore with transparent pricing and easy pre-booking.
          </p>
          <div className="flex gap-4">
            <a href="#projects" className="inline-block rounded-lg gradient-gold px-6 py-3 font-heading font-semibold text-primary transition-opacity hover:opacity-90">
              Explore Projects
            </a>
            <a href="#contact" className="inline-block rounded-lg border border-secondary/30 px-6 py-3 font-heading font-medium text-primary-foreground transition-colors hover:border-gold/50">
              Contact Us
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <Icon className="mx-auto mb-2 h-6 w-6 text-gold" />
              <p className="font-heading text-2xl font-bold">{value}</p>
              <p className="text-sm opacity-60">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="container py-16">
      <h2 className="mb-2 text-center font-heading text-3xl font-bold">Our Project Locations</h2>
      <p className="mb-8 text-center font-body text-muted-foreground">Choose a project marker to open its dedicated page</p>
      <HomeMap />
    </section>

    <section id="projects" className="bg-card py-16">
      <div className="container">
        <h2 className="mb-2 text-center font-heading text-3xl font-bold">Featured Projects</h2>
        <p className="mb-10 text-center font-body text-muted-foreground">Premium plotted developments with world-class amenities</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
