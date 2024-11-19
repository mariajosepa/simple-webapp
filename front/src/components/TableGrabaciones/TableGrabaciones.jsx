import "./TableGrabaciones.css";
import React, { useState } from 'react'; // Asegúrate de importar useState
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Función para generar fechas aleatorias dentro del último año
const generateRandomDate = () => {
  const now = new Date();
  const pastYear = new Date(now.setFullYear(now.getFullYear() - 1));
  const randomTime = pastYear.getTime() + Math.random() * (new Date().getTime() - pastYear.getTime());
  return new Date(randomTime).toISOString().split("T")[0]; // Formato YYYY-MM-DD
};

function TableGrabaciones(){
  // Generar fechas aleatorias para los dispositivos
  const devices = [
    { id: 1, name: 'Robot tierra', type: 'robot-tierra' },
    { id: 2, name: 'Dron aire', type: 'dron-aire' },
    { id: 3, name: 'Carro remoto', type: 'carro-remoto' },
    { id: 4, name: 'Carro remoto', type: 'carro-remoto' },
    { id: 5, name: 'Dron aire', type: 'dron-aire' },
    { id: 6, name: 'Robot tierra', type: 'robot-tierra' },
    { id: 7, name: 'Robot tierra', type: 'robot-tierra' },
    { id: 8, name: 'Dron aire', type: 'dron-aire' },
    { id: 9, name: 'Carro remoto', type: 'carro-remoto' },
    { id: 10, name: 'Dron aire', type: 'dron-aire' },
  ].map((device) => ({
    ...device,
    fecha: generateRandomDate(), // Asignar una fecha aleatoria
  }));

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

  const [deviceType, setDeviceType] = useState('');
  const [dateFilter, setDateFilter] = useState(""); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDeviceTypeChange = (event) => setDeviceType(event.target.value);
  const handleDateChange = (event) => setDateFilter(event.target.value);
  const handleSearchChange = (event) => setSearchQuery(event.target.value.toLowerCase());
  const handleExpandTable = () => setIsExpanded(!isExpanded);

  const filteredDevices = devices.filter((device) => {
    const matchesType = !deviceType || device.type === deviceType;
    const matchesSearch = device.name.toLowerCase().includes(searchQuery);

    // Comparar fechas como objetos Date
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
            <option value="robot-tierra">Robot tierra</option>
            <option value="dron-aire">Dron aire</option>
            <option value="carro-remoto">Carro remoto</option>
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
              <th>Descargar</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <tr key={device.id}>
                  <td>{device.fecha}</td>
                  <td>{device.name}</td>
                  <td><ArrowDownwardIcon/></td>
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
