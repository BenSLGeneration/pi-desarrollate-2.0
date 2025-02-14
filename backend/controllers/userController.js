const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Por favor, rellene todos los campos." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "El usuario ya existe." });
    }

    if (role && !["usuario", "admin"].includes(role)) {
        return res.status(400).json({ message: "Rol no válido." });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "usuario"  
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, role: newUser.role }, 
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "Usuario creado exitosamente", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el usuario." });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); 
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los usuarios." });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); 
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el usuario." });
    }
};

const updateUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        if (role && ["usuario", "admin"].includes(role)) {
            user.role = role;
        }

        await user.save();
        res.status(200).json({ message: "Usuario actualizado exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el usuario." });
    }
};

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