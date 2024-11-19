import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Para corregir el problema de los íconos de marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = () => {
  // Configuración inicial del mapa
  const position = [51.505, -0.09]; // Coordenadas iniciales (Londres)
  const zoomLevel = 13;

  return (
    <div className="map-container">
      <MapContainer center={position} zoom={zoomLevel} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Estás aquí. <br /> Usa este mapa para explorar.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
