import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import './ReservationTable.css';
import html2pdf from 'html2pdf.js';

const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await api.get('/reservations');
        const formattedReservations = response.data.map((reserva) => ({
          id: reserva._id,
          nombreHuesped: reserva.client || 'Sin nombre',
          checkIn: new Date(reserva.checkinDate).toLocaleString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          checkOut: new Date(reserva.checkoutDate).toLocaleString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          tipo: reserva.cabinType || 'Desconocido',
          pago: reserva.paymentAmount || 0,
          iva: reserva.iva || 0,
          pagoTotal: reserva.total || 0,
          medioPago: reserva.paymentMethod,
        }));
        setReservations(formattedReservations);
      } catch (error) {
        console.error('Error al obtener las reservas: ', error);
      }
    };
    fetchReservations();
  }, []);

  const handleExportPDF = () => {
    // Crear un contenedor temporal para el PDF
    const element = document.createElement('div');

    // Fecha actual
    const currentDate = new Date().toLocaleString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const fileName = `${currentDate.replace(/[:\/]/g, '')}_lista_de_reservaciones.pdf`;

    // Agregar la fecha en la parte superior derecha
    element.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="text-align: left; font-size: 18px;">Lista de Reservaciones</h3>
        <p style="text-align: right; font-size: 14px;">${currentDate}</p>
      </div>
    `;

    // Agregar la tabla
    element.innerHTML += `
      <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
        <thead style="background-color: #f0f0f0; border: 1px solid #ccc;">
          <tr>
            <th style="border: 1px solid #ccc; padding: 8px;">Nombre</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Check In</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Check Out</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Tipo de Cabaña</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Pago</th>
            <th style="border: 1px solid #ccc; padding: 8px;">IVA</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Monto Total</th>
            <th style="border: 1px solid #ccc; padding: 8px;">Medio de Pago</th>
          </tr>
        </thead>
        <tbody>
          ${reservations
            .map(
              (reserva, index) => `
                <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f9f9f9'};">
                  <td style="border: 1px solid #ccc; padding: 8px;">${reserva.nombreHuesped}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;">${reserva.checkIn}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;">${reserva.checkOut}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;">${reserva.tipo}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;">$${reserva.pago.toFixed(2)}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;">$${reserva.iva.toFixed(2)}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;">$${reserva.pagoTotal.toFixed(2)}</td>
                  <td style="border: 1px solid #ccc; padding: 8px;">${reserva.medioPago}</td>
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
    `;

    // Agregar el pie de página
    element.innerHTML += `
      <div style="margin-top: 20px; text-align: center; font-size: 12px;">
        <p>Todos los derechos reservados www.chelenko.com</p>
      </div>
    `;

    // Configuración de html2pdf.js
    const options = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };

    // Generar y descargar el PDF
    html2pdf().from(element).set(options).save();
  };

  return (
    <div className="container my-4">
      <div className="card border-0 shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-bold text-primary">Lista de Reservaciones</h5>
          <button className="btn btn-primary btn-sm" onClick={handleExportPDF}>
            <i className="bi bi-download me-2"></i>Descargar Planilla
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-borderless">
            <thead className="table-light">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Check In</th>
                <th scope="col">Check Out</th>
                <th scope="col">Tipo de Cabaña</th>
                <th scope="col">Pago</th>
                <th scope="col">IVA</th>
                <th scope="col">Monto Total</th>
                <th scope="col">Medio de Pago</th>
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