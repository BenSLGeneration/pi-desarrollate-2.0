const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { removeListener } = require("../models/Client");

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    console.log("Datos recibidos en el backend:", { name, email, password, role });

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

        console.log("Usuario creado antes de guardar:", newUser);
       
        await newUser.save();

        console.log("Role del usuario:", newUser.role);
       
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role }, 
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        console.log("Token generado:", token);

        res.status(201).json({
         message: "Usuario creado exitosamente",
         user: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
         }, 
         token 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el usuario." });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca al usuario por su email
        const findUser = await User.findOne({ email: email });

        // Verifica si el usuario existe
        if (!findUser) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const passVerifi = bcrypt.compareSync(password, findUser.password);
        if (!passVerifi) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Generar el token con el campo "role" correcto
        const token = jwt.sign(
            { id: findUser._id, role: findUser.role }, // Campo correcto: "role"
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Enviar el token en una cookie y en la respuesta JSON
        res.status(200)
            .cookie("token", token, {
                httpOnly: true, // La cookie solo es accesible desde el servidor
                secure: false, // Cambia a true si estás usando HTTPS
                maxAge: 3600000 // Tiempo de expiración de la cookie (1 hora)
            })
            .json({
                message: "Usuario Logeado",
                data: {
                    name: findUser.name,
                    id: findUser._id,
                    token: token // También envías el token en la respuesta JSON
                }
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
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

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser };