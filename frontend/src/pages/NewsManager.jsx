import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewsForm from "../components/NewsForm";

export default function NewsManager() {
  const [noticias, setNoticias] = useState([]);
  const [noticiaEditando, setNoticiaEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const API_URL = `${import.meta.env.VITE_API_URL}/api/news`;

  const cargarNoticias = async () => {
    try {
      const response = await fetch(API_URL, {
          credentials: 'include',
          method: 'GET'
        });
      const data = await response.json();
      setNoticias(data);
    } catch (error) {
      console.error("Error al obtener noticias:", error);
      setNoticias([]);
    }
  };

  useEffect(() => {
    cargarNoticias();
  }, []);

  // Crear o editar noticia
  const handleSubmit = async (noticia, file) => {
    try {
      const formData = new FormData();
      formData.append("title", noticia.title);
      formData.append("content", noticia.content);
      if (file) formData.append("image", file);

      let response;

      if (noticiaEditando) {
        formData.append("news_id", noticiaEditando.news_id);
        response = await fetch(`${API_URL}/update`, {
          method: "PATCH",
          body: formData,
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setMensaje(" Noticia actualizada con éxito.");
      } else {
        response = await fetch(`${API_URL}/`, {
          method: "POST",
          credentials: 'include',
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setMensaje(" Noticia publicada con éxito.");
      }

      await response.json();
      setNoticiaEditando(null);
      cargarNoticias();

      setTimeout(() => {
        setMensaje("");
        navigate("/noticias");
      }, 1500);
    } catch (error) {
      console.error("Error al guardar noticia:", error);
      setMensaje(" Error al guardar la noticia.");
    }
  };

  // Eliminar noticia
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/delete`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ news_id: id })
      });
      setNoticias(noticias.filter((n) => n.news_id !== id));
    } catch (error) {
      console.error("Error al eliminar noticia:", error);
    }
  };

  return (
    <div className="container py-5">
      <NewsForm
        onSuccess={handleSubmit}
        editing={!!noticiaEditando}
        initialData={noticiaEditando}
      />

      {mensaje && (
        <div className="alert alert-success text-center my-3" role="alert">
          {mensaje}
        </div>
      )}

      {noticias.map((noticia) => (
        <div key={noticia.news_id} className="row justify-content-center mb-4">
          <div className="col-md-8">
            <div className="bg-white rounded-4 shadow p-4 text-center">
              <h2>{noticia.title}</h2>
              <hr />
              {noticia.image && (
                <img
                  src={`${import.meta.env.VITE_API_URL}/${noticia.image}`}
                  alt={noticia.title}
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: "250px", objectFit: "cover" }}
                />
              )}
              <p>{noticia.content}</p>
              <p className="text-end text-muted">
                Publicado: {new Date(noticia.published_at).toLocaleDateString()}
              </p>
              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setNoticiaEditando(noticia)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(noticia.news_id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
