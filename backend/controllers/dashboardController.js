// Necesario para Funcion de Reservaciones
const Cabin = require("../models/Cabin");
const Client = require("../models/Client");
const Reservation = require("../models/Reservation");
const Payment = require("../models/Payment");

// Función para crear una nueva reserva
const createReservation = async (req, res) => {
    const {
        cabinId,
        clientDocumentType,
        clientDocumentNumber,
        checkinDate,
        checkoutDate,
        adults,
        children,
        hasHotTub,
        paymentMethod,
        paymentOrigin,
        amount
    } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!cabinId || !clientDocumentType || !clientDocumentNumber || !checkinDate || !checkoutDate || !adults || !children || !paymentMethod || !paymentOrigin || !amount) {
        return res.status(400).json({ message: "Por favor, rellene todos los campos requeridos." });
    }

    try {
        // Verificar que la cabaña exista
        const cabin = await Cabin.findById(cabinId);
        if (!cabin) {
            return res.status(404).json({ message: "La cabaña no existe." });
        }

        // Verificar que el cliente exista
        const client = await Client.findOne({ documentType: clientDocumentType, documentNumber: clientDocumentNumber });
        if (!client) {
            return res.status(404).json({ message: "El cliente no existe." });
        }

        // Crear la reserva
        const newReservation = new Reservation({
            cabin: cabinId,
            clientDocumentType,
            clientDocumentNumber,
            checkinDate,
            checkoutDate,
            adults,
            children,
            hasHotTub,
            paymentMethod,
            paymentOrigin
        });

        // Guardar la reserva en la base de datos
        await newReservation.save();

        // Crear el pago asociado a la reserva
        const newPayment = new Payment({
            reservation: newReservation._id,
            amount,
            currency: "CLP", // Moneda por defecto
            paymentMethod,
            paymentStatus: "Pendiente" // Estado inicial del pago
        });

        // Guardar el pago en la base de datos
        await newPayment.save();

        // Respuesta exitosa
        res.status(201).json({
            message: "Reserva creada exitosamente",
            reservation: newReservation,
            payment: newPayment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la reserva." });
    }
};

module.exports = { createReservation };