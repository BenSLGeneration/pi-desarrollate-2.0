import "../Navbar/navbar.css"

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow rounded-pill p-2 position-absolute top-0 end-0 m-3">
        <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarContent">
                
                <form className="d-flex">
                    <input
                        className="form-control form-control-sm rounded-pill me-2"
                        type="search"
                        placeholder="Buscar"
                        aria-label="Buscar"
                    />
                </form>

                
                <button className="btn btn-sm rounded-pill">
                    <i className="bi bi-gear" style={{ fontSize: '2rem', color: 'blue' }}></i>
                </button>

                
                <div className="d-flex align-items-center ms-2">
                    <i className="bi bi-person-circle fs-3 text-primary me-2"></i>
                    <div>
                        <strong className="d-block">Nombre de usuario</strong>
                        <small className="text-muted">cargo laboral</small>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    );
};

export default Navbar;