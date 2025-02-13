const express = require("express");
const router = express.Router();
const cabinController = require("../controllers/cabinController");

// Rutas para peticiones 

router.post('/', cabinController.createCabin);















module.exports = router;