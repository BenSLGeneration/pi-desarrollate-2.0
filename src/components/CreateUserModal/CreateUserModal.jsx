import React, {useState} from "react";

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({ name: "", email: "", password: ""});

    const handleSubmit = (e) => {
        e.preventDefault()
        onCreate(formData);
        onClose()
    };

    if (!isOpen) return null;


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Crear Usuario Hotelero</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                          type="text" 
                          value={formData.name} 
                          onChange={(e) => setFormData({ ...formData, name: e.target.value})} 
                          required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                          type="email" 
                          value={formData.email} 
                          onChange={(e) => setFormData({...formData, email: e.target.value})} 
                          required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña::</label>
                        <input
                          type="password"  
                          value={formData.password} 
                          onChange={(e) => setFormData({...formData, password: e.target.value})} 
                          required 
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit">Crear Usuario</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUserModal;