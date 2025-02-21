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

  // Calcular el número total de páginas (mínimo 1)
  const totalPaginas = datos.length > 0 ? Math.ceil(datos.length / usuariosPorPagina) : 1;

  // Ajustar la página actual si no hay suficientes usuarios para la página actual
  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(1); // Ir a la página 1 si no hay usuarios o si la página actual no existe
    }
  }, [datos, paginaActual, totalPaginas]);

  return (
    <div>
      {/* Controles de paginación */}
      <div className="d-flex align-items-center mb-3 mt-2">
        <button
          className="btn btn-primary mx-1"
          onClick={() => setPaginaActual(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>

        <span className="mx-2">Página {paginaActual} de {totalPaginas}</span>

        <button
          className="btn btn-primary mx-1"
          onClick={() => setPaginaActual(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>

      {/* Renderiza la tabla con solo los usuarios de la página actual */}
      <TablaPermisos datos={usuariosPaginados} onUserDeleted={handleUserDeleted} />

      {/* Repetir controles de paginación (opcional) */}
      <div className="d-flex align-items-center mt-1 mb-3">
        <button
          className="btn btn-primary mx-1"
          onClick={() => setPaginaActual(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>

        <span className="mx-2">Página {paginaActual} de {totalPaginas}</span>

        <button
          className="btn btn-primary mx-1"
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