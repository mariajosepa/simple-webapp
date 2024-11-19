import Table1 from "../components/Table1";
import Map from '../components/Map';
import "../styles/Monitoreo.css";

function Monitoreo() {
  return (
    <div className="page-container">
      <div className="left-container">
        <Table1 />
      </div>
      <div className="right-container">
        <Map />
        <div className="map-placeholder">Mapa aquí</div>
      </div>
    </div>
  );
}


export default Monitoreo;