import React from "react";
import "../../views/Administracion/Administracion.css";
import api from "../../api/axios";

const TablaPermisos = ({ datos, onUserDeleted }) => {
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas borrar este usuario?")) {
      try {
        await api.delete(`/users/${id}`);
        onUserDeleted(id); // Notificar al padre que un usuario ha sido eliminado
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        alert("Error al eliminar el usuario. Intente nuevamente.");
      }
    }
  };

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
        <tfoot>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </tfoot>
        <tbody>
          {datos.map((usuario) => (
            <tr key={usuario._id}>
              <td className="text-center">{usuario._id}</td>
              <td className="text-center">{usuario.name}</td>
              <td className="text-center">{usuario.email}</td>
              <td className="text-center">{usuario.role}</td>
              <td>
                <button className="btn btn-primary mx-3">
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(usuario._id)}>
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