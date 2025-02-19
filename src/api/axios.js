// src/api/axios.js
import axios from 'axios';

// Aquí defines la URL base de tu API (ajusta según tu entorno)
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Ajusta el puerto y la ruta de la API
    timeout: 1000,
});

export default api;
