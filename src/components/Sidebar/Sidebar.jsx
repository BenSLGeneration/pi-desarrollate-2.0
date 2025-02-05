import React from "react";
import { Link } from "react-router-dom";



const Sidebar = () => {
  return (
    <div 
      className="bg-dark text-white d-flex flex-column p-3 vh-100" 
      style={{ 
        minHeight: "100vh",
        width: "fit-content",
        transition: "width 0.3s ease-in-out"
      }}
    >
      <h4 className="text-center d-none d-sm-block">Menú</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/dashboard">
            <button type="button" className="btn btn-dark w-100 text-start border-0 d-flex align-items-center">
              <i className="bi bi-house-fill me-2 fs-4"></i> 
              <span className="d-none d-sm-inline">Home</span>  
            </button>  
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/reservaciones" >
            <button type="button" className="btn btn-dark w-100 text-start border-0 d-flex align-items-center">
              <i className="bi bi-table me-2 fs-4"></i> 
              <span className="d-none d-sm-inline">Reservas</span>
            </button>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/administracion">
            <button type="button" className="btn btn-dark w-100 text-start border-0 d-flex align-items-center">
              <i className="bi bi-key me-2 fs-4"></i> 
              <span className="d-none d-sm-inline">Permisos</span>
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;