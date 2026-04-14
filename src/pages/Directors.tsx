import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { directors } from "@/data/projects";
import { Award, Briefcase, GraduationCap, TreePine } from "lucide-react";

const Directors = () => (
  <div className="min-h-screen">
    <Header />

    <section className="gradient-forest py-16 text-primary-foreground">
      <div className="container">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] opacity-60 font-body">Leadership</p>
        <h1 className="mb-4 font-heading text-4xl font-bold lg:text-5xl">Board of Directors</h1>
        <p className="max-w-xl font-body text-lg opacity-75 leading-relaxed">
          Meet the experienced team driving Rudra Sandal Projects' vision of sustainable agroforestry estates.
        </p>
      </div>
    </section>

    <section className="container py-16">
      <div className="space-y-12">
        {directors.map((director, idx) => (
          <div
            key={director.name}
            className={`flex flex-col gap-8 rounded-xl border border-border bg-card p-8 lg:flex-row ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
          >
            <div className="flex shrink-0 items-center justify-center">
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-secondary/20 border-4 border-secondary/30">
                <TreePine className="h-16 w-16 text-secondary" />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="mb-1 font-heading text-2xl font-bold">{director.name}</h2>
              <p className="mb-3 text-sm font-medium text-accent">{director.role}</p>

              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span>{director.experience}</span>
              </div>

              <p className="mb-6 font-body leading-relaxed text-muted-foreground">{director.bio}</p>

              <div>
                <h4 className="mb-3 flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider">
                  <GraduationCap className="h-4 w-4 text-accent" /> Qualifications & Affiliations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {director.qualifications.map((q) => (
                    <span key={q} className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-foreground">
                      <Award className="h-3 w-3 text-accent" /> {q}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <Footer />
  </div>
);

export default Directors;
