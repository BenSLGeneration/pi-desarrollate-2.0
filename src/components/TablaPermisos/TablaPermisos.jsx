import React from "react";
import "../../views/Administracion/Administracion.css";

const TablaPermisos = ({ datos }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered text-center table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario._id}</td>
              <td>{usuario.name}</td>
              <td>{usuario.email}</td>
              <td>{usuario.role}</td>
              <td>
                <button className="btn btn-primary mx-3">
                  Editar
                </button>
                <button className="btn btn-danger">
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaPermisos;