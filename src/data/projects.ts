export type PlotStatus = "available" | "booked" | "sold";

export interface Plot {
  id: string;
  number: string;
  dimensions: string;
  sqft: number;
  price: number;
  pricePerSqft: number;
  status: PlotStatus;
  facing: string;
  position: { x: number; y: number }; // relative position on layout grid
}

export interface Amenity {
  icon: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  coordinates: [number, number]; // [lat, lng]
  totalPlots: number;
  availablePlots: number;
  priceRange: string;
  plotSizeRange: string;
  description: string;
  highlights: string[];
  amenities: Amenity[];
  plots: Plot[];
  heroImage?: string;
}

export const firmDetails = {
  name: "Rudra Sandal Projects Ltd",
  tagline: "Crafting Premium Land Developments Since 2005",
  address: "No. 42, MG Road, Jayanagar 4th Block, Bangalore - 560041",
  phone: ["+91 80 2634 5678", "+91 98450 12345"],
  email: "info@rudrasandal.com",
  website: "www.rudrasandal.com",
  socialMedia: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
    youtube: "#",
  },
};

const generatePlots = (count: number, basePrice: number): Plot[] => {
  const facings = ["North", "South", "East", "West", "North-East", "South-West"];
  const statuses: PlotStatus[] = ["available", "available", "available", "booked", "sold", "available"];
  return Array.from({ length: count }, (_, i) => {
    const sqft = 1200 + Math.floor(Math.random() * 1800);
    const w = Math.round(Math.sqrt(sqft * 1.5));
    const h = Math.round(sqft / w);
    return {
      id: `plot-${i + 1}`,
      number: `P${String(i + 1).padStart(3, "0")}`,
      dimensions: `${w}ft × ${h}ft`,
      sqft,
      price: sqft * basePrice,
      pricePerSqft: basePrice,
      status: statuses[i % statuses.length],
      facing: facings[i % facings.length],
      position: { x: (i % 5) * 20 + 5, y: Math.floor(i / 5) * 25 + 10 },
    };
  });
};

export const projects: Project[] = [
  {
    id: "1",
    name: "Rudra Sandal Greens",
    slug: "rudra-sandal-greens",
    location: "Devanahalli, Near KIA",
    city: "Bangalore",
    coordinates: [13.2468, 77.7140],
    totalPlots: 120,
    availablePlots: 78,
    priceRange: "₹36L - ₹72L",
    plotSizeRange: "1200 - 2400 sqft",
    description: "A premium plotted development nestled amidst lush greenery near the Kempegowda International Airport. With world-class infrastructure and excellent connectivity, Rudra Sandal Greens offers the perfect blend of nature and urban convenience.",
    highlights: [
      "5 mins from KIA Airport",
      "BMRDA Approved",
      "Close to upcoming Metro",
      "Gated community with 24/7 security",
    ],
    amenities: [
      { icon: "🏊", title: "Swimming Pool", description: "Olympic-sized pool with kids area" },
      { icon: "🏋️", title: "Gymnasium", description: "Fully equipped modern gym" },
      { icon: "🌳", title: "Landscape Gardens", description: "2 acres of curated green spaces" },
      { icon: "🏸", title: "Sports Arena", description: "Badminton, tennis, basketball courts" },
      { icon: "🏥", title: "Health Center", description: "On-campus medical facility" },
      { icon: "🎪", title: "Clubhouse", description: "15,000 sqft premium clubhouse" },
      { icon: "🛣️", title: "Wide Roads", description: "40ft & 60ft asphalted roads" },
      { icon: "💧", title: "Water Supply", description: "Bore well & municipal water" },
    ],
    plots: generatePlots(20, 3000),
  },
  {
    id: "2",
    name: "Rudra Sandal Enclave",
    slug: "rudra-sandal-enclave",
    location: "Sarjapur Road",
    city: "Bangalore",
    coordinates: [12.8680, 77.7860],
    totalPlots: 85,
    availablePlots: 42,
    priceRange: "₹48L - ₹90L",
    plotSizeRange: "1200 - 3000 sqft",
    description: "Located on the thriving Sarjapur Road corridor, Rudra Sandal Enclave is an exclusive gated community designed for those who seek a prestigious address with unmatched connectivity to IT hubs.",
    highlights: [
      "On Sarjapur Road",
      "Near top IT parks",
      "Premium gated community",
      "Investment hotspot",
    ],
    amenities: [
      { icon: "🏊", title: "Infinity Pool", description: "Rooftop infinity-edge pool" },
      { icon: "🧘", title: "Yoga & Meditation", description: "Serene meditation pavilion" },
      { icon: "🌳", title: "Jogging Track", description: "1.2 km landscaped trail" },
      { icon: "🎮", title: "Gaming Zone", description: "Indoor games and activities" },
      { icon: "👶", title: "Children's Play Area", description: "Safe and engaging play zones" },
      { icon: "🏪", title: "Convenience Store", description: "On-site retail shops" },
      { icon: "⚡", title: "Power Backup", description: "24/7 uninterrupted power" },
      { icon: "📹", title: "CCTV Surveillance", description: "Round-the-clock monitoring" },
    ],
    plots: generatePlots(15, 4000),
  },
  {
    id: "3",
    name: "Rudra Sandal Heritage",
    slug: "rudra-sandal-heritage",
    location: "Mysore Road, Bidadi",
    city: "Bangalore",
    coordinates: [12.8010, 77.3870],
    totalPlots: 200,
    availablePlots: 156,
    priceRange: "₹24L - ₹54L",
    plotSizeRange: "1200 - 2400 sqft",
    description: "Spread across 50 acres of scenic landscape along Mysore Road, Rudra Sandal Heritage offers affordable luxury living with excellent appreciation potential. The project is surrounded by nature and upcoming infrastructure developments.",
    highlights: [
      "50 acres mega township",
      "On Mysore Expressway",
      "Temple & cultural center",
      "Best value investment",
    ],
    amenities: [
      { icon: "🛕", title: "Temple", description: "Beautifully designed community temple" },
      { icon: "🏊", title: "Swimming Pool", description: "Family pool with changing rooms" },
      { icon: "🌿", title: "Organic Garden", description: "Community farming plots" },
      { icon: "🏟️", title: "Amphitheatre", description: "Open-air event space" },
      { icon: "🚶", title: "Walking Paths", description: "Tree-lined walking trails" },
      { icon: "🏠", title: "Community Hall", description: "Multi-purpose event hall" },
      { icon: "🔒", title: "Gated Security", description: "Manned gates with visitor mgmt" },
      { icon: "🌊", title: "Rainwater Harvesting", description: "Sustainable water management" },
    ],
    plots: generatePlots(25, 2000),
  },
];
