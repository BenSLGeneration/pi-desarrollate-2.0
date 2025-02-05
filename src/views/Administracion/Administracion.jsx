
import React, { useState } from 'react';
import PaginacionPermisos from '../../components/PaginacionPermisos/PaginacionPermisos';

import TablaPermisos from '../../components/TablaPermisos/TablaPermisos'; // Ajusta la ruta según tu estructura de carpetas
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';


const Administracion = () => {
  const [lista, setLista] = useState([
      { id: 1, nombre: 'John Doe', cargo: 'Product Owner', permisos: 'Administrador', status: 'Confirmado' },
      { id: 2, nombre: 'Jane Smith', cargo: 'Desarrolladora', permisos: 'Personal', status: 'Pendiente' },
      { id: 3, nombre: 'Carlos López', cargo: 'Diseñador UI', permisos: 'Personal', status: 'Confirmado' },
      { id: 4, nombre: 'Ana Pérez', cargo: 'Scrum Master', permisos: 'Administrador', status: 'Desvinculado' },
    ]);

    

  const handleAddSection = () => {
    const ultimoID = lista.length > 0 ? Math.max(...lista.map(usuario => usuario.id)) : 0;

    const nuevoUsuario = {
      id: ultimoID + 1,
      nombre: 'Juan Lopez',
      cargo: 'Personal Hotelero',
      permisos: 'Personal',
      status: 'Desvinculado',
    }
    setLista([...lista, nuevoUsuario])
   }
    
  //   setLista([
  //     ...lista,
  //     {
  //       id: lista.length + 2,
  //       nombre: 'John Doe',
  //       cargo: 'Product Owner',
  //       permisos: 'Administrador',
  //       status: 'Confirmado',
  //     }
  //   ])
  // }
 
  // Datos de ejemplo
  const datosUsuarios = [
    { id: 1, nombre: 'John Doe', cargo: 'Product Owner', permisos: 'Administrador', status: 'Confirmado' },
    { id: 2, nombre: 'Jane Smith', cargo: 'Desarrolladora', permisos: 'Personal', status: 'Pendiente' },
    { id: 3, nombre: 'Carlos López', cargo: 'Diseñador UI', permisos: 'Personal', status: 'Confirmado' },
    { id: 4, nombre: 'Ana Pérez', cargo: 'Scrum Master', permisos: 'Administrador', status: 'Desvinculado' },
  ];

  return (

    <div>
      <main id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div id="ESPACIO VACÍO">
            {/* Main Content */}
            <div className="container-fluid">
              <h1 className="h3 mb-2 text-gray-800"></h1>
              <p className="mb-4"></p>
            </div>
          </div>
            {/* Pasar datos a la tabla */}
            <TablaPermisos datos={datosUsuarios} />
        </div>
      </main>
    </div>
  );
};


{/* <button onClick={handleAddSection} className='btn btn-primary mt-3'>Agregar usuario</button> */}

export default Administracion;
