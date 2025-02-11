const express = require("express");
const router = express.Router();
const { createUser, createReservation } = require("../controllers/userController");

router.post("/reservations", createReservation);  // Crear una nueva reservacion para añadir a la tabla



module.exports = router;