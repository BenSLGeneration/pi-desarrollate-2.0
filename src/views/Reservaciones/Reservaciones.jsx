import React, { useState, useEffect } from 'react';
import TablaReservaciones from '../../components/TablaReservaciones/TablaReservaciones'; // Ajusta la ruta según tu estructura de carpetas
import "../Reservaciones/Reservaciones.css"

const Reservaciones = () => {
  // Estado para los datos de reservas
  const [datosReservas, setDatosReservas] = useState([]);

  useEffect(() => {
    // Simulación de llamada a la API para obtener los datos de reservas
    const reservas = [
      {
        id: 1,
        nombreHuesped: 'Juan Pérez',
        email: 'juan@example.com',
        checkIn: '20/08/2024',
        checkOut: '22/08/2024',
        tipo: 'Tinycabin',
        pago: 50000,
        iva: 19,
        pagoTotal: 59500,
        status: 'Reservada',
        plataforma: 'Booking',
        medioPago: 'Tarjeta de Crédito (Visa)',
        cantidadAdultos: 2,
        cantidadNiños: 1,
        tinaja: '✅'
      },
      {
        id: 2,
        nombreHuesped: 'María López',
        email: 'maria@example.com',
        checkIn: '05/09/2024',
        checkOut: '10/09/2024',
        tipo: 'Cabaña Deluxe',
        pago: 0,
        iva: 0,
        pagoTotal: 0,
        status: 'Cancelada',
        plataforma: 'Airbnb',
        medioPago: 'Transferencia Bancaria',
        cantidadAdultos: 3,
        cantidadNiños: 2,
        tinaja: '❌'
      },
      {
        id: 3,
        nombreHuesped: 'Carlos Sánchez',
        email: 'carlos@example.com',
        checkIn: '15/07/2024',
        checkOut: '18/07/2024',
        tipo: 'Suite Premium',
        pago: 100000,
        iva: 19,
        pagoTotal: 119000,
        status: 'Cancelada',
        plataforma: 'Expedia',
        medioPago: 'Tarjeta de Débito (Mastercard)',
        cantidadAdultos: 1,
        cantidadNiños: 0,
        tinaja: '✅'
      },
      // Agrega más datos si es necesario
    ];

    setDatosReservas(reservas);
  }, []);

  return (
    <div>
      <main id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="espacio-vacio">
            {/* Main Content */}
          </div>

          {/* Pasar datos a la tabla */}
          <div className='d-flex'>
            <TablaReservaciones datos={datosReservas} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reservaciones;
