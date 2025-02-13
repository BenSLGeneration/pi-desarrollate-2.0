const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

// Rutas para la gestión de clientes
router.get("/", clientController.getAllClients);        // Obtener todos los clientes
router.post("/", clientController.createClient);        // Crear un nuevo cliente
router.get("/:id", clientController.getClientById);     // Obtener un cliente por ID
router.put("/:id", clientController.updateClient);      // Actualizar un cliente
router.delete("/:id", clientController.deleteClient);   // Eliminar un cliente

module.exports = router;
