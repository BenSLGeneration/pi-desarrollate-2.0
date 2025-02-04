const mongoose = require("mongoose");
require("dotenv").config(); // Cargar variables de entorno

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB conectadouu");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error);
        process.exit(1); // Detener la app en caso de error
    }
};

module.exports = connectDB;
