import { useState, useEffect } from 'react';
import api from '../../api/axios';
import './ReservationTable.css';

const ReservationTable = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get('/reservations');
                console.log(response.data);

                const formattedReservations = response.data.map(reserva => ({
                    id: reserva._id,
                    nombreHuesped: reserva.client || 'Sin nombre',
                    checkIn: reserva.checkinDate,
                    checkOut: reserva.checkoutDate,
                    tipo: reserva.cabinType || 'Desconocido',
                    pago: reserva.paymentAmount || 0,
                    iva: reserva.iva || 0,
                    pagoTotal: reserva.total || 0,
                    medioPago: reserva.paymentMethod
                }));
                setReservations(formattedReservations);

            } catch (error) {
                console.error('Error al obtener las reservas: ', error);
            }
        };

        fetchReservations();
    }, []);

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
                            <th scope='col'>Nombre</th>
                            <th scope='col'>Check In</th>
                            <th scope='col'>Check Out</th>
                            <th scope='col'>Tipo de Cabaña</th>
                            <th scope='col'>Pago</th>
                            <th scope='col'>IVA</th>
                            <th scope='col'>Monto Total</th>
                            <th scope='col'>Medio de Pago</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reserva) => (
                                <tr key={reserva.id}>
                                    <td>{reserva.nombreHuesped}</td>
                                    <td>{reserva.checkIn}</td>
                                    <td>{reserva.checkOut}</td>
                                    <td>{reserva.tipo}</td>
                                    <td>${reserva.pago.toFixed(2)}</td>
                                    <td>${reserva.iva.toFixed(2)}</td>
                                    <td>${reserva.pagoTotal.toFixed(2)}</td>
                                    <td>{reserva.medioPago}</td>
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