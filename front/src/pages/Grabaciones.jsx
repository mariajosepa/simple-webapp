import '../styles/Grabaciones.css';
import TableGrabaciones from '../components/TableGrabaciones';
import VideoIcon from '../assets/video.png';

function Grabaciones() {
  return (
    <div className="page-container">
      <div className="left-container">
        <TableGrabaciones />
      </div>
      <div className="right-container">
        {/* Aquí puedes incluir el mapa u otro componente */}
        <div className="map-placeholder">
          <h2>Dispositivo</h2>
          <img src={VideoIcon} alt="video" id='videoPlaceholder' />
        </div>
      </div>
    </div>
  );
}


export default Grabaciones;