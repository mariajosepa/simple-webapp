import "./Table1.css";
import React, { useState, useEffect } from 'react';

function Table1() {
  const [devices, setDevices] = useState([]);
  const [deviceType, setDeviceType] = useState('');
  const [status, setStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Realiza la solicitud a la API
  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchDevices = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/servicios/');
        const data = await response.json();
        
        // Extrae solo los campos necesarios
        const devices = data.flatMap((item) =>
          item.dispositivos.map((device) => ({
            id: device.id,
            type: device.nombre,  // Extrae el nombre del tipo
            status: item.estado.nombre // Extrae el estado del servicio
          }))
        );

        setDevices(devices); // Establece el estado con los dispositivos filtrados
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchDevices();
  }, []);

  const handleDeviceTypeChange = (event) => setDeviceType(event.target.value);
  const handleStatusChange = (event) => setStatus(event.target.value);
  const handleSearchChange = (event) => setSearchQuery(event.target.value.toLowerCase());
  const handleExpandTable = () => setIsExpanded(!isExpanded);

  const filteredDevices = devices.filter((device) => {
    const matchesType = !deviceType || device.type === deviceType;
    const matchesStatus = !status || device.status === status;
    const matchesSearch = device.type.toLowerCase().includes(searchQuery);
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="table-container">
      {/* Encabezado */}
      <div className="table-header">
        <h2 className="table-title">Dispositivos</h2>
        <input
          type="text"
          className="table-search"
          placeholder="Buscar dispositivo"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Opciones de filtro */}
      <div className="filter-options">
        <div className="filter-group">
          <label htmlFor="device-type">Tipo de dispositivo:</label>
          <select
            id="device-type"
            value={deviceType}
            onChange={handleDeviceTypeChange}
            className="filter-select"
          >
            <option value="">Todos</option>
            <option value="Dron">Dron</option>
            <option value="Robot">Robot</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status">Estado:</label>
          <select
            id="status"
            value={status}
            onChange={handleStatusChange}
            className="filter-select"
          >
            <option value="">Todos</option>
            <option value="Recibido">recibido</option>
            <option value="Pendiente">pendiente</option>
            <option value="Cancelado">cancelado</option>
            <option value="No Recibido">no</option>
            <option value="En progreso">en</option>
            <option value="Falla Crítica">falla</option>
            <option value="Llegó al destino">llego</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div
        className="table-wrapper"
        style={{
          maxHeight: isExpanded ? 'none' : '350px',
          overflowY: isExpanded ? 'visible' : 'auto',
        }}
      >
        <table className="devices-table">
          <thead>
            <tr>
              <th>Mostrar en mapa</th>
              <th>Nombre del dispositivo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <tr key={device.id}>
                  <td><input type="checkbox" /></td>
                  <td>{device.type}</td>
                  <td className={`status status-${device.status.toLowerCase().split(" ")[0].normalize("NFD").replace(/[\u0300-\u036f]/g, '')}`}>
                    {device.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-results">
                  No se encontraron dispositivos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mostrar más */}
      <div className="table-show-more" onClick={handleExpandTable}>
        {isExpanded ? 'Mostrar menos' : 'Mostrar más'} 
        {isExpanded ? <span className="arrow">∧</span> : <span className="arrow">∨</span>}
      </div>
    </div>
  );
}

export default Table1;
