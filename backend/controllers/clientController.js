const Client = require("../models/Client");

// Obtener todos los clientes
exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los clientes", error: error.message });
    }
};

// Crear un nuevo cliente
exports.createClient = async (req, res) => {
    try {
        const { documentType, documentNumber, name, nationality, phone, email } = req.body;

        // Verificar si el cliente ya existe por el documento
        const existingClient = await Client.findOne({ documentNumber });
        if (existingClient) {
            return res.status(400).json({ message: "El cliente ya está registrado con ese documento." });
        }

        const newClient = new Client({
            documentType,
            documentNumber,
            name,
            nationality,
            phone,
            email
        });

        await newClient.save();
        res.status(201).json({ message: "Cliente registrado exitosamente", client: newClient });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el cliente", error: error.message });
    }
};

// Obtener un cliente por ID
exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el cliente", error: error.message });
    }
};

// Actualizar un cliente
exports.updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClient) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json({ message: "Cliente actualizado", client: updatedClient });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el cliente", error: error.message });
    }
};

// Eliminar un cliente
exports.deleteClient = async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el cliente", error: error.message });
    }
};
