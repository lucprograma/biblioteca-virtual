import React, { useState } from "react";
import {useNavigate} from 'react-router';
import PasswordInput from "../components/passwordInput";
export default function SignInForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dni: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error en la petición");

      const data = await res.json();
      setMessage("✅ Registro exitoso");
      navigate('/login')
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      setMessage("❌ Hubo un error, intenta nuevamente");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div
    className="container min-vh-100 d-flex align-items-center justify-content-center"
    style={{ backgroundColor: "rgb(31, 31, 31)" }}
  >
    <form
      className="bg-dark p-5 rounded shadow mt-4 mb-4"
      style={{ minWidth: 400, maxWidth: 600, width: "100%" }}
      onSubmit={handleSubmit}

    >
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Crear cuenta
        </h2>

        <div className="mb-4">
          <label className="block text-white mb-1">Nombre</label><br/>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-neutral-700 text-black outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Tu nombre"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1">Email</label><br/>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-neutral-700 text-black outline-none focus:ring-2 focus:ring-red-500"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>

        <PasswordInput value={formData.password} onChange={handleChange} />

        <div className="mb-6">
          <label className="block text-white mb-1">DNI</label><br/>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-neutral-700 text-black outline-none focus:ring-2 focus:ring-red-500"
            placeholder="12345678X"
          />
        </div>

      <button
        type="submit"
        className="btn w-60 mt-3"
        style={{ backgroundColor: "#c0392b", color: "white" }}
      >
          {loading ? "Enviando..." : "Registrarse"}
        </button>

        {message && (
          <p className="text-center text-md mt-4 text-white">{message}</p>
        )}
      </form>
    </div>
  );
}
