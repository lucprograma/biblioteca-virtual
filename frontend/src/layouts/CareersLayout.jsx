import React, { useEffect, useState } from "react";
import ModalForm from "../components/ModalForm";

function CareersLayout() {
  const [careers, setCareers] = useState([]);
  const [name, setName] = useState("");
  const [editando, setEditando] = useState(null);
  const getCareers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/careers/`, {
        credentials: "include",
      });
      const data = await response.json();
      setCareers(data);
    } catch (error) {
      console.error("Error fetching careers:", error);
    }
  }
  useEffect(() => {
    getCareers().then(setCareers(careers));
  }, []);
  const fetchCareers = async () => {
    try {
      const targetEndpoint = editando
        ? `${import.meta.env.VITE_API_URL}/api/careers/${editando.id}`
        : `${import.meta.env.VITE_API_URL}/api/careers/`;
      const method = editando ? "PATCH" : "POST";
      const response = await fetch(
        targetEndpoint,
        {
          credentials: "include",
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      const data = await response.json();
      setCareers(data);
      return data;
    } catch (error) {
      console.error("Error fetching careers:", error);
      return new Error("Error fetching careers");
    }}
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!fetchCareers()) return;
    if (editando) {
      setCareers((prev) =>
        prev.map((c) => (c.id === editando.id ? { ...c, name } : c))
      );
    } else {
      setCareers((prev) => [...prev, { id: Date.now(), name }]);
    }
    setName("");
    setEditando(null);
  };

  const handleEditar = (career) => {
    setEditando(career);
    setName(career.name);
    new bootstrap.Modal("#uploadDocumentModal").show();
  };
  
  const handleEliminar = (id) => {
    if (window.confirm("¿Eliminar carrera?"))
      setCareers((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Carreras</h2>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#uploadDocumentModal"
          onClick={() => {
            setEditando(null);
            setName("");
          }}
        >
          Nueva Carrera
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {careers.map((c, i) => (
            <tr key={c.id}>
              <td>{i + 1}</td>
              <td>{c.name}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditar(c)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleEliminar(c.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tu modal */}
      <ModalForm
        title={editando ? "Editar Carrera" : "Nueva Carrera"}
        handleSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Ingeniería Civil"
          />
        </div>
      </ModalForm>
    </div>
  );
}


export default CareersLayout;
