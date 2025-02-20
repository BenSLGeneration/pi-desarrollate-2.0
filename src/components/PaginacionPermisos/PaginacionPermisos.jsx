import React, { useEffect, useState } from "react";
import TablaPermisos from "../TablaPermisos/TablaPermisos";
import api from "../../api/axios";

const PaginacionPermisos = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  useEffect(() => {
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
    fetchUsuarios();
  }, []);

  const handleUserDeleted = () => {
    // Volver a cargar la lista de usuarios después de eliminar uno
    setPaginaActual(1); // Reiniciar a la primera página
    fetchUsuarios(); // Recargar la lista
  };

  const indiceInicio = (paginaActual - 1) * usuariosPorPagina;
  const indiceFin = indiceInicio + usuariosPorPagina;
  const usuariosPaginados = usuarios.slice(indiceInicio, indiceFin);

  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

  return (
    <div>
      <TablaPermisos datos={usuariosPaginados} onUserDeleted={handleUserDeleted} />
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