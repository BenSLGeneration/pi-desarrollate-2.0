import React, { useState } from 'react';
import PaginacionPermisos from '../../components/PaginacionPermisos/PaginacionPermisos';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import CreateUserModal from '../../components/CreateUserModal/CreateUserModal';
import axios from 'axios';

const Administracion = () => {

  const [lista, setLista] = useState([]); // SI SE BORRA NO FUNCIONA NADA

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState("all");
  const [busqueda, setBusqueda] = useState("");


  // Función para manejar el cambio del filtro de estado
  const handleFiltroChange = (e) => {
    setFiltroStatus(e.target.value);
  };

  // Función para manejar el cambio en la búsqueda
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const datosFiltrados = lista.filter(usuario => {
    const matchesStatus = filtroStatus === "all" || 
      usuario.status.toLowerCase() === filtroStatus.toLowerCase();

    const [prefijo, valorBusqueda] = busqueda.split(":").map(part => part.trim());
    let matchesSearch = false;

    if (!busqueda) {
      matchesSearch = true;
    } else if (prefijo.toLowerCase() === "id") {
      const regex = new RegExp("^" + valorBusqueda.replace(/\?/g, "\\d") + "$");
      matchesSearch = regex.test(usuario.id.toString());
    } else if (prefijo.toLowerCase() === "nombre") {
      matchesSearch = usuario.nombre.toLowerCase().includes(valorBusqueda.toLowerCase());
    } else if (prefijo.toLowerCase() === "cargo") {
      matchesSearch = usuario.cargo.toLowerCase().includes(valorBusqueda.toLowerCase());
    } else if (prefijo.toLowerCase() === "permisos") {
      matchesSearch = usuario.permisos.toLowerCase().includes(valorBusqueda.toLowerCase());
    } else if (prefijo.toLowerCase() === "status") {
      matchesSearch = usuario.status.toLowerCase().includes(valorBusqueda.toLowerCase());
    } else {
      matchesSearch =
        usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.cargo.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.permisos.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.status.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.id.toString().includes(busqueda);
    }

    return matchesStatus && matchesSearch;
  });


  

  const handleCreateUser = async (userData) => {

    try {
      if (!userData.name || !userData.email || !userData.password) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const roleMapping = {
      Administrador: "admin",
      Personal: "usuario"
    };
    const role = roleMapping[userData.permisos];

    const userDataToSend = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: role,
    }
    
      const response = await axios.post("http://localhost:5000/api/users", userData);
        alert("Usuario creado exitosamente")
        console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Error al crear el usuario");
    }


  };


    return (
    <div>
      <main id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div>
            {/* Contenido principal */}
            <div className="container-fluid" style={{ paddingTop: '6rem' }}>
              {/* Encabezado con filtros */}
              <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h6 className="title-text-color m-0">Administración de permisos</h6>
                  <div className="d-flex align-items-center gap-3 filters-container">
                    <input
                      type="text"
                      className="form-control search-bar"
                      placeholder="Buscar por ID, Nombre, Cargo, Permisos, Status..."
                      value={busqueda}
                      onChange={handleBusquedaChange}
                    />
                    <select
                      className="form-control w-auto"
                      value={filtroStatus}
                      onChange={handleFiltroChange}
                    >
                      <option value="all">Todos</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="desvinculado">Desvinculado</option>
                    </select>
                  </div>
                </div>
                <div className="card-body">
                  {/* Botón para crear usuario */}
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary w-100 mb-3"
                  >
                    Crear Usuario Hotelero
                  </button>

                  {/* Componente de paginación */}
                  <PaginacionPermisos datos={datosFiltrados} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal para crear usuario */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateUser}
      />
    </div>
  );
};

export default Administracion;