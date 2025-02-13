const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Función para crear un usuario
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validar campos requeridos
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Por favor, rellene todos los campos." });
    }

    // Verificar si el correo ya está registrado
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "El usuario ya existe." });
    }

    try {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear un nuevo usuario
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Generar JWT
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role }, // Payload del token
            process.env.JWT_SECRET, // Clave secreta
            { expiresIn: "1h" } // Expiración del token
        );

        // Respuesta exitosa
        res.status(201).json({ message: "Usuario creado exitosamente", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el usuario." });
    }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Excluir contraseñas
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los usuarios." });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); // Excluir contraseña
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el usuario." });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Actualizar campos
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.status(200).json({ message: "Usuario actualizado exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el usuario." });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        res.status(200).json({ message: "Usuario eliminado exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el usuario." });
    }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };