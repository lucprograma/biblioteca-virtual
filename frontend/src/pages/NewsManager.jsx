import { useState, useEffect } from "react"
import { data, useNavigate } from "react-router-dom"
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
      getNews();
    }
  }, [])
  const getNews = async () => {
    fetch("http://localhost:3000/api/news/").then(res => 
      res.json()
    , err => {throw new Error(`Error appened getting news: ${err}`)}).then(data => setNoticias(data)).catch(err => {throw new Error(`Error appened getting news: ${err}`)})
  }
  const createNew = async(noticia) => {
    try{
      const nueva = {
        ...noticia,
        news_id: Date.now(),
        published_at: new Date().toISOString()
      }
      const response = fetch('http://localhost:3000/api/news/',
        {
          method: 'POST',
          headers: {
    "Content-Type": "application/json"
  },
          credentials: 'include',
          body: JSON.stringify(nueva)
        }
      ).then((res) => res, (err) => {throw new Error(`error fetching news:${err}`)}).catch(err => {throw new Error(`error fetching news:${err}`)})
    }
    catch(e){
      throw new Error(`error fetching news:${e}`)
    }
  }

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
      createNew(noticia);
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
    // setTimeout(() => {
    //   setMensaje("")
    //   navigate("/noticias") // No pasamos state, porque ya está guardado
    // }, 1500)
  }
  const deleteNew = async (id) => {
    fetch("http://localhost:3000/api/news/delete", {
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        news_id: id
      }),
      method: "DELETE"
    }).then(res => res.json()).then(data => data).catch(
      err => {
        throw new Error(`Error deleting new: ${err}`)
      }
    )
  }
  // Eliminar noticia
  const handleDelete = async (id) => {
    if(deleteNew(id)){
    const filtradas = noticias.filter(n => n.news_id !== id)
    setNoticias(filtradas)}
    return false
    // localStorage.setItem("noticias", JSON.stringify(filtradas))
    
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

      {noticias.length > 0 && noticias.map(noticia => (
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