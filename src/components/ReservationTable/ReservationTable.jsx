import "../../views/Dashboard/Dashboard.css"

const ReservationTable = () => {
    const reservations = [
        { name: 'Nombre Apellido', checkInOut: '01/01/2025 - 02/01/2025', type: 'Single Bed', room: '#B02', payment: '$000000' },
        { name: 'Nombre Apellido', checkInOut: '01/01/2025 - 02/01/2025', type: 'Single Bed', room: '#B02', payment: '$000000' },
        { name: 'Nombre Apellido', checkInOut: '01/01/2025 - 02/01/2025', type: 'Single Bed', room: '#B02', payment: '$000000' },
        { name: 'Nombre Apellido', checkInOut: '01/01/2025 - 02/01/2025', type: 'Single Bed', room: '#B02', payment: '$000000' },
    ];

    return (
        <div className="container my-4">
            <div className="card border-0 shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0 fw-bold text-primary">Lista de Reservaciones</h5>
                    <button className="btn btn-primary btn-sm">
                        <i className="bi bi-download me-2"></i>Descargar Planilla
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover table-borderless">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Check In / Check Out</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Habitación</th>
                                <th scope="col">Pago Adeudado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation, index) => (
                                <tr key={index}>
                                    <td>{reservation.name}</td>
                                    <td>{reservation.checkInOut}</td>
                                    <td>{reservation.type}</td>
                                    <td>{reservation.room}</td>
                                    <td>{reservation.payment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReservationTable;