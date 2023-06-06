import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelsList from './VehicleModelsList';
import VehicleModelForm from './VehicleModelsForm';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './ListAutomobiles';
import CreateAutomobile from './CreateAutomobile';


//manufacturers and vehicleModels fetched here
function App(props) {

  const [ manufacturers, setManufacturers ] = useState([]);

  async function getManufacturers() {
    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json()
      setManufacturers(data.manufacturers)
    }
  }

  const [vehicleModels, setVehicleModels] = useState([]);

  async function getVehicleModels() {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    // console.log(response);
    if (response.ok) {
      const data = await response.json();
      setVehicleModels(data.models);
    }
  }

  const [automobiles, setAutomobiles] = useState([]);

  async function getAutomobiles() {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    }
  }

  useEffect(() => {
    getVehicleModels();
    getManufacturers();
    getAutomobiles();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="models" >
            <Route index element={<VehicleModelsList getVehicleModels={getVehicleModels} vehicleModels={vehicleModels} />} />
            <Route path="new" element={<VehicleModelForm getVehicleModels={getVehicleModels} vehicleModels={vehicleModels}/>} />
          </Route>
          <Route path="manufacturers" >
            <Route index element={<ManufacturersList getManufacturers={getManufacturers} manufacturers={manufacturers} />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="automobiles" >
            <Route index element={<AutomobileList automobiles={automobiles} />} />
            <Route path="create" element={<CreateAutomobile getAutomobiles={getAutomobiles} automobiles={automobiles} getVehicleModels={getVehicleModels} vehicleModels={vehicleModels} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
