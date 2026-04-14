import { akulPlotShapes } from "@/data/akulGardensMap";

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
  position: { x: number; y: number };
  sandalwoodTrees: number;
  yieldPercentage: number;
  benefits: string[];
}

export interface Amenity {
  icon: string;
  title: string;
  description: string;
}

export interface Director {
  name: string;
  role: string;
  image: string;
  experience: string;
  bio: string;
  qualifications: string[];
}

export interface Office {
  name: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  coordinates: [number, number];
  totalPlots: number;
  availablePlots: number;
  priceRange: string;
  plotSizeRange: string;
  description: string;
  highlights: string[];
  amenities: Amenity[];
  plots: Plot[];
  heroImage?: string;
  treeStage: string;
  treeAgeYears: number;
  plantedYear: number;
}

export const firmDetails = {
  name: "Rudra Sandal Projects Ltd",
  tagline: "Premium Red Sandalwood Agroforestry Estates Since 2005",
  offices: [
    {
      name: "Head Office – Bangalore",
      address: "No. 42, MG Road, Jayanagar 4th Block, Bangalore - 560041",
      phone: "+91 80 2634 5678",
      email: "info@rudrasandal.com",
      mapUrl: "https://www.google.com/maps?q=12.9279,77.5831",
    },
    {
      name: "Branch Office – Mysore",
      address: "No. 18, Sayyaji Rao Road, Devaraja Mohalla, Mysore - 570001",
      phone: "+91 821 242 3456",
      email: "mysore@rudrasandal.com",
      mapUrl: "https://www.google.com/maps?q=12.3051,76.6551",
    },
  ] as Office[],
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

export const directors: Director[] = [
  {
    name: "Rajesh Kumar Reddy",
    role: "Managing Director & Founder",
    image: "",
    experience: "25+ years in real estate & agroforestry development",
    bio: "A visionary leader who pioneered the concept of Red Sandalwood agroforestry estates in Karnataka. Under his leadership, Rudra Sandal Projects has delivered over 500 plots across Bangalore, creating a unique blend of sustainable farming and premium land investment.",
    qualifications: [
      "MBA from IIM Bangalore",
      "Certified Agroforestry Consultant",
      "Member, CREDAI Karnataka",
      "Former VP, Karnataka Real Estate Association",
    ],
  },
  {
    name: "Dr. Meena Sharma",
    role: "Director – Forestry & Sustainability",
    image: "",
    experience: "18+ years in forestry science and sustainable development",
    bio: "Dr. Meena brings deep expertise in sandalwood cultivation and sustainable land management. She oversees the agroforestry planning for every project, ensuring optimal tree density, soil health, and long-term yield projections for investors.",
    qualifications: [
      "PhD in Forestry Science, UAS Bangalore",
      "Former Scientist, Indian Institute of Wood Science",
      "Published 40+ research papers on sandalwood cultivation",
      "Recipient, Karnataka State Forestry Award 2019",
    ],
  },
  {
    name: "Vikram Hegde",
    role: "Director – Operations & Sales",
    image: "",
    experience: "15+ years in real estate operations and marketing",
    bio: "Vikram drives the operational excellence at Rudra Sandal Projects. From land acquisition and regulatory approvals to customer engagement and plot delivery, he ensures a seamless experience for every investor and homeowner.",
    qualifications: [
      "B.Tech from NIT Surathkal",
      "PG Diploma in Real Estate Management",
      "Licensed RERA Agent, Karnataka",
      "Member, National Association of Realtors India",
    ],
  },
];

const plotBenefits = [
  ["Corner plot with dual road access", "Extra privacy with boundary walls", "Premium resale value location"],
  ["Park-facing with green views", "Ideal for sandalwood plantation", "Close to community amenities"],
  ["East-facing for morning sunlight", "Vastu-compliant layout", "Near main entrance for accessibility"],
  ["Wide road frontage", "Natural slope for drainage", "Adjacent to landscaped walkway"],
  ["Interior plot with peaceful surroundings", "Maximum plantation area", "Away from traffic noise"],
];

const generatePlots = (count: number, basePrice: number): Plot[] => {
  const facings = ["North", "South", "East", "West", "North-East", "South-West"];
  const statuses: PlotStatus[] = ["available", "available", "booked", "available", "sold", "available"];
  const shapes = akulPlotShapes.slice(0, count);
  return Array.from({ length: count }, (_, i) => {
    const sqft = 1200 + ((i * 87) % 1100);
    const w = Math.round(Math.sqrt(sqft * 1.5));
    const h = Math.round(sqft / w);
    const trees = Math.floor(sqft / 220) + (i % 3);
    const yieldPct = 12 + (i % 14);
    return {
      id: `plot-${i + 1}`,
      number: shapes[i]?.plotNumber ?? `${i + 1}`,
      dimensions: `${w}ft × ${h}ft`,
      sqft,
      price: sqft * basePrice,
      pricePerSqft: basePrice,
      status: statuses[i % statuses.length],
      facing: facings[i % facings.length],
      position: shapes[i] ? { x: (shapes[i].center.x / 1024) * 100, y: (shapes[i].center.y / 581) * 100 } : { x: 10, y: 10 },
      sandalwoodTrees: trees,
      yieldPercentage: Math.round(yieldPct * 10) / 10,
      benefits: plotBenefits[i % plotBenefits.length],
    };
  });
};

const akulGeneratedPlots = generatePlots(123, 3000);
const availableCount = akulGeneratedPlots.filter((plot) => plot.status === "available").length;
const minSqft = Math.min(...akulGeneratedPlots.map((plot) => plot.sqft));
const maxSqft = Math.max(...akulGeneratedPlots.map((plot) => plot.sqft));

export const projects: Project[] = [
  {
    id: "1",
    name: "Akul Gardens",
    slug: "akul-gardens",
    location: "Kumbampadu Village, Pedaraveedu Mandal",
    city: "Markapur District",
    coordinates: [15.7215, 79.2673],
    totalPlots: akulGeneratedPlots.length,
    availablePlots: availableCount,
    priceRange: "Contact for latest pricing",
    plotSizeRange: `${minSqft} - ${maxSqft} sqft`,
    description: "Akul Gardens is a plotted sandalwood project in Kumbampadu Village, Pedaraveedu Mandal, Markapur District. The project follows the approved on-ground layout dated 4th April, 2026, including 60 ft, 30 ft, and 20 ft roads, with status categories mapped as Vacant, Booked, and Registered.",
    highlights: [
      "Layout update as of 4th April, 2026",
      "Located in Kumbampadu Village, Pedaraveedu Mandal",
      "Road network: 60 ft, 30 ft, and 20 ft roads",
      "Plot status legend includes Vacant, Booked, Registered",
    ],
    amenities: [
      { icon: "🛣️", title: "60 ft Main Road", description: "Primary approach road inside the layout." },
      { icon: "🧭", title: "Road Grid", description: "30 ft and 20 ft internal roads for easy access." },
      { icon: "🏠", title: "3 BHK Kerala Guest House", description: "Dedicated guest house block shown in layout." },
      { icon: "🛖", title: "3 Worker Rooms", description: "Worker accommodation provision inside layout." },
      { icon: "🗺️", title: "Plotted Blocks", description: "Clearly demarcated numbered plots in all zones." },
      { icon: "🌱", title: "Sandalwood Focus", description: "Project positioned for long-term plantation value." },
      { icon: "📍", title: "Markapur Region", description: "Located in Markapur District growth corridor." },
      { icon: "📅", title: "Latest Update", description: "Layout status map marked on 4th April, 2026." },
    ],
    plots: akulGeneratedPlots,
    heroImage: "/akul-gardens-layout.png",
    treeStage: "Layout Active",
    treeAgeYears: 0,
    plantedYear: 2026,
  },
];
