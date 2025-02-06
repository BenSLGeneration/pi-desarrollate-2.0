
import React, { useState } from 'react';
import PaginacionPermisos from '../../components/PaginacionPermisos/PaginacionPermisos';
// import TablaPermisos from '../../components/TablaPermisos/TablaPermisos'; // Ajusta la ruta según tu estructura de carpetas
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import CreateUserModal from '../../components/CreateUserModal/CreateUserModal';


const Administracion = () => {
  const [lista, setLista] = useState([
      { id: 1, nombre: 'John Doe', cargo: 'Product Owner', permisos: 'Administrador', status: 'Confirmado' },
      { id: 2, nombre: 'Jane Smith', cargo: 'Desarrolladora', permisos: 'Personal', status: 'Pendiente' },
      { id: 3, nombre: 'Carlos López', cargo: 'Diseñador UI', permisos: 'Personal', status: 'Confirmado' },
      { id: 4, nombre: 'Ana Pérez', cargo: 'Scrum Master', permisos: 'Administrador', status: 'Desvinculado' },
    ]);

  const [isModalOpen, setIsModalOpen] = useState(false); // estado para controlar el modal


  // const handleAddUser = () => {
  //   const ultimoID = lista.length > 0 ? Math.max(...lista.map(usuario => usuario.id)) : 0;

  //   const nuevoUsuario = {
  //     id: ultimoID + 1,
  //     nombre: 'Nuevo Usuario',
  //     cargo: 'Personal Hotelero',
  //     permisos: 'Personal',
  //     status: 'Pendiente',
  //   }
  //   setLista([...lista, nuevoUsuario])
  //  }
    
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
 



  const handleCreateUser = (userData) => {

    const ultimoID = lista.length > 0 ? Math.max(...lista.map((usuario) => usuario.id)) : 0;

    // try {
    //   const response = fetch("/api/users", {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify(userData),
    //   })
    //   const result = response.json()
    //   if (response.ok) {
    //    alert(result.message || "Usuario creado existosamente");


       const nuevoUsuario = {
        id: ultimoID + 1,
        nombre: userData.name,
        cargo: userData.cargo,
        permisos: userData.permisos,
        status: userData.status,
      }
      setLista([...lista, nuevoUsuario])
     
    //   } else {
    //     alert(result.message || "Hubo un error al crear el usuario");
    //   }
    // } catch (error) {
    //   console.error("Error al crear el usuario:", error);
    //   alert("Hubo un error al crear el usuario");
    // }
  }

  return (
    <div>
      <main id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div id="ESPACIO VACÍO">
            {/* Main Content */}
            <div className="container-fluid">
              <h1 className="h3 mb-2 text-gray-800">Administracion</h1>
              <p className="mb-4"></p>

              <button onClick={() => setIsModalOpen(true)} className="btn btn-primary mt-3">
                Crear Usuario Hotelero
              </button>
                          
              {/* Pasar datos a la tabla */}
              <PaginacionPermisos datos={lista} onAddUser={() => {}} />
            </div>
          </div>

        </div>
      </main>

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateUser}
      />
    </div>
  );
};


{/* <button onClick={handleAddSection} className='btn btn-primary mt-3'>Agregar usuario</button> */}

export default Administracion;
