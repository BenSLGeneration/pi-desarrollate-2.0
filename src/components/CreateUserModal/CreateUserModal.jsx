import React, { useState } from "react";

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    permisos: "Usuario",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData); // Envía los datos al componente padre
    onClose(); // Cierra el modal
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
              onChange={(e) =>
                setFormData({ ...formData, permisos: e.target.value })
              }
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