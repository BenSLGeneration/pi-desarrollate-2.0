const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware para manejar el cuerpo de las peticiones
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Importar rutas
const userRoutes = require("./routes/userRoutes");
const reservationRoutes = require("./routes/reservationRoutes"); // Asegúrate de agregar esta línea
const clientRoutes = require("./routes/clientRoutes"); // Importar rutas de clientes
const cabinRoutes = require("./routes/cabinRoutes"); // Importar rutas de cabinas
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes); // Agregar la ruta de reservas
app.use("/api/clients", clientRoutes); // Registrar rutas en la API
app.use("/api/cabinas", cabinRoutes); // Registrar rutas en la API

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
