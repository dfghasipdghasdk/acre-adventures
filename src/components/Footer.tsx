import { Link } from "react-router-dom";
import { firmDetails } from "@/data/projects";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube, ExternalLink } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-primary text-primary-foreground">
    <div className="container py-16">
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-heading font-bold text-accent-foreground text-lg">R</div>
            <h3 className="font-heading font-bold text-xl">{firmDetails.name}</h3>
          </div>
          <p className="opacity-60 text-sm leading-relaxed font-body">{firmDetails.tagline}</p>
          <div className="flex gap-3 mt-6">
            {[
              { icon: Instagram, href: firmDetails.socialMedia.instagram },
              { icon: Facebook, href: firmDetails.socialMedia.facebook },
              { icon: Linkedin, href: firmDetails.socialMedia.linkedin },
              { icon: Youtube, href: firmDetails.socialMedia.youtube },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} className="w-9 h-9 rounded-full border border-secondary/30 flex items-center justify-center opacity-60 hover:opacity-100 hover:border-accent transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {firmDetails.offices.map((office) => (
          <div key={office.name}>
            <h4 className="font-heading font-semibold text-accent mb-4">{office.name}</h4>
            <div className="space-y-3 text-sm font-body">
              <div className="flex items-start gap-2 opacity-80">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{office.address}</span>
              </div>
              <a href={`tel:${office.phone}`} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <Phone className="w-4 h-4" /> {office.phone}
              </a>
              <a href={`mailto:${office.email}`} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <Mail className="w-4 h-4" /> {office.email}
              </a>
              <a href={office.mapUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity text-accent">
                <ExternalLink className="w-3 h-3" /> View on Map
              </a>
            </div>
          </div>
        ))}

        <div>
          <h4 className="font-heading font-semibold text-accent mb-4">Quick Links</h4>
          <div className="space-y-2 text-sm font-body">
            <Link to="/" className="block opacity-80 hover:opacity-100 transition-opacity">Home</Link>
            <Link to="/projects" className="block opacity-80 hover:opacity-100 transition-opacity">Projects</Link>
            <Link to="/directors" className="block opacity-80 hover:opacity-100 transition-opacity">Directors</Link>
            <a href="#contact" className="block opacity-80 hover:opacity-100 transition-opacity">Contact</a>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary/20 mt-12 pt-6 text-center text-xs opacity-40 font-body">
        © {new Date().getFullYear()} {firmDetails.name}. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
