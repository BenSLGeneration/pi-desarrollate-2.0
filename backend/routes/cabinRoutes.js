const express = require("express");
const router = express.Router();
const cabinController = require("../controllers/cabinController");

// Rutas para la gestión de cabañas
router.get("/", cabinController.getAllCabins);        // Obtener todas las cabañas
router.post("/", cabinController.createCabin);        // Crear una nueva cabaña
router.get("/:id", cabinController.getCabinById);     // Obtener una cabaña por ID
router.put("/:id", cabinController.updateCabin);      // Actualizar una cabaña
router.delete("/:id", cabinController.deleteCabin);   // Eliminar una cabaña

module.exports = router;
