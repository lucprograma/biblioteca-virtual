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
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
        })
      });
      if (!res.ok) {
        alert(`Credenciales inválidas. Por favor, inténtalo de nuevo.${res}` );
        return
      }
      const data = await res.json();
      console.log("Login successful:", data);
      navigate("/")
      navigate(0)
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
      <p style={{ color: "white"}} className="mt-3">
        No tenes una cuenta?,&nbsp;
      <a href="" onClick={
        (event) => {
          event.preventDefault();
          navigate("/signIn");
        }
      }>
         crea una
      </a></p>
    </form>
  </div>
);}

export default LoginContent;