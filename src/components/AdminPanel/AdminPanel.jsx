import { useState } from 'react';
import "../../views/Dashboard/Dashboard.css";

const AdminPanel = () => {
    const users = [
        { id: 1, userName: 'Juan Pérez', role: 'Administrador' },
        { id: 2, userName: 'María Gómez', role: 'Usuario' },
        { id: 3, userName: 'Carlos López', role: 'Usuario' },
        { id: 4, userName: 'Ana Martínez', role: 'Administrador' },
        { id: 5, userName: 'Luis Rodríguez', role: 'Usuario' },
        // Agregar más usuarios aquí...
    ];

    // Función para obtener la inicial del nombre de usuario
    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    return (
        <div className="container my-4">
            <div className="card border-0 shadow-sm p-4 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 fw-bold">Panel de Administración</h5>
                </div>
                <div style={{ maxHeight: '300px', maxWidth: 'auto', overflowY: 'auto' }}>
                    {users.map((user) => (
                        <div key={user.id}>
                            <div className="d-flex align-items-center mb-3">
                                {/* Mostramos la inicial del nombre de usuario */}
                                <div
                                    className="me-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        backgroundColor: '#007bff',
                                        color: '#fff',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {getInitial(user.userName)}
                                </div>
                                <div>
                                    <p className="mb-0 fw-bold">{user.userName}</p>
                                    <p className="mb-0 text-muted">{user.role}</p>
                                </div>
                            </div>
                            {user.id !== users.length && <hr className="my-2" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;