import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useRef } from "react";
import axios from "axios";

// Helper component to fix map size issues
function FixMapSize() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return null;
}

function MapView({ route, onRouteReady }) {
  const routingRef = useRef(null);

  useEffect(() => {
    if (!route) return;

    async function drawRoute(map) {
      // 🔹 Geocode places
      const fromRes = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        { params: { q: route.from, format: "json" } }
      );

      const toRes = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        { params: { q: route.to, format: "json" } }
      );

      const from = {
        lat: parseFloat(fromRes.data[0].lat),
        lng: parseFloat(fromRes.data[0].lon),
      };

      const to = {
        lat: parseFloat(toRes.data[0].lat),
        lng: parseFloat(toRes.data[0].lon),
      };

      // 🧹 Remove old route
      if (routingRef.current) {
        map.removeControl(routingRef.current);
      }

      // 🛣️ Add new route
      routingRef.current = L.Routing.control({
        waypoints: [
          L.latLng(from.lat, from.lng),
          L.latLng(to.lat, to.lng),
        ],
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: false,
      }).addTo(map);

      routingRef.current.on("routesfound", (e) => {
        const distanceKm =
          e.routes[0].summary.totalDistance / 1000;

        onRouteReady({ from, to, distanceKm });
      });
    }

    // Get map instance safely
    const map = document.querySelector(".leaflet-container")?._leaflet_map;
    if (map) drawRoute(map);
  }, [route, onRouteReady]);

  return (
    <MapContainer
      center={[19.076, 72.8777]} // Mumbai
      zoom={6}
      style={{ height: "400px", width: "100%" }}
    >
      <FixMapSize />

      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default MapView;
