const express = require("express");
const router = express.Router();
const { createUser, createReservation } = require("../controllers/userController");

router.post("/", createUser);  // Aquí se define el endpoint POST




module.exports = router;
