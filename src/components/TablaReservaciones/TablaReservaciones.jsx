import React, { useState } from 'react';
import "../TablaReservaciones/TablaReservaciones.css";

const TablaReservaciones = ({ datos }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');

  const handleFechaChange = (e) => {
    setFechaSeleccionada(e.target.value);
  };

  // Función para formatear fechas (DD/MM/YYYY a YYYY-MM-DD)
  const formatDate = (dateString) => {
    if (!dateString) return ''; // Manejar valores nulos o vacíos
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // Filtrar los datos según la fecha seleccionada
  const datosFiltrados = fechaSeleccionada
    ? datos.filter((reserva) => formatDate(reserva.checkIn) === fechaSeleccionada)
    : datos;

  // Debugging: Imprime los datos para verificar
  console.log("Fecha seleccionada:", fechaSeleccionada);
  console.log("Datos filtrados:", datosFiltrados);

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="m-0 font-weight-bold text-primary title-text-color">Administración de Reservas</h6>
          <input
            type="date"
            className="form-control w-25"
            style={{ marginRight: '10px' }}
            value={fechaSeleccionada}
            onChange={handleFechaChange}
          />
        </div>
      </div>
      <div className="card-body">
        <div className="table-container">
          <table className="table table-bordered table-striped" id="dataTable" width="100%" cellSpacing="0">
            <colgroup>
              <col style={{ width: '5%' }} /> {/* Columna # */}
              <col style={{ width: '10%' }} /> {/* Columna Plataforma */}
              <col style={{ width: '15%' }} /> {/* Columna Cliente */}
              <col style={{ width: '15%' }} /> {/* Columna Email */}
              <col style={{ width: '10%' }} /> {/* Columna Check-in */}
              <col style={{ width: '12%' }} /> {/* Columna Check-out */}
              <col style={{ width: '5%' }} /> {/* Columna Adultos */}
              <col style={{ width: '5%' }} /> {/* Columna Niños */}
              <col style={{ width: '5%' }} /> {/* Columna Tinaja */}
              <col style={{ width: '10%' }} /> {/* Columna Medio de Pago */}
              <col style={{ width: '10%' }} /> {/* Columna Tipo Cabaña */}
              <col style={{ width: '10%' }} /> {/* Columna Pago */}
              <col style={{ width: '5%' }} /> {/* Columna IVA */}
              <col style={{ width: '10%' }} /> {/* Columna Total */}
              <col style={{ width: '10%' }} /> {/* Columna Estado */}
            </colgroup>
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
              {datosFiltrados.length > 0 ? (
                datosFiltrados.map((reserva, index) => (
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