import React, { useEffect, useState } from "react";
import TablaPermisos from "../TablaPermisos/TablaPermisos";
import api from "../../api/axios";

const PaginacionPermisos = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const usuariosPorPagina = 10;

    useEffect(() => {
        // Obtener usuarios desde el backend
        const fetchUsuarios = async () => {
            try {
                const response = await api.get("/users");
                setUsuarios(response.data);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };
        fetchUsuarios();
    }, []);

    // Calcular el índice de los usuarios que se deben mostrar
    const indiceInicio = (paginaActual - 1) * usuariosPorPagina;
    const indiceFin = indiceInicio + usuariosPorPagina;
    const usuariosPaginados = usuarios.slice(indiceInicio, indiceFin);

    // Calcular el número total de páginas
    const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

    return (
        <div>
            {/* Renderiza la tabla con solo los usuarios de la página actual */}
            <TablaPermisos datos={usuariosPaginados} />

            {/* Controles de paginación */}
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