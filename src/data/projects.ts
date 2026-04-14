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
  const statuses: PlotStatus[] = ["available", "available", "available", "booked", "sold", "available"];
  return Array.from({ length: count }, (_, i) => {
    const sqft = 1200 + Math.floor(Math.random() * 1800);
    const w = Math.round(Math.sqrt(sqft * 1.5));
    const h = Math.round(sqft / w);
    const trees = Math.floor(sqft / 200) + Math.floor(Math.random() * 3);
    const yieldPct = 12 + Math.random() * 18;
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
      sandalwoodTrees: trees,
      yieldPercentage: Math.round(yieldPct * 10) / 10,
      benefits: plotBenefits[i % plotBenefits.length],
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
    description: "A premium red sandalwood agroforestry estate nestled amidst lush greenery near Kempegowda International Airport. Each plot comes with pre-planted sandalwood saplings and guaranteed yield projections.",
    highlights: [
      "5 mins from KIA Airport",
      "BMRDA Approved",
      "Pre-planted Sandalwood",
      "Gated community with 24/7 security",
    ],
    amenities: [
      { icon: "🌳", title: "Sandalwood Nursery", description: "On-site nursery with 5000+ saplings" },
      { icon: "🏋️", title: "Gymnasium", description: "Fully equipped modern gym" },
      { icon: "🌿", title: "Organic Farm", description: "2 acres of community farming" },
      { icon: "🏸", title: "Sports Arena", description: "Badminton, tennis, basketball courts" },
      { icon: "🏥", title: "Health Center", description: "On-campus medical facility" },
      { icon: "🎪", title: "Clubhouse", description: "15,000 sqft premium clubhouse" },
      { icon: "🛣️", title: "Wide Roads", description: "40ft & 60ft asphalted roads" },
      { icon: "💧", title: "Drip Irrigation", description: "Automated irrigation for all plots" },
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
    description: "Located on the thriving Sarjapur Road corridor, this exclusive agroforestry estate combines red sandalwood investment with premium residential plotting near major IT hubs.",
    highlights: [
      "On Sarjapur Road",
      "Near top IT parks",
      "High-yield sandalwood plots",
      "Investment hotspot",
    ],
    amenities: [
      { icon: "🌲", title: "Sandalwood Walk", description: "1km trail through sandalwood groves" },
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
    description: "Spread across 50 acres of scenic landscape along Mysore Road, this mega agroforestry township offers the best value red sandalwood investment with excellent appreciation potential.",
    highlights: [
      "50 acres mega township",
      "On Mysore Expressway",
      "Maximum sandalwood density",
      "Best value investment",
    ],
    amenities: [
      { icon: "🛕", title: "Temple", description: "Beautifully designed community temple" },
      { icon: "🌳", title: "Sandalwood Forest", description: "10-acre dedicated sandalwood zone" },
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
