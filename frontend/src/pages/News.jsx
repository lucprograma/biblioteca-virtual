import React, { useEffect, useState } from "react"

const News = () => {
  const [newsList, setNewsList] = useState([])

  // Función para cargar noticias desde localStorage
  const cargarNoticias = () => {
    const guardadas = localStorage.getItem("noticias")
    const desdeLocal = guardadas ? JSON.parse(guardadas) : []
    setNewsList(desdeLocal)
  }

  useEffect(() => {
    cargarNoticias()

    // Escuchar cambios en localStorage (por si se actualiza desde otro componente)
    window.addEventListener("storage", cargarNoticias)

    return () => {
      window.removeEventListener("storage", cargarNoticias)
    }
  }, [])

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
              <div className="bg-white rounded-4 shadow p-4">
                <h2 className="text-center mb-3">{noticia.title}</h2>
                <hr className="my-3" />
                <p className="text-center mb-0">{noticia.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default News