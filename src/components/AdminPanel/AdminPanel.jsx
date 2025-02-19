import { useState, useEffect } from 'react';
import "../../views/Dashboard/Dashboard.css"

const AdminPanel = () => {
    const users = [
        { id: 1, userName: 'Nombre de usuario', role: 'Admin' },
        { id: 2, userName: 'Nombre de usuario', role: 'Admin' },
        { id: 3, userName: 'Nombre de usuario', role: 'Admin' },
        { id: 4, userName: 'Nombre de usuario', role: 'Admin' },
        { id: 5, userName: 'Nombre de usuario', role: 'Admin' },
        // Agregar más usuarios aquí...
    ];

    // Estado para almacenar las URLs de las imágenes
    const [userImages, setUserImages] = useState([]);

    // Efecto para obtener las imágenes aleatorias
    useEffect(() => {
        const fetchUserImages = async () => {
            try {
                // Hacemos una solicitud a la API para obtener imágenes aleatorias
                const responses = await Promise.all(
                    users.map(() =>
                        fetch("https://randomuser.me/api/")
                            .then((response) => response.json())
                            .then((data) => data.results[0].picture.thumbnail)
                    )
                );
                setUserImages(responses); // Guardamos las URLs de las imágenes en el estado
            } catch (error) {
                console.error("Error al obtener las imágenes: ", error);
            }
        };

        fetchUserImages();
    }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente

    return (
        <div className="container my-4">
            <div className="card border-0 shadow-sm p-4 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 fw-bold">Panel de Administración</h5>
                </div>
                <div style={{ maxHeight: '300px', maxWidth: 'auto', overflowY: 'auto' }}>
                    {users.map((user, index) => (
                        <div key={user.id}>
                            <div className="d-flex align-items-center mb-3">
                                {/* Mostramos la imagen aleatoria en lugar del ícono */}
                                {userImages[index] ? (
                                    <img
                                        src={userImages[index]}
                                        alt={`Usuario ${user.id}`}
                                        className="me-3"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : (
                                    <i
                                        className="bi bi-person-circle me-3"
                                        style={{ fontSize: '2rem', color: '#007bff' }}
                                    ></i>
                                )}
                                <div>
                                    <p className="mb-0 fw-bold">{user.userName}</p>
                                    <p className="mb-0 text-muted">{user.role}</p>
                                </div>
                            </div>
                            {user.id !== users.length && <hr className="my-2" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;