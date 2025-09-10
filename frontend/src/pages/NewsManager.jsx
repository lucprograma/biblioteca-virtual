import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NewsForm from "../components/NewsForm"

export default function NewsManager() {
  const [noticias, setNoticias] = useState([])
  const [noticiaEditando, setNoticiaEditando] = useState(null)
  const [mensaje, setMensaje] = useState("")
  const navigate = useNavigate()

  // Cargar desde localStorage
  useEffect(() => {
    const guardadas = localStorage.getItem("noticias")
    if (guardadas) {
      setNoticias(JSON.parse(guardadas))
    }
  }, [])

  // Crear o editar noticia
  const handleSubmit = (noticia) => {
    let actualizadas

    if (noticiaEditando) {
      const editada = { ...noticiaEditando, ...noticia }
      actualizadas = noticias.map(n =>
        n.news_id === noticiaEditando.news_id ? editada : n
      )
      setMensaje("✅ Noticia actualizada con éxito.")
      setNoticiaEditando(null)
    } else {
      const nueva = {
        ...noticia,
        news_id: Date.now(),
        published_at: new Date().toISOString()
      }
      actualizadas = [nueva, ...noticias]
      setMensaje("✅ Noticia publicada con éxito.")
    }

    setNoticias(actualizadas)
    localStorage.setItem("noticias", JSON.stringify(actualizadas))

    // Redirigir después de mostrar el mensaje
    setTimeout(() => {
      setMensaje("")
      navigate("/noticias") // No pasamos state, porque ya está guardado
    }, 1500)
  }

  // Eliminar noticia
  const handleDelete = (id) => {
    const filtradas = noticias.filter(n => n.news_id !== id)
    setNoticias(filtradas)
    localStorage.setItem("noticias", JSON.stringify(filtradas))
  }

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

      {noticias.map(noticia => (
        <div key={noticia.news_id} className="row justify-content-center mb-4">
          <div className="col-md-8">
            <div className="bg-white rounded-4 shadow p-4">
              <h2 className="text-center">{noticia.title}</h2>
              <hr />
              <p className="text-center">{noticia.content}</p>
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
  )
}