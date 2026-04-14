import { Link } from "react-router-dom";
import { firmDetails } from "@/data/projects";
import { Phone, Mail, TreePine } from "lucide-react";

const Header = () => (
  <header className="bg-primary text-primary-foreground">
    <div className="container flex items-center justify-between py-3 text-sm">
      <div className="flex items-center gap-4">
        <a href={`tel:${firmDetails.phone[0]}`} className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
          <Phone className="w-3 h-3" /> {firmDetails.phone[0]}
        </a>
        <a href={`mailto:${firmDetails.email}`} className="hidden sm:flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
          <Mail className="w-3 h-3" /> {firmDetails.email}
        </a>
      </div>
    </div>
    <nav className="border-t border-secondary/20">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
            <TreePine className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg leading-tight">{firmDetails.name}</h1>
            <p className="text-xs opacity-60 font-body">Agroforestry Estates</p>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6 font-body text-sm">
          <Link to="/" className="text-accent hover:opacity-80 transition-opacity">Home</Link>
          <Link to="/projects" className="opacity-80 hover:opacity-100 transition-opacity">Projects</Link>
          <Link to="/sandalwood-benefits" className="opacity-80 hover:opacity-100 transition-opacity">Why Sandalwood</Link>
          <Link to="/directors" className="opacity-80 hover:opacity-100 transition-opacity">Directors</Link>
          <a href="#contact" className="opacity-80 hover:opacity-100 transition-opacity">Contact</a>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
