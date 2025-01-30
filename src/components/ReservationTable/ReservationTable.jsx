import "../../views/Dashboard/Dashboard.css"

const ReservationTable = () => {
    const reservations = [
        { name: 'Nombre Apellido', checkInOut: '01/01/2025 - 02/01/2025', type: 'Single Bed', room: '#B02', payment: '$000000' },
        // Agrega más reservaciones aquí...
    ];

    return (
        <div className="container my-4">
            <div className="card shadow-sm p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 fw-bold">Lista de Reservaciones</h5>
                </div>
                <table className="table">
                    <thead>
                        <tr className="table-info">
                            <th scope="col">Nombre</th>
                            <th scope="col">Check In / Check Out</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Habitacion</th>
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
                <div className="text-end mt-3">
                    <button className="btn btn-download">Descargar Planilla</button>
                </div>
            </div>
        </div>
    );
};

export default ReservationTable;