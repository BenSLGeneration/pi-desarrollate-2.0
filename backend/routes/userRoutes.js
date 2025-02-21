const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } = require("../controllers/userController");

// Rutas públicas
router.post("/login", loginUser); // Ruta para el login

// Rutas protegidas
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;