import Table1 from "../components/Table1";
import Map from '../components/Map';
import "../styles/Monitoreo.css";
import React from 'react';

function Monitoreo() {
  return (
    <div className="page-container">
      <div className="left-container">
        <Table1 />
      </div>
      <div className="right-container">
        <Map/>
      </div>
    </div>
  );
}


export default Monitoreo;