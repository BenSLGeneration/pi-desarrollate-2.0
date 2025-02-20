import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir
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
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Si la respuesta es exitosa, redirige al dashboard
        alert("¡Datos correctos! Has iniciado sesión correctamente.");
        navigate("/dashboard");
      } else {
        // Si hay un error, muestra el mensaje de error del backend
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al conectar con el servidor");
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