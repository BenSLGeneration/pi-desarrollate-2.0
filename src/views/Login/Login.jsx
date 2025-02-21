import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir
import axios from "../../api/axios"; // Importa la instancia de Axios
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Login/bast.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook de React Router para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Enviar credenciales al backend
      const response = await axios.post("/users/login", { email, password });

      // Extraer el token del backend
      const { token } = response.data;

      // Almacenar el token en localStorage
      localStorage.setItem("token", token);

      // Limpiar errores y redirigir al dashboard
      setError("");
      alert("¡Inicio de sesión exitoso!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      // Mostrar mensaje de error si las credenciales son incorrectas
      if (error.response && error.response.status === 400) {
        setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      } else if (error.response && error.response.status === 404) {
        setError("Endpoint no encontrado. Verifica la URL del backend.");
      } else {
        setError("Ocurrió un error inesperado. Inténtalo más tarde.");
      }

    }
  };

  return (
    <div className="login-container">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <div className="login-box">
            <div className="text-center">
              <h1 className="h3 mb-3 fw-normal">Inicio de sesión</h1>
              <img
                className="mb-4"
                src="https://www.chelenko.com/wp-content/uploads/2020/12/logo_CHELENKO-Top-bar-Black-1024x311.png"
                alt="logo chelenko"
                height="90"
              />
            </div>

            {/* Campo de correo electrónico */}
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ opacity: "70%" }}
              />
              <label htmlFor="floatingInput">Correo Electrónico</label>
            </div>

            {/* Campo de contraseña */}
            <div className="form-floating position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ opacity: "70%" }}
              />
              <label htmlFor="floatingPassword">Contraseña</label>
              <button
                className="btn position-absolute"
                type="button"
                id="togglePassword"
                style={{
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                }}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>

            {/* Mensaje de error */}
            {error && <div className="text-danger text-center mt-3">{error}</div>}

            {/* Botón de ingreso */}
            <button className="btn btn-dark w-100 py-2" type="submit">
              Ingresar
            </button>
            <p className="mt-5 mb-3 text-body-secondary text-center">
              &copy; desarrolla-té
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;