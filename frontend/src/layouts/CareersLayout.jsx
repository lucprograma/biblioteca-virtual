import React, { useEffect, useState } from "react";
import ModalForm from "../components/ModalForm";
import { Col, Row, Card } from "react-bootstrap";
import { BookHalf } from "react-bootstrap-icons";

function CareersLayout() {
  const [careers, setCareers] = useState([]);
  const [name, setName] = useState("");
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
        ? `${import.meta.env.VITE_API_URL}/api/careers/${editando.id_course}`
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
      return data;
    } catch (error) {
      console.error("Error fetching careers:", error);
      throw new Error("Error fetching careers");
    }}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try{
      await fetchCareers();
      if (editando) {
        setCareers((prev) =>
          prev.map((c) => (c.id === editando.id ? { ...c, name } : c))
        );
      } else {
        setCareers((prev) => [...prev, { id: Date.now(), name }]);
      }
      setName("");
      setEditando(null);
    }
    catch(error){
      setError("Error al guardar la carrera");
      setTimeout(() => setError(null), 3000);  
    }
    finally{
      setLoading(false);
    }
  };

  const handleEditar = (career) => {
    setEditando(career);
    setName(career.name);
    new bootstrap.Modal("#uploadDocumentModal").show();
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
          <Row className="justify-content-md-center">
            {careers.map((c, i) => (
              //card de carrera
              <Col key={c.id} xs={12} md={4} lg={3} className="mb-4 me-3">
                <div className=""></div>
                <Card style={{ width: '18rem',
                  backgroundColor: '#74b835ff',
                  color: 'white'
                 }}>
                  <div className="d-flex justify-content-center p-4">
                    <BookHalf size={64} />
                  </div>
                <Card.Body>
                <hr />
                  <Card.Title>{c.name}</Card.Title>
                  <hr />
                  <button
                    className="btn btn-danger btn-sm me-2 text-white"
                    onClick={() => handleEditar(c)}
                  >
                    Editar
                  </button>
                </Card.Body>
              </Card>
              </Col>
            ))}
          </Row>

      {/* Tu modal */}
      <ModalForm
        title={editando ? "Editar Carrera" : "Nueva Carrera"}
        handleSubmit={handleSubmit}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <div className="spinner-border" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}
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
