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
      </div>
    </div>

    // Categorias Info
  );
};

export default Dashboard;