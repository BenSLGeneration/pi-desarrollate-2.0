import React, { useState } from "react";

const EditUserModal = ({ isOpen, onClose, usuario, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: usuario.name,
    email: usuario.email,
    role: usuario.role,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!formData.name || !formData.email || !formData.role) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      await onUpdate(usuario._id, formData); // Enviar los datos actualizados al backend
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Error al actualizar el usuario. Intente nuevamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          {/* Campo Email */}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          {/* Campo Rol */}
          <div className="form-group">
            <label>Rol:</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="admin">Administrador</option>
              <option value="usuario">Usuario</option>
            </select>
          </div>
          {/* Botones */}
          <div className="modal-buttons">
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;