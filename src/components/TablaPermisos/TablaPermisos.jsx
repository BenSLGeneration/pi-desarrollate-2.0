// src/components/TablaPermisos/TablaPermisos.jsx
import React, { useState } from "react";
import "../../views/Administracion/Administracion.css";

const TablaPermisos = ({ datos, onAddUser }) => {
  const [filtroStatus, setFiltroStatus] = useState("all");

  // Función que maneja el cambio del filtro
  const handleFiltroChange = (e) => {
    setFiltroStatus(e.target.value);
  };

  // Aquí se filtran los datos con un callback
  let datosFiltrados;
  if (filtroStatus === "all") {
    datosFiltrados = datos;
  } else {
    datosFiltrados = datos.filter(
      (usuario) => usuario.status.toLowerCase() === filtroStatus
    );
  }

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="m-0 font-weight-bold text-primary title-text-color">
            Administración de permisos
          </h6>
          {/* Botón para agregar un usuario */}
          <button onClick={onAddUser} className="btn btn-primary mt-3">
            Agregar usuario
          </button>
          <input
            type="text"
            className="form-control w-50"
            placeholder="Buscar usuarios, cargos, etc."
          />
          <select
            className="form-control w-25 ml-2"
            value={filtroStatus}
            onChange={handleFiltroChange}
          >
            <option value="all">Todos</option>
            <option value="confirmado">Confirmado</option>
            <option value="pendiente">Pendiente</option>
            <option value="desvinculado">Desvinculado</option>
          </select>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table
            className="table table-bordered table-striped"
            id="dataTable"
            width="100%"
            cellSpacing="0"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre usuario</th>
                <th>Cargo</th>
                <th>Permisos</th>
                <th>Status</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>ID</th>
                <th>Nombre usuario</th>
                <th>Cargo</th>
                <th>Permisos</th>
                <th>Status</th>
                <th>Acciones</th>
              </tr>
            </tfoot>
            <tbody>
              {/* Mapeo de datos dinámicos */}
              {datosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>
                    <i
                      className="bi bi-person-circle me-1"
                      style={{ color: "rgb(0, 81, 255)" }}
                    ></i>{" "}
                    {usuario.nombre}
                  </td>
                  <td>{usuario.cargo}</td>
                  <td className="d-flex justify-content-start">
                    <select className="form-control w-auto">
                      <option value="admin">Administrador</option>
                      <option value="personnel">Personal</option>
                    </select>
                    <button
                      type="button"
                      className="btn btn-icon"
                      style={{ color: "green" }}
                    >
                      <i className="bi bi-check-square-fill"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-icon"
                      style={{ color: "red" }}
                    >
                      <i className="bi bi-x-square-fill"></i>
                    </button>
                  </td>
                  <td>{usuario.status}</td>
                  <td style={{ display: "flex", gap: "20px" }}>
                    <div>
                      <i className="bi bi-eye"></i>
                      <i className="bi bi-pencil-square"></i>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ marginTop: "-5px" }}
                    >
                      DESVINCULAR
                    </button>
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