import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // Importa la configuración de Axios
import TablaReservaciones from '../../components/TablaReservaciones/TablaReservaciones'; // Asegúrate de importar correctamente la tabla

const Reservaciones = () => {
    const [reservations, setReservations] = useState([]); // Estado para almacenar las reservas

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get('/reservations');
                const formattedReservations = response.data.map(reserva => ({
                    id: reserva._id,
                    nombreHuesped: reserva.client?.name || 'Sin nombre',
                    email: reserva.client?.email || 'No disponible',
                    checkIn: reserva.checkinDate,
                    checkOut: reserva.checkoutDate,
                    tipo: reserva.cabin?.type || 'Desconocido',
                    pago: reserva.paymentAmount || 0, // Ajustado
                    iva: reserva.iva || 19, // Ajustado
                    pagoTotal: reserva.total || 0, // Ajustado
                    status: reserva.status || 'Pendiente',
                    plataforma: reserva.bookingPlatform || 'Directo',
                    medioPago: reserva.paymentMethod || 'No especificado',
                    cantidadAdultos: reserva.adults || 0,
                    cantidadNiños: reserva.children || 0,
                    tinaja: reserva.hasHotTub ? '✅' : '❌',
                }));
                setReservations(formattedReservations);
            } catch (error) {
                console.error("Error al obtener las reservas: ", error);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div>
            <main id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <div className="espacio-vacio"></div>
                    <div className='d-flex'>
                        <TablaReservaciones datos={reservations} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Reservaciones;
