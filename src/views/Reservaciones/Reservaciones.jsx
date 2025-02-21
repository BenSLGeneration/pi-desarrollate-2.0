import React, { useState, useEffect } from 'react';
import api from '../../api/axios'; // Importa la configuración de Axios
import TablaReservaciones from '../../components/TablaReservaciones/TablaReservaciones'; // Asegúrate de importar correctamente la tabla

const Reservaciones = () => {
    const [reservations, setReservations] = useState([]); // Estado para almacenar las reservas

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await api.get('/reservations');
                console.log(response.data); // Verifica la estructura de los datos

                // Formateamos las reservas según los datos obtenidos de la respuesta
                const formattedReservations = response.data.map(reserva => ({
                    id: reserva._id,
                    nombreHuesped: reserva.client || 'Sin nombre', // Ahora 'client' es un string (nombre)
                    email: reserva.email || 'No disponible', // 'email' está disponible directamente
                    checkIn: reserva.checkinDate,
                    checkOut: reserva.checkoutDate,
                    tipo: reserva.cabinType || 'Desconocido', // Ahora obtenemos el tipo de cabaña desde 'cabinType'
                    pago: reserva.paymentAmount || 0, // Monto de pago
                    iva: reserva.iva || 0, // IVA, si no está presente se asigna el valor por defecto
                    pagoTotal: reserva.total || 0, // Total (Pago + IVA)
                    status: reserva.status || 'Pendiente', // Estado de la reserva
                    plataforma: reserva.bookingPlatform || 'Directo', // Plataforma de la reserva
                    medioPago: reserva.paymentMethod || 'No especificado', // Medio de pago
                    cantidadAdultos: reserva.adults || 0, // Cantidad de adultos
                    cantidadNiños: reserva.children || 0, // Cantidad de niños
                    tinaja: reserva.hasHotTub ? '✅' : '❌', // Si tiene tinaja
                }));
                setReservations(formattedReservations); // Establece las reservas formateadas en el estado
            } catch (error) {
                console.error("Error al obtener las reservas: ", error); // Muestra el error en la consola si hay algún problema
            }
        };

        fetchReservations(); // Llama a la función para obtener las reservas al cargar el componente
    }, []); // El hook useEffect se ejecuta una sola vez cuando el componente se monta

    return (
        <div>
            <main id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <div className="espacio-vacio"></div>
                    <div className='d-flex'>
                        <TablaReservaciones datos={reservations} /> {/* Pasa las reservas al componente TablaReservaciones */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Reservaciones;
