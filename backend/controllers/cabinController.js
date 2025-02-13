const Cabin = require("../models/Cabin");

// Obtener todos los datos de cabinas






// Crear nuevos datos cabina
exports.createCabin = async (req, res) => {
    try {
        const { type, number, maxAdults, maxChildren, hasHotTub, status, price, currency } = req.body;

        // Verificar si la cabina ya existe por el numero
        const existingCabin = await Cabin.findOne({ number });
        if (existingCabin) {
            return res.status(400).json({ message: 'Ya existe una cabina registrada con ese número.'});
        }

        // Crear nuevos datos de cabina
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

        // Guardar nuevos datos de cabina
        await newCabin.save();
        res.status(201).json({ message: 'Cabina registrada exitosamente.', Cabin: newCabin});
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la cabina.', error: error.message });
    }
};


// Obtener cabina especifica por Id






// Actualizar datos cabina






// Eliminar datos cabina