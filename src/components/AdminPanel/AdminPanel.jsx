import "../../views/Dashboard/Dashboard.css"

const AdminPanel = () => {
    const users = [
        { id: 1, userName: 'Nombre de usuario', role: 'Admin' },
        { id: 2, userName: 'Nombre de usuario', role: 'Admin' },
        { id: 3, userName: 'Nombre de usuario', role: 'Admin', },
        { id: 4, userName: 'Nombre de usuario', role: 'Admin', },
        { id: 5, userName: 'Nombre de usuario', role: 'Admin', },
        // Agregar mas usuarios aqui...
    ];

    return (
        <div className="card shadow-sm p-3">
            <h5 className="mb-3 fw-bold">Panel de Administracion</h5>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}> {
            }
                {users.map((user) => (
                    <div key={user.id}>
                        <div className="d-flex align-items-center mb-3">
                            <i className="bi bi-person-circle me-3" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
                            <div>
                                <p className="mb-0 fw-bold">{user.userName}</p>
                                <p className="mb-0 text-muted">{user.role}</p>
                            </div>
                        </div>
                        {user.id !== users.length && <hr className="my-2" />} {
                        }
                    </div>
                ))}
            </div>
        </div>

    );
};

export default AdminPanel;