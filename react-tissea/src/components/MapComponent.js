import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Set default icon for Leaflet markers
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stops");
        setStops(response.data);
      } catch (error) {
        console.error("Error fetching stops:", error);
      }
    };

    fetchStops();
  }, []);

  return (
    <MapContainer
      center={[43.6047, 1.4442]}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stops.map((stop) => (
        <Marker key={stop.id} position={[stop.latitude, stop.longitude]}>
          <Popup>{stop.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
