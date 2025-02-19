const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado." });
    }

    // Extrae el token del encabezado "Bearer <token>"
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ message: "Formato de token inválido." });
    }

    const jwtToken = tokenParts[1];

    // Depuración: Verifica el token recibido
    console.log("Token recibido:", jwtToken);

    // Verifica el token
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Error al verificar el token:", err); // Depuración
            return res.status(401).json({ message: "Token inválido." });
        }

        // Depuración: Verifica el token decodificado
        console.log("Token decodificado:", decoded);

        // Adjunta el ID y el rol del usuario al objeto `req`
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

module.exports = authJWT;