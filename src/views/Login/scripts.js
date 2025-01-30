document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Previene que se recargue la página
  
    const email = document.getElementById("floatingInput").value.trim();
    const password = document.getElementById("floatingPassword").value.trim();
    const errorMessage = document.getElementById("error-message");
  
    if (email === "" || password === "") {
      errorMessage.textContent = "Por favor, completa todos los campos.";
      errorMessage.style.display = "block";
    } else {
      errorMessage.style.display = "none";
      alert("¡Datos correctos! Has iniciado sesión correctamente.");
      window.location.href = "../index.html";
    }
  });
  
  
  document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordInput = document.getElementById("floatingPassword");
    const icon = this.querySelector("i");
  
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.classList.remove("bi-eye");
      icon.classList.add("bi-eye-slash");
    } else {
      passwordInput.type = "password";
      icon.classList.remove("bi-eye-slash");
      icon.classList.add("bi-eye");
    }
  });