const mongoose = require("mongoose");

const cabinSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true, 
    enum: ["Couple Room", "Suite"] 
  },
  number: { 
    type: String, 
    required: true, 
    unique: true 
  },
  maxAdults: { 
    type: Number, 
    required: true 
  },
  maxChildren: { 
    type: Number, 
    required: true 
  },
  hasHotTub: { 
    type: Number, 
    default: 0
  },
  status: { 
    type: String, 
    enum: ["Reservada", "Cancelada"], 
    default: "Disponible" 
  },
  price: { 
    type: Number, 
    required: true 
  },
  currency: { 
    type: String, 
    default: "CLP" 
  }
});

module.exports = mongoose.model("Cabin", cabinSchema); // <-- Esto debe estar así
