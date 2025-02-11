const User = require("../models/userModel");

// Función para crear un usuario PO
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Por favor, rellene todos los campos." });
    }

    // Verificar si el correo ya está registrado
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "El usuario ya existe." });
    }

    try {
        // Crear un nuevo usuario PO
        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({ message: "Usuario creado exitosamente", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el usuario." });
    }
};

// Funcion para añadir nuevos datos a la tabla de resumen de reservas

module.exports = { createUser };
