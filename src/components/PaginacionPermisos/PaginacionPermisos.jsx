import React, { useEffect, useState } from "react";
import TablaPermisos from "../TablaPermisos/TablaPermisos";
import api from "../../api/axios";

const PaginacionPermisos = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  // Función para cargar usuarios
  const fetchUsuarios = async () => {
    try {
      const response = await api.get("/users");
      const usuariosMapeados = response.data.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }));
      setUsuarios(usuariosMapeados);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Función para manejar la eliminación de un usuario
  const handleUserDeleted = (id) => {
    // Filtrar el usuario eliminado del estado
    setUsuarios((prevUsuarios) => prevUsuarios.filter((user) => user.id !== id));
  };

  // Función para manejar la creación de un usuario
  // const handleUserCreated = (newUser) => {
  //   // Agregar el nuevo usuario al estado
  //   setUsuarios((prevUsuarios) => [...prevUsuarios, newUser]);
  // };

  const indiceInicio = (paginaActual - 1) * usuariosPorPagina;
  const indiceFin = indiceInicio + usuariosPorPagina;
  const usuariosPaginados = usuarios.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

  return (
    <div>
      {/* Pasar handleUserCreated como prop al modal */}
      <TablaPermisos
        datos={usuariosPaginados}
        onUserDeleted={handleUserDeleted}
      />
      <button
        onClick={() => setPaginaActual(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        Anterior
      </button>
      <span>
        Página {paginaActual} de {totalPaginas}
      </span>
      <button
        onClick={() => setPaginaActual(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        Siguiente
      </button>
    </div>
  );
};

export default PaginacionPermisos;