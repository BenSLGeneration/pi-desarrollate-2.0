const Cabin = require("../models/Cabin");

// Obtener todos los datos de cabinas
exports.getAllCabins = async (req, res) => {
    try {
        const cabins = await Cabin.find();
        res.status(200).json(cabins);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las cabinas', error: error.message });
    }
};


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
        res.status(201).json({ message: 'Cabina registrada exitosamente.', cabin: newCabin});
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la cabina.', error: error.message });
    }
};


// Obtener cabina especifica por Id
exports.getCabinById = async (req, res) => {
    try {
        const cabin = await Cabin.findById(req.params.id);
        if(!cabin) {
            return res.status(404).json({ message: 'La cabina no fue encontrada.' });
        }
        res.status(200).json(cabin);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la cabina.' });
    }
};


// Actualizar datos de cabina por Id
exports.updateCabin = async (req, res) => {
    try {
        const { type, number, maxAdults, maxChildren, hasHotTub, status, price, currency } = req.body;
        
        // Verificar si la cabina existe
        const cabin = await Cabin.findById(req.params.id);
        if(!cabin) {
            return res.status(404).json({ message: 'La cabina no fue encontrada.' });
        }

        // Verificar si el numero de cabina ya esta en uso por otra cabina
        if (number && number !== cabin.number) {
            const existingCabin = await Cabin.findOne({ number });
            if (existingCabin) {
                return res.status(400).json({ message: 'Ya existe una cabina registrada con ese número.'});
            }
        }

        // Actualizar datos de cabina
        cabin.type = type || cabin.type;
        cabin.number = number || cabin.number;
        cabin.maxAdults = maxAdults || cabin.maxAdults;
        cabin.maxChildren = maxChildren || cabin.maxChildren;
        cabin.hasHotTub = hasHotTub || cabin.hasHotTub;
        cabin.status = status || cabin.status;
        cabin.price = price || cabin.price;
        cabin.currency = currency || cabin.currency;

        // Guardar los cambios
        await cabin.save();
        res.status(200).json({ message: 'Cabina actualizada exitosamente.', cabin });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la cabina' });
    }
};


// Eliminar cabina por Id
exports.deleteCabin = async (req, res) => {
    try {
        const deleteCabin = await Cabin.findByIdAndDelete(req.params.id);
        if(!deleteCabin) {
            return res.status(404).json({ message: 'La cabina no fue encontrada.' });
        }
        res.status(200).json({ message: 'Cabina eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la cabina.' });
    }
};