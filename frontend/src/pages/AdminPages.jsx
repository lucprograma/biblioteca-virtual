// src/pages/AdminPage.jsx
import React from "react";
import { useNavigate } from "react-router";
import "../styles/admin-quartz.css";

const ESCUDO_SRC = "/logo-instituto-2.png"; 

export default function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/tokenchk`, {
          method: "POST",
          credentials: "include",
        });
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        if (data?.role === "admin") setIsAdmin(true);
        else navigate("/");
      } catch (_) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="admin-quartz">
        <div className="container py-4 text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="admin-quartz">
      <div className="container admin-tight">
        <h1 className="h5 fw-bold mb-2">Panel de administración</h1>
        <p className="mb-3 text-white-50">Elegí una opción:</p>

        <div className="card p-3 admin-card-soft">
          <div className="d-flex flex-column flex-md-row align-items-start">
            {/* Opciones (izquierda) */}

            <div className="admin-actions d-flex flex-column gap-2 me-md-3">
              <a href="/documentos" className="btn btn-soft btn-sm">
                Gestionar documentos
              </a>
              <a href="/gestor-noticias" className="btn btn-soft btn-sm">
                Gestionar noticias
              </a>
              <a href="/gestionar-carreras" className="btn btn-soft btn-sm">
                Gestionar carreras
              </a>
              <a href="/tags" className="btn btn-soft btn-sm">
                Gestionar etiquetas
              </a>
              <a href="/activation" className="btn btn-soft btn-sm">
                Lista de usuarios inactivos
              </a>
              
            </div>

            {/* Escudo (derecha) */}
            <div className="ms-md-auto mt-3 mt-md-0 admin-escudo-wrap">
              <img
                src={ESCUDO_SRC}
                alt="Escudo del instituto"
                className="admin-escudo-img img-fluid"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <br></br>
      </div>
    </div>
  );
}
