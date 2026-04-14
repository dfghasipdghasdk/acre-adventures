import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom gold marker
const goldIcon = new L.DivIcon({
  html: `<div style="width:32px;height:32px;background:linear-gradient(135deg,#c9a84c,#e0c97a);border-radius:50%;border:3px solid #064e3b;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:14px;color:#064e3b;box-shadow:0 4px 12px rgba(0,0,0,0.3);">R</div>`,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const HomeMap = () => (
  <div className="w-full h-[500px] rounded-lg overflow-hidden border border-border shadow-lg">
    <MapContainer
      center={[12.97, 77.59]}
      zoom={10}
      className="w-full h-full"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {projects.map((p) => (
        <Marker key={p.id} position={p.coordinates} icon={goldIcon}>
          <Popup>
            <div className="text-center p-1">
              <h3 className="font-bold text-sm mb-1">{p.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{p.location}</p>
              <p className="text-xs mb-2">{p.availablePlots} plots available</p>
              <Link
                to={`/project/${p.slug}`}
                className="inline-block text-xs bg-emerald-800 text-white px-3 py-1 rounded-full hover:bg-emerald-700"
              >
                View Project →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
);

export default HomeMap;
