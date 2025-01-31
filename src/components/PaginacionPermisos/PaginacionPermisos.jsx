import { useState } from "react";
import TablaPermisos from "../TablaPermisos/TablaPermisos"; // Importa la tabla

const PaginacionPermisos = ({ datos, onAddUser }) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const usuariosPorPagina = 10;

    // Calcular el índice de los usuarios que se deben mostrar
    const indiceInicio = (paginaActual - 1) * usuariosPorPagina;
    const indiceFin = indiceInicio + usuariosPorPagina;
    const usuariosPaginados = datos.slice(indiceInicio, indiceFin);

    // Calcular el número total de páginas
    const totalPaginas = Math.ceil(datos.length / usuariosPorPagina);

    return (
        <div>
            {/* Renderiza la tabla con solo los usuarios de la página actual */}
            <TablaPermisos datos={usuariosPaginados} onAddUser={onAddUser} />

            {/* Controles de paginación */}
            <div className="d-flex justify-content-center mt-3">
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
