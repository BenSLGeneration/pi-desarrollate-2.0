import React, { useState } from "react";
import TablaPermisos from "../TablaPermisos/TablaPermisos";

const PaginacionPermisos = ({ datos, onUserDeleted }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  // Función para manejar la eliminación de un usuario
  const handleUserDeleted = (id) => {
    console.log("Usuario eliminado con ID:", id);
    onUserDeleted(id); // Propagar la eliminación al componente padre
  };

  const indiceInicio = (paginaActual - 1) * usuariosPorPagina;
  const indiceFin = indiceInicio + usuariosPorPagina;
  const usuariosPaginados = datos.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(datos.length / usuariosPorPagina);

  return (
    <div>
      {/* Pasar los datos paginados a la tabla */}
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