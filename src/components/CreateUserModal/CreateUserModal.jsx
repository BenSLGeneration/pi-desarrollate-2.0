import React, { useState } from "react";

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    permisos: "Usuario",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Mapear permisos al formato requerido por el backend
    const roleMapping = {
      Administrador: "admin",
      Personal: "usuario",
    };
  
    const userDataToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: roleMapping[formData.permisos], // Mapear permisos
    };

    console.log("Datos enviados al backend:", userDataToSend);

    try {
      await onCreate(userDataToSend); // Envía los datos al componente padre
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      alert("Error al crear el usuario. Intente nuevamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Crear Usuario Hotelero</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          {/* Campo Email */}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          {/* Campo Permisos */}
          <div className="form-group">
            <label>Permisos:</label>
            <select
              value={formData.permisos}
              onChange={(e) => {
                const newValue = e.target.value;
                console.log("Nuevo valor:", newValue);
                setFormData({ ...formData, permisos: newValue });
              }}
            >
              <option value="Administrador">Admin</option>
              <option value="Personal">Usuario</option>
            </select>
          </div>

          {/* Botones */}
          <div className="modal-buttons">
            <button type="submit">Crear Usuario</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;