import React from "react";
import "../../views/Administracion/Administracion.css";
import api from "../../api/axios";

const TablaPermisos = ({ datos, onUserDeleted }) => {
  // Función para manejar el cambio de rol
  const handleRoleChange = async (id, newRole) => {
    try {
      await api.put(`/users/${id}`, { role: newRole }); // Enviar el nuevo rol al backend
      alert("Rol actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
      alert("Error al actualizar el rol. Intente nuevamente.");
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
              <td>
                {/* Menú desplegable para cambiar el rol */}
                <select
                  value={usuario.role}
                  onChange={(e) => handleRoleChange(usuario._id, e.target.value)}
                >
                  <option value="admin">Administrador</option>
                  <option value="usuario">Usuario</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (window.confirm("¿Estás seguro de que deseas borrar este usuario?")) {
                      onUserDeleted(usuario._id);
                    }
                  }}
                >
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