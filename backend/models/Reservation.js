const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  cabin: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Cabin", 
    required: true 
  },
  clientDocumentType: { 
    type: String, 
    required: true 
  },
  clientDocumentNumber: { 
    type: String,  // Cambiado a String para almacenar el número de documento
    required: true 
  },
  checkinDate: { 
    type: Date, 
    required: true 
  },
  checkoutDate: { 
    type: Date, 
    required: true 
  },
  adults: { 
    type: Number, 
    required: true 
  },
  children: { 
    type: Number, 
    required: true 
  },
  hasHotTub: { 
    type: Boolean, 
    default: false 
  },
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ["Crédito", "Débito"] 
  },
  paymentOrigin: { 
    type: String, 
    required: true, 
    enum: ["Nacional", "Extranjero"] 
  },
  isHistorical: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
