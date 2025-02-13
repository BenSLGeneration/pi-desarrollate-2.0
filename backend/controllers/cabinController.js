const Cabin = require("../models/Cabin");

// Obtener todas las cabañas
exports.getAllCabins = async (req, res) => {
    try {
        const cabins = await Cabin.find();
        res.status(200).json(cabins);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las cabañas", error: error.message });
    }
};

// Crear una nueva cabaña
exports.createCabin = async (req, res) => {
    try {
        const { type, number, maxAdults, maxChildren, hasHotTub, status, price, currency } = req.body;
        
        // Verificar si ya existe una cabaña con ese número
        const existingCabin = await Cabin.findOne({ number });
        if (existingCabin) {
            return res.status(400).json({ message: "Ya existe una cabaña con ese número." });
        }

        const newCabin = new Cabin({
            type,
            number,
            maxAdults,
            maxChildren,
            hasHotTub,
            status,
            price,
            currency
        });

        await newCabin.save();
        res.status(201).json({ message: "Cabaña creada exitosamente", cabin: newCabin });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la cabaña", error: error.message });
    }
};

// Obtener una cabaña por ID
exports.getCabinById = async (req, res) => {
    try {
        const cabin = await Cabin.findById(req.params.id);
        if (!cabin) {
            return res.status(404).json({ message: "Cabaña no encontrada" });
        }
        res.status(200).json(cabin);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la cabaña", error: error.message });
    }
};

// Actualizar una cabaña
exports.updateCabin = async (req, res) => {
    try {
        const updatedCabin = await Cabin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCabin) {
            return res.status(404).json({ message: "Cabaña no encontrada" });
        }
        res.status(200).json({ message: "Cabaña actualizada", cabin: updatedCabin });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la cabaña", error: error.message });
    }
};

// Eliminar una cabaña
exports.deleteCabin = async (req, res) => {
    try {
        const deletedCabin = await Cabin.findByIdAndDelete(req.params.id);
        if (!deletedCabin) {
            return res.status(404).json({ message: "Cabaña no encontrada" });
        }
        res.status(200).json({ message: "Cabaña eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la cabaña", error: error.message });
    }
};
