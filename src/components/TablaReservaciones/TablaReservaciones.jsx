import React from 'react';

const TablaReservaciones = ({ datos }) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Reservas</h2>
      <table className="table table-striped table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Plataforma</th>
            <th>Cliente</th>
            <th>Email</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Adultos</th>
            <th>Niños</th>
            <th>Tinaja</th>
            <th>Medio de Pago</th>
            <th>Tipo Cabaña</th>
            <th>Pago</th>
            <th>IVA</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((reserva, index) => (
            <tr key={index}>
              <td>{reserva.id}</td>
              <td>{reserva.plataforma}</td>
              <td>{reserva.nombreHuesped}</td>
              <td>{reserva.email}</td>
              <td>{reserva.checkIn}</td>
              <td>{reserva.checkOut}</td>
              <td>{reserva.cantidadAdultos}</td>
              <td>{reserva.cantidadNiños}</td>
              <td>{reserva.tinaja}</td>
              <td>{reserva.medioPago}</td>
              <td>{reserva.tipo}</td>
              <td className="text-danger fw-bold">${reserva.pago.toLocaleString()}</td>
              <td className="text-danger fw-bold">{reserva.iva}%</td>
              <td className="text-danger fw-bold">${reserva.pagoTotal.toLocaleString()}</td>
              <td className={`fw-bold ${reserva.status === 'Reservada' ? 'text-success' : 'text-danger'}`}>
                {reserva.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaReservaciones;
