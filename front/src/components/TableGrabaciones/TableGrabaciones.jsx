import "./TableGrabaciones.css";
import React, { useState, useEffect } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function TableGrabaciones({onVideoSelect}) {
  const [devices, setDevices] = useState([]); // Para almacenar los datos reales
  const [deviceType, setDeviceType] = useState('');
  const [dateFilter, setDateFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Llamado a la API
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/videos/");
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API");
        }
        const data = await response.json();
        // Transformar los datos para adaptarlos al formato requerido
        const transformedData = data.map(video => ({
          id: video.id,
          name: video.dispositivo.nombre,
          type: video.dispositivo.tipo.nombre.toLowerCase(),
          fecha: video.fecha,
          url: video.url,
        }));
        setDevices(transformedData);
      } catch (error) {
        console.error("Error al obtener los dispositivos:", error);
      }
    };

    fetchDevices();
  }, []);

  // Función para obtener el rango de fechas según el filtro
  const getDateRange = (filter) => {
    const now = new Date();
    if (filter === "ultimo-dia") {
      return new Date(now.setDate(now.getDate() - 1));
    } else if (filter === "ultima-semana") {
      return new Date(now.setDate(now.getDate() - 7));
    } else if (filter === "ultimo-mes") {
      return new Date(now.setMonth(now.getMonth() - 1));
    } else if (filter === "ultimo-ano") {
      return new Date(now.setFullYear(now.getFullYear() - 1));
    }
    return null;
  };

  // Manejadores de estado
  const handleDeviceTypeChange = (event) => setDeviceType(event.target.value);
  const handleDateChange = (event) => setDateFilter(event.target.value);
  const handleSearchChange = (event) => setSearchQuery(event.target.value.toLowerCase());
  const handleExpandTable = () => setIsExpanded(!isExpanded);
  const handleRowClick = (url, name) => { onVideoSelect(url, name); };  // Enviar nombre del dispositivo junto con la URL

  // Filtrado de los dispositivos
  const filteredDevices = devices.filter((device) => {
    const matchesType = !deviceType || device.type.toLowerCase() === deviceType.toLocaleLowerCase();
    const matchesSearch = device.name.toLowerCase().includes(searchQuery);

    let matchesDate = true;
    if (dateFilter) {
      const filterDate = getDateRange(dateFilter);
      const deviceDate = new Date(device.fecha);
      matchesDate = deviceDate >= filterDate;
    }

    return matchesType && matchesDate && matchesSearch;
  });

  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="table-title">Grabaciones</h2>
        <input
          type="text"
          className="table-search"
          placeholder="Buscar dispositivo"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

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
            <option value="Robot">Robot</option>
            <option value="Dron">Dron</option>
            <option value="Carro">Carro</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status">Fecha:</label>
          <select
            id="status"
            value={dateFilter}
            onChange={handleDateChange}
            className="filter-select"
          >
            <option value="">Cualquiera</option>
            <option value="ultimo-dia">1 día</option>
            <option value="ultima-semana">1 semana</option>
            <option value="ultimo-mes">1 mes</option>
            <option value="ultimo-ano">1 año</option>
          </select>
        </div>
      </div>

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
              <th>Fecha</th>
              <th>Dispositivo</th>
              <th>Tipo</th>
              <th>Descargar</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <tr
                  key={device.id}
                  className="table-clickable"
                  onClick={() => handleRowClick(device.url, device.name)} // Llamar a la función con URL y nombre
                >
                  <td>{device.fecha}</td>
                  <td>{device.name}</td>
                  <td>{device.type}</td>
                  <td className="icon-cell">
                    <a href={device.url} download>
                      <ArrowDownwardIcon />
                    </a>
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

      <div className="table-show-more" onClick={handleExpandTable}>
        {isExpanded ? 'Mostrar menos' : 'Mostrar más'} 
        {isExpanded ? <span className="arrow">∧</span> : <span className="arrow">∨</span>}
      </div>
    </div>
  );
}

export default TableGrabaciones;
