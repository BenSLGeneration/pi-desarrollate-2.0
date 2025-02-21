import React, { useState, useEffect } from "react";
import PaginacionPermisos from "../../components/PaginacionPermisos/PaginacionPermisos";
import CreateUserModal from "../../components/CreateUserModal/CreateUserModal";
import axios from "axios";

const Administracion = () => {
  const [lista, setLista] = useState([]); // Estado para almacenar la lista de usuarios
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState("all");
  const [busqueda, setBusqueda] = useState("");

  // Función para cargar usuarios desde el backend
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        if (Array.isArray(response.data)) {
          setLista(response.data); // Almacenar los datos en el estado `lista`
        } else {
          console.error("El backend no devolvió un array de usuarios.");
          alert("Error: El backend no devolvió un array de usuarios.");
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        alert("Error al cargar los usuarios. Intente nuevamente.");
      }
    };

    fetchUsuarios();
  }, []);

  // Función para manejar el cambio del filtro de estado
  const handleFiltroChange = (e) => {
    setFiltroStatus(e.target.value);
  };

  // Función para manejar el cambio en la búsqueda
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  // Lógica de filtrado
  const datosFiltrados = lista.filter((usuario) => {
    // Mapear el filtroStatus al formato del backend
    const roleMapping = {
      Administrador: "admin",
      Personal: "usuario",
    };
    const mappedRole = roleMapping[filtroStatus] || filtroStatus;

    // Filtrar por estado (role)
    const matchesStatus =
      filtroStatus === "all" || usuario.role?.toLowerCase() === mappedRole?.toLowerCase();

    // Filtrar por búsqueda
    let matchesSearch = false;

    if (!busqueda) {
      matchesSearch = true; // Si no hay búsqueda, todos los usuarios coinciden
    } else {
      const lowerBusqueda = busqueda.toLowerCase();
      matchesSearch =
        usuario._id.toString().includes(lowerBusqueda) || // Buscar por _id
        usuario.name.toLowerCase().includes(lowerBusqueda) || // Buscar por nombre
        usuario.email.toLowerCase().includes(lowerBusqueda) || // Buscar por email
        usuario.role.toLowerCase().includes(lowerBusqueda); // Buscar por role
    }

    return matchesStatus && matchesSearch;
  });

  // Función para manejar la creación de un usuario
  const handleCreateUser = async (userData) => {
    try {
      if (!userData.name || !userData.email || !userData.password) {
        alert("Todos los campos son obligatorios");
        return;
      }

      const roleMapping = {
        Administrador: "admin",
        Personal: "usuario",
      };
      const role = roleMapping[userData.permisos];
      const userDataToSend = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: role,
      };

      const response = await axios.post("http://localhost:5000/api/users", userDataToSend);
      alert("Usuario creado exitosamente");
      console.log("Nuevo usuario creado:", response.data);

      // Agregar el nuevo usuario al estado `lista`
      setLista((prevLista) => [...prevLista, response.data]);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      alert("Error al crear el usuario. Intente nuevamente.");
    }
  };

  // Función para manejar la eliminación de un usuario
  const handleUserDeleted = (id) => {
    setLista((prevLista) => prevLista.filter((usuario) => usuario._id !== id));
  };

  return (
    <div>
      <main id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div>
            {/* Contenido principal */}
            <div className="container-fluid" style={{ paddingTop: "6rem" }}>
              {/* Encabezado con filtros */}
              <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h6 className="title-text-color m-0">Administración de permisos</h6>
                  <div className="d-flex align-items-center gap-3 filters-container">
                    <input
                      type="text"
                      className="form-control search-bar"
                      placeholder="Buscar por ID, Nombre, Email, Rol..."
                      value={busqueda}
                      onChange={handleBusquedaChange}
                    />
                    <select
                      className="form-control w-auto"
                      value={filtroStatus}
                      onChange={handleFiltroChange}
                    >
                      <option value="all">Todos</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Personal">Usuario</option>
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
                  <PaginacionPermisos
                    datos={datosFiltrados}
                    onUserDeleted={handleUserDeleted}
                  />
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