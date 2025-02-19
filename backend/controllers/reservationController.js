const Reservation = require("../models/Reservation");
const Cabin = require("../models/Cabin");
const Client = require("../models/Client");
const Payment = require("../models/Payment");


// Obtener todas las reservas
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate("cabin");

        // Buscar datos adicionales manualmente
        const formattedReservations = await Promise.all(reservations.map(async (reservation) => {
            // Buscar cliente manualmente por su documentNumber
            const client = await Client.findOne({ documentNumber: reservation.clientDocumentNumber });
            // Buscar pago asociado a la reserva
            const payment = await Payment.findOne({ reservation: reservation._id });

            // Calcular IVA si el huésped es chileno
            const isChilean = client?.nationality === "Chilena";
            const iva = isChilean ? (payment?.amount || 0) * 0.19 : 0;
            const total = (payment?.amount || 0) + iva;

            return {
                _id: reservation._id,
                client: client?.name || "Sin nombre",
                email: client?.email || "No disponible",
                checkinDate: reservation.checkinDate,
                checkoutDate: reservation.checkoutDate,
                adults: reservation.adults,
                children: reservation.children,
                hasHotTub: reservation.hasHotTub,
                paymentMethod: reservation.paymentMethod,
                cabinType: reservation.cabin?.type || "Desconocido",
                paymentAmount: payment?.amount || 0,
                iva,
                total,
                status: reservation.cabin?.status || "Desconocido"  // Aquí corregimos para usar el status real de la cabaña
            };
        }));

        res.status(200).json(formattedReservations);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({ message: "Error al obtener las reservas", error: error.message });
    }
};






// Crear una nueva reserva
exports.addReservation = async (req, res) => {
    try {
        const { 
            cabin, clientDocumentType, clientDocumentNumber, checkinDate, checkoutDate, 
            adults, children, hasHotTub, paymentMethod, paymentOrigin 
        } = req.body;

        // Verificar si la cabaña existe
        const existingCabin = await Cabin.findById(cabin);
        if (!existingCabin) {
            return res.status(404).json({ message: "Cabaña no encontrada" });
        }

        // Verificar si el cliente existe
        const existingClient = await Client.findOne({ documentNumber: clientDocumentNumber });
        if (!existingClient) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        const newReservation = new Reservation({
            cabin, clientDocumentType, clientDocumentNumber, checkinDate, checkoutDate,
            adults, children, hasHotTub, paymentMethod, paymentOrigin
        });

        await newReservation.save();
        res.status(201).json({ message: "Reserva creada exitosamente", reservation: newReservation });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar la reserva", error: error.message });
    }
};

// Obtener una reserva por ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate("cabin")
            .populate("clientDocumentNumber");
        if (!reservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la reserva", error: error.message });
    }
};

// Actualizar una reserva
exports.updateReservation = async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        res.status(200).json({ message: "Reserva actualizada", reservation: updatedReservation });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la reserva", error: error.message });
    }
};

// Eliminar una reserva
exports.deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        res.status(200).json({ message: "Reserva eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la reserva", error: error.message });
    }
};
