const express = require("express");
const router = express.Router();
const cabinController = require("../controllers/cabinController");

// Rutas para peticiones cabina

// Crear una nueva cabina
router.post('/', cabinController.createCabin);

// Obtener todas las cabinas
router.get('/', cabinController.getAllCabins);

// Obtener una cabina por Id
router.get('/:id', cabinController.getCabinById);

// Actualizar una cabina segun su Id
router.put('/:id', cabinController.updateCabin);

// Eliminar una cabina segun su Id
router.delete('/:id', cabinController.deleteCabin);



module.exports = router;