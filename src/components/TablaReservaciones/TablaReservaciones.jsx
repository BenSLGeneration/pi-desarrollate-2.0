const TablaReservaciones = ({ datos }) => {
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="m-0 font-weight-bold text-primary title-text-color">Administración de Reservas</h6>
                    <input type="date" className="form-control w-25" style={{ marginRight: '10px'  }} />
                    <button className="btn btn-primary">Agregar Reserva</button>
                </div>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Nombre Huésped</th>
                                <th>Check-in - Check-out</th>
                                <th>Hora</th>
                                <th>Tipo</th>
                                <th>Número</th>
                                <th>Pago Adeudado</th>
                                <th>Status</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Nombre Huésped</th>
                                <th>Check-in - Check-out</th>
                                <th>Hora</th>
                                <th>Tipo</th>
                                <th>Número</th>
                                <th>Pago Adeudado</th>
                                <th>Status</th>
                                <th>Acciones</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {/* Mapeo de datos dinámicos */}
                            {datos.map((reserva) => (
                                <tr key={reserva.id}>
                                    <td>{reserva.nombreHuesped}</td>
                                    <td>{reserva.checkIn} - {reserva.checkOut}</td>
                                    <td>{reserva.hora}</td>
                                    <td>{reserva.tipo}</td>
                                    <td>{reserva.numero}</td>
                                    <td>{reserva.pagoAdeudado}</td>
                                    <td>{reserva.status}</td>
                                    <td>
                                        <button type="button" className="btn btn-success">Confirmar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TablaReservaciones;
