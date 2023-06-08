import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Inventory</a>
              <ul class="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/manufacturers">Manunfacturers</NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturers/create">Add Madufacturer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/models">Models</NavLink></li>
                <li><NavLink className="dropdown-item" to="/models/create">Add Model</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles">Vehicles</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles/create">Add Vehicle</NavLink></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Sales</a>
              <ul class="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/salespeople">Salespeople</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salespeople/create">Add Salesperson</NavLink></li>
                <li><NavLink className="dropdown-item" to="/customers">Customers</NavLink></li>
                <li><NavLink className="dropdown-item" to="/customers/create">Add Customer</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales">Sales</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales/create">Add Sale</NavLink></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Service</a>
              <ul class="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/technicians">Technicians</NavLink></li>
                <li><NavLink className="dropdown-item" to="/technicians/create">Add Technician</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments">Appointments</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/create">Schedule Appointment</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/history">Service History</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
