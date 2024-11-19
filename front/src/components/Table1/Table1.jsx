import "./Table1.css";
import React, { useState } from 'react'; // Asegúrate de importar useState

function Table1(){
  // Datos de los dispositivos
  const devices = [
    { id: 1, name: 'Robot tierra', type: 'robot-tierra', status: 'entregado' },
    { id: 2, name: 'Dron aire', type: 'dron-aire', status: 'de-regreso' },
    { id: 3, name: 'Carro remoto', type: 'carro-remoto', status: 'entregado' },
    { id: 4, name: 'Carro remoto', type: 'carro-remoto', status: 'de-regreso' },
    { id: 5, name: 'Dron aire', type: 'dron-aire', status: 'en-hangar' },
    { id: 6, name: 'Robot tierra', type: 'robot-tierra', status: 'en-hangar' },
    { id: 7, name: 'Robot tierra', type: 'robot-tierra', status: 'entregado' },
    { id: 8, name: 'Dron aire', type: 'dron-aire', status: 'en-hangar' },
    { id: 9, name: 'Carro remoto', type: 'carro-remoto', status: 'entregado' },
    { id: 10, name: 'Dron aire', type: 'dron-aire', status: 'de-regreso' },
  ];

  const [deviceType, setDeviceType] = useState('');
  const [status, setStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDeviceTypeChange = (event) => setDeviceType(event.target.value);
  const handleStatusChange = (event) => setStatus(event.target.value);
  const handleSearchChange = (event) => setSearchQuery(event.target.value.toLowerCase());
  const handleExpandTable = () => setIsExpanded(!isExpanded);

  const filteredDevices = devices.filter((device) => {
    const matchesType = !deviceType || device.type === deviceType;
    const matchesStatus = !status || device.status === status;
    const matchesSearch = device.name.toLowerCase().includes(searchQuery);
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
            <option value="robot-tierra">Robot tierra</option>
            <option value="dron-aire">Dron aire</option>
            <option value="carro-remoto">Carro remoto</option>
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
            <option value="entregado">Entregado</option>
            <option value="en-hangar">En hangar</option>
            <option value="de-regreso">De regreso</option>
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
              <th>Dispositivo</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <tr key={device.id}>
                  <td><input type="checkbox" /></td>
                  <td>{device.name}</td>
                  <td className={`status status-${device.status}`}>{device.status}</td>
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

