import React, { useState } from 'react';
import "../TablaReservaciones/TablaReservaciones.css";

const TablaReservaciones = ({ datos }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');

  const handleFechaChange = (e) => {
    setFechaSeleccionada(e.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString.split('T')[0]; // Convertir formato de fecha ISO
  };

  const datosFiltrados = fechaSeleccionada
    ? datos.filter((reserva) => formatDate(reserva.checkIn) === fechaSeleccionada)
    : datos;

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 d-flex align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary title-text-color">Administración de Reservas</h6>
        <input
          type="date"
          className="form-control w-25"
          value={fechaSeleccionada}
          onChange={handleFechaChange}
        />
      </div>
      <div className="card-body">
        <div className="table-container">
          <table className="table table-bordered table-striped">
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
              {datosFiltrados.length > 0 ? (
                datosFiltrados.map((reserva, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
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
                ))
              ) : (
                <tr>
                  <td colSpan="15" className="no-data-message">
                    No hay reservas para la fecha seleccionada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaReservaciones;
