const Reservation = require("../models/Reservation");

// Obtener todas las reservas
exports.getAllReservations = async (req, res) => {
    try {
      const reservations = await Reservation.find()
        .populate('cabin') // Si tienes una referencia, asegúrate de que esté bien configurada
        .populate('clientDocumentNumber'); // Asegúrate de que esta referencia sea correcta también
  
      if (!reservations || reservations.length === 0) {
        return res.status(404).json({ message: "No se encontraron reservas" });
      }
  
      res.status(200).json(reservations);
    } catch (err) {
      console.error(err); // Agregar log para más detalles
      res.status(500).json({ message: "Error al obtener las reservas", error: err.message });
    }
  };
  

// Agregar una nueva reserva
exports.addReservation = async (req, res) => {
  try {
    const { cabin, clientDocumentType, clientDocumentNumber, checkinDate, checkoutDate, adults, children, hasHotTub, paymentMethod, paymentOrigin, isHistorical } = req.body;

    const newReservation = new Reservation({
      cabin,
      clientDocumentType,
      clientDocumentNumber,
      checkinDate,
      checkoutDate,
      adults,
      children,
      hasHotTub,
      paymentMethod,
      paymentOrigin,
      isHistorical
    });

    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(500).json({ message: "Error al agregar la reserva", error: err });
  }
};
