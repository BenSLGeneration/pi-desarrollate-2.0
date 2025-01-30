import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Login/bast.css";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <main className="form-signin w-100 m-auto">
        <form>
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
                onClick={togglePasswordVisibility}
                tabIndex="-1"
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>

            {/* Mensaje de error */}
            <div id="error-message" className="text-danger text-center mt-3" style={{ display: "none" }}></div>

            {/* Botón de ingreso */}
            <button className="btn btn-dark w-100 py-2" type="submit">
              Ingresar
            </button>

            {/* Pie de página */}
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