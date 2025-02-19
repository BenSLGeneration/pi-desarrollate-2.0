const Payment = require("../models/Payment");
const Reservation = require("../models/Reservation");

// Obtener todos los pagos
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("reservation");
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los pagos", error: error.message });
    }
};

// Crear un nuevo pago
exports.createPayment = async (req, res) => {
    try {
        const { reservation, amount, currency, paymentMethod, paymentStatus } = req.body;

        // Verificar si la reserva existe
        const existingReservation = await Reservation.findById(reservation);
        if (!existingReservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }

        const newPayment = new Payment({
            reservation,
            amount,
            currency,
            paymentMethod,
            paymentStatus
        });

        await newPayment.save();
        res.status(201).json({ message: "Pago registrado exitosamente", payment: newPayment });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el pago", error: error.message });
    }
};

// Obtener un pago por ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate("reservation");
        if (!payment) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el pago", error: error.message });
    }
};

// Actualizar un pago
exports.updatePayment = async (req, res) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPayment) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }
        res.status(200).json({ message: "Pago actualizado", payment: updatedPayment });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el pago", error: error.message });
    }
};

// Eliminar un pago
exports.deletePayment = async (req, res) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
        if (!deletedPayment) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }
        res.status(200).json({ message: "Pago eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el pago", error: error.message });
    }
};
