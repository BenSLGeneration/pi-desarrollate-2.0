const Dashboard = () => {
  return (
    // Filtro - Resumen General
    <div className="container my-4">
      <div className="card shadow-sm p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0 fw-blod">Resumen General</h5>
          <selecct className="form-select w-auto">
            <option>Diario</option>
            <option>Semanal</option>
            <option>Mensual</option>
          </selecct>
        </div>

        <div className="row g-3">
          <div className="col-12 col-md-3">
            <div className="summary-card green">
              <div>
                <i className="bi bi-check-circle-fill"></i>
                Check In
              </div>
              <span>20</span>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="summary-card red">
            <div>
              <i className="bi bi-x-circle-fill"></i>
              Check Out
            </div>
            <span>20</span>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="summary-card blue">
            <div>
              <i className="bi bi-info-circle-fill"></i>
              Disponibles
            </div>
            <span>20</span>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className="summary-card yellow">
            <div>
              <i className="bi bi-calendar-check-fill"></i>
              Reservados
            </div>
            <span>20</span>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;