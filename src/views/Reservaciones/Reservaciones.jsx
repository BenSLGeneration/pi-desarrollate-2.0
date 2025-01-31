import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import TablaReservaciones from '../../components/TablaReservaciones/TablaReservaciones'; // Ajusta la ruta según tu estructura de carpetas

const Reservaciones = () => {
  // Datos de ejemplo para reservas
  const datosReservas = [
    { id: 1, nombreHuesped: 'Juan Pérez', checkIn: '01/01/2025', checkOut: '02/01/2025', hora: '21:30pm', tipo: 'Tinycabin', numero: '#B05', pagoAdeudado: '$120.000', status: 'Confirmado' },
    { id: 2, nombreHuesped: 'Ana Gómez', checkIn: '03/01/2025', checkOut: '04/01/2025', hora: '11:30am', tipo: 'Dual cabin', numero: '#B06', pagoAdeudado: '$100.000', status: 'Pendiente' },
    // Agrega más datos de ejemplo aquí
  ];

  return (
    <div>
      <main id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div id="ESPACIO VACÍO">
            {/* Main Content */}
            <div className="container-fluid" style={{ marginTop: '90px' , marginLeft: '250px' }}>
              <h1 className="h3 mb-2 text-gray-800">Reservaciones</h1>
              <p className="mb-4">Administración de las reservas de los huéspedes.</p>
            </div>
          </div>

          {/* Pasar datos a la tabla */}
          <div className='d-flex'>
          <Navbar />
          <Sidebar />
          <TablaReservaciones datos={datosReservas} />

          </div>
        </div>
      </main>
    </div>
  );
};

export default Reservaciones;
