import Table1 from "../components/Table1";
import "../styles/Monitoreo.css";

function Monitoreo() {
  return (
    <div className="page-container">
      <div className="left-container">
        <Table1 />
      </div>
      <div className="right-container">
        {/* Aquí puedes incluir el mapa u otro componente */}
        <div className="map-placeholder">Mapa aquí</div>
      </div>
    </div>
  );
}


export default Monitoreo;