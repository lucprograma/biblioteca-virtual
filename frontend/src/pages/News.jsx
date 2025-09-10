import React, { useEffect, useState } from "react"

const News = () => {
  const [newsList, setNewsList] = useState([])

  // espero q ande 
  const cargarNoticias = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/news/") // 
      const data = await response.json()
      setNewsList(data)
    } catch (error) {
      console.error("Error al obtener noticias:", error)
      setNewsList([]) // limpiar si hay error
    }
  }

  useEffect(() => {
    cargarNoticias()

    
    const handleStorageChange = () => cargarNoticias()
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
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
        {newsList.length === 0 ? (
          <p className="text-center text-white">No hay noticias disponibles</p>
        ) : (
          newsList.map((noticia) => (
            <div key={noticia.news_id} className="row justify-content-center pt-3 pb-3">
              <div className="col-md-8">
                <div className="bg-white rounded-4 shadow p-4 text-center">
                  <h2 className="mb-3">{noticia.title}</h2>
                  <hr className="my-3" />
                  
                  {/* si pusieron imafen */}
                  {noticia.image && (
                    <img
                      src={`http://localhost:3000/${noticia.image}`}
                      alt={noticia.title}
                      className="img-fluid rounded mb-3"
                      style={{ maxHeight: "300px", objectFit: "cover" }}
                    />
                  )}

                  <p className="mb-0">{noticia.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default News
