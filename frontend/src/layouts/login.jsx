import React from "react";
import { useNavigate } from "react-router";

const LoginContent = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);
  const tryLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try{
      const res = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: email,
        })
      });
      if (!res.ok) {
        alert("Credenciales inválidas. Por favor, inténtalo de nuevo.");

      }
      const data = res.json();
      console.log("Login successful:", data);
      return navigate("/");
    }
    catch (error) {
      console.error("Error during login:", error);
      alert("Credenciales inválidas. Por favor, inténtalo de nuevo.");
      
    }
  }

  return (
  <div
    className="container min-vh-100 d-flex align-items-center justify-content-center"
    style={{ backgroundColor: "rgb(31, 31, 31)" }}
  >
    {/* 
    <div className="position-absolute top-0 end-0 m-3">
      <a href="/register" className="text-white text-decoration-none small">
        ¿No tienes cuenta? Crea una
      </a>
    </div> 
    */}
    <form
      className="bg-dark p-5 rounded shadow"
      style={{ minWidth: 400, maxWidth: 600, width: "100%" }}
      onSubmit={tryLogin}

    >
      <h2 className="text-white mb-4 text-center">Iniciar sesión</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label text-white">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="tucorreo@ejemplo.com"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label text-white">
          Contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="••••••••"
          required
        />
      </div>
      <button
        type="submit"
        className="btn w-100"
        style={{ backgroundColor: "#c0392b", color: "white" }}
      >
        Entrar
      </button>
    </form>
  </div>
);}

export default LoginContent;