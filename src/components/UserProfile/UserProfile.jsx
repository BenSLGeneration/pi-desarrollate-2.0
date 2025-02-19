import "../../views/Dashboard/Dashboard.css"

const UserProfile = () => {
    return (
        <div className="container my-4">
            <div className="card border-0 shadow-sm p-4" style={{ height: '387px'}}>
                <div className="d-flex justify-content-center align-items-center mb-3">
                    <i className="bi bi-person-circle me-3" style={{ fontSize: '6.5rem', color: '#007bff' }}></i>
                </div>
                <div className="text-center align-items-center">
                    <p className="mb-2 fw-muted" id="welcomeMessage" style={{ fontSize: '1.2rem' }}>Bienvenido/a</p>
                    <p className="mb-2 fw-bold" id="userName" style={{ fontSize: '1.5rem'}}>Nombre Usuario</p>
                    <p className="mb-2 fw-muted" id="userRol">Administrador</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;