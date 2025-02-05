const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware para manejar el cuerpo de las peticiones
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectadou"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Importar rutas
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
