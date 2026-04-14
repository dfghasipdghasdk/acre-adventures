import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const Projects = () => (
  <div className="min-h-screen">
    <Header />

    <section className="gradient-forest py-16 text-primary-foreground">
      <div className="container">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] opacity-60 font-body">Agroforestry Estates</p>
        <h1 className="mb-4 font-heading text-4xl font-bold lg:text-5xl">Our Projects</h1>
        <p className="max-w-xl font-body text-lg opacity-75 leading-relaxed">
          Premium red sandalwood agroforestry estates across Bangalore with transparent pricing and guaranteed yield projections.
        </p>
      </div>
    </section>

    <section className="container py-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>

    <Footer />
  </div>
);

export default Projects;
