// src/pages/TreasureHunt.tsx

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";

// Fix pour l'icône par défaut en ESM/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url)
    .href,
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).href,
});

type Props = {
  title?: string;
};

export default function TreasureHunt({ title = "Chasse au Trésor" }: Props) {
  const [treasurePos, setTreasurePos] = useState<[number, number] | null>(null);
  const [found, setFound] = useState(false);

  // Définit une position aléatoire autour de Paris
  useEffect(() => {
    const lat = 48.8566 + (Math.random() - 0.5) * 0.04;
    const lng = 2.3522 + (Math.random() - 0.5) * 0.04;
    setTreasurePos([lat, lng]);
  }, []);

  // Gère les clics sur la carte
  function ClickHandler() {
    useMapEvents({
      click(e) {
        if (!treasurePos) return;
        const dx = e.latlng.lat - treasurePos[0];
        const dy = e.latlng.lng - treasurePos[1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.0015) {
          setFound(true);
        } else {
          alert(
            dist < 0.01
              ? "Tiens, tu es proche !"
              : "Rien ici, continue de chercher..."
          );
        }
      },
    });
    return null;
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-blue-800 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
      </header>

      {found ? (
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <p className="text-3xl text-green-600 mb-4">🎉 Trésor trouvé ! 🎉</p>
          <Button onClick={() => window.location.reload()}>Rejouer</Button>
        </div>
      ) : (
        <MapContainer
          center={treasurePos || [48.8566, 2.3522]}
          zoom={13}
          className="flex-grow"
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler />
          {/* Pour déboguer, décommente : */}
          {/* {treasurePos && (
            <Marker position={treasurePos}>
              <Popup>Trésor caché ici</Popup>
            </Marker>
          )} */}
        </MapContainer>
      )}
    </div>
  );
}
