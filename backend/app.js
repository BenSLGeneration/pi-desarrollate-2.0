const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Configurar variables de entorno
dotenv.config();

const app = express();

// Middleware para manejar el cuerpo de las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Importar rutas (solo una vez cada una)
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const clientRoutes = require("./routes/clientRoutes");
const cabinRoutes = require("./routes/cabinRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Registrar rutas en la API (solo una vez cada una)
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/cabins", cabinRoutes); // Corrección: "cabinas" -> "cabins" (para mantener consistencia en inglés)
app.use("/api/payments", paymentRoutes);

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
