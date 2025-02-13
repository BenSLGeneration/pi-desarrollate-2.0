const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Obtener todas las reservas
router.get("/", reservationController.getAllReservations);

// Agregar una nueva reserva
router.post("/", reservationController.addReservation);

module.exports = router;
