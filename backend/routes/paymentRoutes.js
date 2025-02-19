const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Rutas para la gestión de pagos
router.get("/", paymentController.getAllPayments);        // Obtener todos los pagos
router.post("/", paymentController.createPayment);        // Crear un nuevo pago
router.get("/:id", paymentController.getPaymentById);     // Obtener un pago por ID
router.put("/:id", paymentController.updatePayment);      // Actualizar un pago
router.delete("/:id", paymentController.deletePayment);   // Eliminar un pago

module.exports = router;
