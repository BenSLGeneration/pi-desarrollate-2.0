// src/components/TablaPermisos/TablaPermisos.jsx
import React, { useState } from "react";
import "../../views/Administracion/Administracion.css";

const TablaPermisos = ({ datos }) => {
  const [filtroStatus, setFiltroStatus] = useState("all");

  // Función que maneja el cambio del filtro
  const handleFiltroChange = (e) => {
    setFiltroStatus(e.target.value);
  };

  // Aquí se filtran los datos con un callback
  let datosFiltrados = filtroStatus === "all" 
   ? datos
   : datos.filter((usuario) => usuario.status.toLowerCase() === filtroStatus);
//   if (filtroStatus === "all") {
//     datosFiltrados = datos;
//   } else {
//     datosFiltrados = datos.filter(
//       (usuario) => usuario.status.toLowerCase() === filtroStatus
//     );
//   }

  return (
    <div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table
            className="table table-bordered table-striped"
            id="dataTable"
            width="100%"
            cellSpacing="0"
          >
            <thead className="custom-thead">
              <tr>
                <th className="text-center">ID</th>
                <th>Nombre usuario</th>
                <th>Cargo</th>
                <th>Permisos</th>
                <th>Status</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tfoot className="custom-thead">
              <tr>
                <th className="text-center">ID</th>
                <th>Nombre usuario</th>
                <th>Cargo</th>
                <th>Permisos</th>
                <th className="text-center">Status</th>
                <th>Acciones</th>
              </tr>
            </tfoot>

            <tbody>
              {/* Mapeo de datos dinámicos */}
              {datosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="text-center">{usuario.id}</td>
                  <td>
                    <div className="d-flex align-items-center">
                        <i
                          className="bi bi-person-circle me-2 text-primary"
                          style={{ fontSize: "1.3rem", color: "rgb(0, 81, 255)" }}
                        ></i>
                        {usuario.nombre}
                    </div>
                  </td>
                  <td>{usuario.cargo}</td>
                  <td className="d-flex align-items-center gap-2">
                    <select className="form-select border-secondary w-auto">
                      <option value="admin">Administrador</option>
                      <option value="personnel">Personal</option>
                    </select>
                    <button
                      type="button"
                      className="btn btn-icon"
                      style={{ color: "#5abd5a" }}
                    >
                      <i className="bi bi-check-square-fill"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-icon"
                      style={{ color: "#fb4343" }}
                    >
                      <i className="bi bi-x-square-fill"></i>
                    </button>
                  </td>
                  
                  <td className="text-start align-middle ps-4">
                    <span className={`status-pill ${usuario.status.toLowerCase()}`}>
                        {usuario.status}
                    </span>
                  </td>

                  <td style={{ gap: "20px" }}>
                    <div className="d-flex align-items-center gap-3">
                        <div className="action-button-container">
                        <button 
                          className="btn-icon-plain" 
                          onClick={() => handleView(usuario.id)}
                          >
                          <i className="bi bi-eye text-muted"></i>
                        </button>

                        <button 
                          className="btn-icon-plain" 
                          onClick={() => handleEdit(usuario.id)}
                          >
                          <i className="bi bi-pencil-square text-muted"></i>
                        </button>
                        </div>

                        <div>
                            <button
                            type="button"
                            className="btn btn-danger"
                            style={{ marginTop: "-5px" }}
                            >
                            DESVINCULAR
                            </button>
                        </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaPermisos;