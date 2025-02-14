const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Configurar variables de entorno
dotenv.config();

const app = express();

// Middleware para manejar el cuerpo de las peticiones
app.use(express.json()); // Para JSON
app.use(express.urlencoded({ extended: true })); // Para datos de formularios

// Conexión a MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true, // Opción para usar el nuevo parser de URL de MongoDB
        useUnifiedTopology: true, // Opción para usar el motor de topología unificada
    })
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Importar rutas
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes"); // Asegúrate de agregar esta línea
const clientRoutes = require("./routes/clientRoutes"); // Importar rutas de clientes
const cabinRoutes = require("./routes/cabinRoutes"); // Importar rutas de cabinas
const reservationRoutes = require("./routes/reservationRoutes");
const clientRoutes = require("./routes/clientRoutes");

// Registrar rutas en la API
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes); // Agregar la ruta de reservas
app.use("/api/clients", clientRoutes); // Registrar rutas en la API
app.use("/api/cabinas", cabinRoutes); // Registrar rutas en la API
app.use("/api/reservations", reservationRoutes);
app.use("/api/clients", clientRoutes);

// Ruta de prueba para verificar que el servidor está funcionando
app.get("/", (req, res) => {
    res.status(200).json({ message: "Servidor funcionando correctamente" });
});

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

// Manejo de errores globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Error interno del servidor" });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});