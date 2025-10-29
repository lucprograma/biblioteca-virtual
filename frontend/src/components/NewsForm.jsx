import React, { useState, useEffect } from "react"

const NewsForm = ({ onSuccess, editing, initialData }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [file, setFile] = useState(null)
  const [mensaje, setMensaje] = useState("")

  // Si estamos editando, precargar los datos de la noticia
  useEffect(() => {
    if (editing && initialData) {
      setTitle(initialData.title || "")
      setContent(initialData.content || "")
    } else {
      setTitle("")
      setContent("")
      setFile(null)
    }
  }, [editing, initialData])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setMensaje("Por favor completá todos los campos.")
      return
    }

    const noticia = {
      ...initialData,
      title,
      content
    }

    onSuccess(noticia, file) // ← delegamos la lógica a NewsManager

    setMensaje(editing ? "✅ Noticia actualizada con éxito." : "✅ Noticia publicada con éxito.")

    // Limpiar si fue creación (no edición)
    if (!editing) {
      setTitle("")
      setContent("")
      setFile(null)
    }

    setTimeout(() => setMensaje(""), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-light p-4 rounded-4 shadow mb-4">
      <h3 className="text-center mb-3">
        {editing ? "Editar noticia" : "Publicar noticia"}
      </h3>

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

      {/* <div className="mb-3">
        <label className="form-label">Imagen (opcional)</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div> */}

      <div className="text-end">
        <button type="submit" className="btn btn-primary">
          {editing ? "Actualizar" : "Publicar"}
        </button>
      </div>
    </form>
  )
}

export default NewsForm
