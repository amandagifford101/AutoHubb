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
import SalespeopleList from './SalespeopleList';
import SalespersonForm from './SalespersonForm';
import CustomerForm from './CustomerForm';
import CustomersList from './CustomersList';
import SaleForm from './CreateSale';
import SalesList from './SaleList';
import TechnicianList from './ListTechnicians';
import CreateTechnician from './CreateTechnician';
import AppointmentList from './ListAppointments';
import AppointmentHistory from './AppointmentHistory';
import CreateAppointment from './CreateAppointment';


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

  const [technicians, setTechnicians] = useState([]);

  async function getTechnicians() {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians);
    }
  }

  const [appointments, setAppointments] = useState([]);

  async function getAppointments() {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments);
    }
  }

  useEffect(() => {
    getVehicleModels();
    getManufacturers();
    getAutomobiles();
    getTechnicians();
    getAppointments();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="models" >
            <Route index element={<VehicleModelsList getVehicleModels={getVehicleModels} vehicleModels={vehicleModels} />} />
            <Route path="create" element={<VehicleModelForm getVehicleModels={getVehicleModels} vehicleModels={vehicleModels}/>} />
          </Route>
          <Route path="manufacturers" >
            <Route index element={<ManufacturersList getManufacturers={getManufacturers} manufacturers={manufacturers} />} />
            <Route path="create" element={<ManufacturerForm />} />
          </Route>
          <Route path="automobiles" >
            <Route index element={<AutomobileList automobiles={automobiles} />} />
            <Route path="create" element={<CreateAutomobile getAutomobiles={getAutomobiles} automobiles={automobiles} getVehicleModels={getVehicleModels} vehicleModels={vehicleModels} />} />
          </Route>
          <Route path="salespeople" >
            <Route index element={<SalespeopleList />} />
            <Route path="create" element={<SalespersonForm />} />
          </Route>
          <Route path="customers" >
            <Route index element={<CustomersList />} />
            <Route path="create" element={<CustomerForm />} />
          </Route>
          <Route path="sales" >
            <Route index element={<SalesList />} />
            <Route path="create" element={<SaleForm getAutomobiles={getAutomobiles} automobiles={automobiles} />} />
          </Route>
          <Route path="technicians">
            <Route index element={<TechnicianList getTechnicians={getTechnicians} technicians={technicians} />} />
            <Route path="create" element={<CreateTechnician getTechnicians={getTechnicians} />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList appointments={appointments} automobiles={automobiles} getAppointments={getAppointments} />} />
            <Route path="history" element={<AppointmentHistory appointments={appointments} automobiles={automobiles} getAppointments={getAppointments} setAppointments={setAppointments} />} />
            <Route path="create" element={<CreateAppointment getAppointments={getAppointments} technicians={technicians} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
