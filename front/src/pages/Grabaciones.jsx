import '../styles/Grabaciones.css';
import React, { useState } from 'react';
import TableGrabaciones from '../components/TableGrabaciones';
import VideoIcon from '../assets/video.png';

function Grabaciones() {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null); // Estado para el video seleccionado
  const [selectedDeviceName, setSelectedDeviceName] = useState(null); // Estado para el nombre del dispositivo seleccionado

  console.log(selectedVideoUrl, selectedDeviceName);

  return (
    <div className="page-container">
      <div className="left-container">
        {/* Pasa la función de selección al componente TableGrabaciones */}
        <TableGrabaciones 
          onVideoSelect={(url, deviceName) => {
            setSelectedVideoUrl(url);
            setSelectedDeviceName(deviceName); // Actualiza el nombre del dispositivo seleccionado
          }} 
        />
      </div>
      <div className="right-container">
        {/* Mostrar el nombre del dispositivo o el mensaje correspondiente */}
        <div className="map-placeholder">
          <h2>{selectedDeviceName ? selectedDeviceName : "Selecciona un dispositivo"}</h2>
          {selectedVideoUrl ? (
            <video controls width="100%" src={selectedVideoUrl} />
          ) : (
            <img src={VideoIcon} alt="video" id='videoPlaceholder' />
          )}
        </div>
      </div>
    </div>
  );
}

export default Grabaciones;
