import { Link } from "react-router-dom";
import { firmDetails } from "@/data/projects";

const Header = () => (
  <header className="sticky top-0 z-50 bg-forest-deep text-primary-foreground shadow-lg">
    <nav className="border-b border-secondary/40">
      <div className="container flex items-center justify-between py-5">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/rudraa-logo.png"
            alt={`${firmDetails.name} logo`}
            className="h-14 w-14 rounded-full border border-accent/40 object-cover bg-white"
          />
          <div>
            <h1 className="font-heading font-bold text-xl leading-tight text-[hsl(var(--red-accent))]">{firmDetails.name}</h1>
            <p className="text-xs text-gold-light font-body uppercase tracking-[0.16em]">Green to Gold</p>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6 font-body text-sm">
          <Link to="/" className="text-[hsl(var(--red-accent))] hover:opacity-80 transition-opacity">Home</Link>
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
