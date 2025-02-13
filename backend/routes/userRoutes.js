const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");

// Definir rutas
router.post("/", createUser); // Crear usuario
router.get("/", getUsers); // Obtener todos los usuarios
router.get("/:id", getUserById); // Obtener un usuario por ID
router.put("/:id", updateUser); // Actualizar un usuario
router.delete("/:id", deleteUser); // Eliminar un usuario

module.exports = router;