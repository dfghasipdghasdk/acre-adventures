import { firmDetails } from "@/data/projects";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-primary text-primary-foreground">
    <div className="container py-16">
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center font-heading font-bold text-primary text-lg">R</div>
            <h3 className="font-heading font-bold text-xl">{firmDetails.name}</h3>
          </div>
          <p className="opacity-60 text-sm leading-relaxed font-body">{firmDetails.tagline}</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-gold mb-4">Contact Us</h4>
          <div className="space-y-3 text-sm font-body">
            <div className="flex items-start gap-2 opacity-80">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{firmDetails.address}</span>
            </div>
            {firmDetails.phone.map(p => (
              <a key={p} href={`tel:${p}`} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <Phone className="w-4 h-4" /> {p}
              </a>
            ))}
            <a href={`mailto:${firmDetails.email}`} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <Mail className="w-4 h-4" /> {firmDetails.email}
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-gold mb-4">Follow Us</h4>
          <div className="flex gap-3">
            {[
              { icon: Instagram, href: firmDetails.socialMedia.instagram },
              { icon: Facebook, href: firmDetails.socialMedia.facebook },
              { icon: Linkedin, href: firmDetails.socialMedia.linkedin },
              { icon: Youtube, href: firmDetails.socialMedia.youtube },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} className="w-10 h-10 rounded-full border border-secondary/30 flex items-center justify-center opacity-60 hover:opacity-100 hover:border-gold transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
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
