import React, { useEffect, useState } from "react";

const News = () => {
  const [newsList, setNewsList] = useState([]);

  const API_URL = `${import.meta.env.VITE_API_URL}/api/news`;

  const cargarNoticias = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNewsList(data);
    } catch (error) {
      console.error("Error al obtener noticias:", error);
      setNewsList([]);
    }
  };

  useEffect(() => {
    cargarNoticias();
  }, []);

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/thumb-1920-1042582.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        paddingTop: "40px",
        paddingBottom: "40px"
      }}
    >
      <div className="container-lg">
        {newsList.map((noticia) => (
          <div key={noticia.news_id} className="row justify-content-center pt-3 pb-3">
            <div className="col-md-8">
              <div className="bg-white rounded-4 shadow p-4 text-center">
                <h2 className="mb-3">{noticia.title}</h2>
                <hr className="my-3" />
                
                {noticia.image && (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${noticia.image}`}
                    alt={noticia.title}
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "250px", objectFit: "cover" }}
                  />
                )}

                <p className="mb-0">{noticia.content}</p>
                <p className="text-end text-muted">
                  Publicado: {new Date(noticia.published_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
