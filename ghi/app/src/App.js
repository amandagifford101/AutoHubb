import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelsList from './VehicleModelsList';
import React, { useEffect, useState } from 'react';

//manufacturers and vehicleModels fetched here
function App() {
  const [vehicleModels, setVehicleModels] = useState([]);

  async function getVehicleModels() {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setVehicleModels(data.vehicleModels);
    }
  }

  useEffect(() => {
    getVehicleModels();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route index element={<VehicleModelsList getVehicleModels={getVehicleModels} vehicleModels={vehicleModels} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
