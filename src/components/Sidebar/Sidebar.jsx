const Sidebar = () => {
    return (
        <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="nav-item fs-5 mb-4">
                <a href="#" className="nav-link align-middle px-0">
                  <i className="fs-5 bi-house-fill"></i>
                  <span className="ms-1 d-none d-sm-inline">Home</span>
                </a>
              </li>
              <li className="nav-item fs-5 mb-4">
                <a href="#" className="nav-link px-0 align-middle">
                  <i className="fs-5 bi-table"></i>
                  <span className="ms-1 d-none d-sm-inline">Reservas</span>
                </a>
              </li>
              <li className="nav-item fs-5">
                <a href="#" className="nav-link px-0 align-middle">
                  <i className="fs-5 bi-key"></i>
                  <span className="ms-1 d-none d-sm-inline">Permisos</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
    );
};

export default Sidebar;