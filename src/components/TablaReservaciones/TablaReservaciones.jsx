import React from 'react';
import "../TablaReservaciones/TablaReservaciones.css";

const TablaReservaciones = ({ datos }) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="m-0 font-weight-bold text-primary title-text-color">Administración de Reservas</h6>
          <input type="date" className="form-control w-25" style={{ marginRight: '10px' }} />
        </div>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
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
            <tfoot>
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
            </tfoot>
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
      </div>
    </div>
  );
};

export default TablaReservaciones;
