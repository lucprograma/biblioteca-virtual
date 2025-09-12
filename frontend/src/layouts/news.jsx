import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StateMessage from "../components/stateMesagge";
import { useGetUser } from "../hooks/getUser";

const News = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const { user } = useGetUser();

  const fetchNews = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/news/");
      const data = await response.json();
      console.log('news:',data);
      setNews(data);
    } catch (error) {
      console.error("Error al obtener noticias:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const renderNews = (newsArray) => {
    if (typeof newsArray[0]?.news_id === "undefined") {
      return <StateMessage message="No hay noticias que mostrar" />;
    }

    return newsArray.map((item) => (
      <div key={item.news_id} className="row justify-content-center pt-3 pb-3">
        <div className="col-md-8">
          <div className="bg-white rounded-4 shadow-lg p-4">
            <h1 className="text-center mb-3">{item.title}</h1>
            <hr className="my-3" />
            <p className="text-center mb-0">{item.content}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "80vh",
        position: "relative",
        backgroundImage: "url('../thumb-1920-1042582.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        className="container-lg justify-content-center"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        {/* para admins */}
        {user?.role === "admin" && (
          <div className="text-center pt-4">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/gestor-noticias")}
            >
              Gestionar noticias
            </button>
          </div>
        )}

        {/* rendes */}
        {news.length > 0 ? (
          renderNews(news)
        ) : (
          <StateMessage message="No se encontraron noticias" />
        )}
      </div>
    </div>
  );
};


export default News;