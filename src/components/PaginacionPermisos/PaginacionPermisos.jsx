import React, { useState, useEffect } from "react";
import TablaPermisos from "../TablaPermisos/TablaPermisos";

const PaginacionPermisos = ({ datos, onUserDeleted }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 10;

  // Función para manejar la eliminación de un usuario
  const handleUserDeleted = (id) => {
    console.log("Usuario eliminado con ID:", id);
    onUserDeleted(id); // Propagar la eliminación al componente padre
  };

  // Calcular el índice de inicio y fin para la paginación
  const indiceInicio = (paginaActual - 1) * usuariosPorPagina;
  const indiceFin = indiceInicio + usuariosPorPagina;
  const usuariosPaginados = datos.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(datos.length / usuariosPorPagina);

  // Ajustar la página actual si no hay suficientes usuarios para la página actual
  useEffect(() => {
    if (paginaActual > totalPaginas && totalPaginas > 0) {
      setPaginaActual(totalPaginas); // Ir a la última página válida
    }
  }, [datos, paginaActual, totalPaginas]);

  return (
    <div>
            <div className="d-flex align-items-center mt-3">
        <button
          className="btn btn-primary btn- mx-1"
          onClick={() => setPaginaActual(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        <span className="text-center">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          className="btn btn-primary btn- mx-1"
          onClick={() => setPaginaActual(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>
      <div className="mt-4">

      </div>
      {/* Pasar los datos paginados a la tabla */}
      <TablaPermisos datos={usuariosPaginados} onUserDeleted={handleUserDeleted} />
      <div className="d-flex align-items-center mt-3">
        <button
          className="btn btn-primary btn- mx-1"
          onClick={() => setPaginaActual(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        <span className="text-center">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          className="btn btn-primary btn- mx-1"
          onClick={() => setPaginaActual(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PaginacionPermisos;