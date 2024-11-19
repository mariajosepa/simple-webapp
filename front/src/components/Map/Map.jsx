import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.css'

// Para corregir el problema de los íconos de marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = () => {
  // Configuración inicial del mapa
  const position = [3.349079713975641, -76.5312976793884]; // Coordenadas iniciales (Javeriana)
  const zoomLevel = 73;

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={zoomLevel} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Robot dron. <br /> Aca hay un dron en entrega.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
