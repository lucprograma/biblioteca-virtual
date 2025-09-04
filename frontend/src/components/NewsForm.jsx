import React, { useState } from "react"

const NewsForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mensaje, setMensaje] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setMensaje("Por favor completá todos los campos.")
      return
    }

    // Simular creación de noticia en frontend
    const nuevaNoticia = {
      news_id: Date.now(), // ID ficticio
      title,
      content,
      published_at: new Date().toISOString()
    }

    // Mostrar mensaje de éxito
    setMensaje("✅ Noticia publicada con éxito.")

    // Enviar al componente padre (NewsManager)
    onSuccess(nuevaNoticia)

    // Limpiar formulario
    setTitle("")
    setContent("")

    // Ocultar mensaje después de unos segundos
    setTimeout(() => setMensaje(""), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-light p-4 rounded-4 shadow mb-4">
      <h3 className="text-center mb-3">Publicar noticia</h3>

      {mensaje && (
        <div className="alert alert-info text-center" role="alert">
          {mensaje}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contenido</label>
        <textarea
          className="form-control"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="text-end">
        <button type="submit" className="btn btn-primary">
          Publicar
        </button>
      </div>
    </form>
  )
}

export default NewsForm