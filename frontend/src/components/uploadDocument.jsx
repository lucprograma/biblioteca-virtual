import React, { useEffect } from "react";

const CreateDocument = () => {
    const [courses, setCourses] = React.useState([]);
    const [years, setYears] = React.useState([]);
    const modalRef = React.useRef(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}documents/createDocument`,
                {
                    method: 'POST',
                    body: formData,
                    credentials: "include"
        }
    );
        const data = response;
        alert('Documento creado exitosamente!!:', data);
         }
        catch(error){
            console.error("Error uploading document:", error);
        }
if (modalRef.current) {
        const modal = window.bootstrap.Modal.getOrCreateInstance(modalRef.current);
        modal.hide();
      }    }
  const fetchYears = async (parent_id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}folders/byParent/${parent_id}`);
      const data = await response.json();
      setYears(data);
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  }
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}folders/parentsFolders`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, []);
  return (
    // Modal
    <div className="modal fade" ref={modalRef} id="uploadDocumentModal" tabIndex="-1" aria-labelledby="uploadDocumentModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: "12px", overflow: "hidden" }}>
          
          {/* Header morado */}
          <div className="modal-header" style={{ backgroundColor: "#6f42c1" }}>
            <h5 className="modal-title text-white" id="uploadDocumentModalLabel">Nuevo documento</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>

          {/* Cuerpo del formulario */}
          <div className="modal-body bg-dark text-white">
            <form id="uploadDocumentForm" onSubmit={handleSubmit}>
              {/* Select de Carrera */}
              <div className="mb-3">
                <label htmlFor="careerSelect" className="form-label">Titulo</label> <br />
                <input type="text" className="form-text" name="title" />
              </div>

              <div className="mb-3">
                <label htmlFor="careerSelect" className="form-label">Carrera</label>
                <select className="form-select" onChange={e => fetchYears(e.target.value)} name="career" id="careerSelect" required>
                  <option value="" disabled selected>Selecciona una carrera</option>
                  {
                    courses.map((course) => (
                        <option key={course.folder_id} value={course.folder_id}>{course.name}</option>
                      ))
                  }
                  {/* <option value="1">Analisis de Sistemas</option>*/}
                </select>
              </div>

              {/* Select de Año */}
              <div className="mb-3">
                <label htmlFor="yearSelect" className="form-label">Año</label>
                <select className="form-select" id="yearSelect" name="folder_id" required>
                  <option value="" disabled selected>Selecciona un año</option>
                  {
                    years.map((year) => (
                        <option key={year.folder_id} value={year.folder_id}>{year.year_level}</option>
                      ))
                  }
                  {/* <option value="1">1° Año</option>*/}
                </select>
              </div>

              {/* Input de Archivo */}
              <div className="mb-3">
                <label htmlFor="fileInput" className="form-label">Selecciona un archivo</label>
                <input className="form-control" type="file" id="fileInput" name="file" required />
              </div>

              {/* Select de Tags */}
              <div className="mb-3">
                <label htmlFor="tagSelect" className="form-label">Tags</label>
                <select multiple className="form-select" id="tagSelect" required>
                  <option value="apuntes">Apuntes</option>
                  <option value="parcial">Parcial</option>
                  <option value="resumen">Resumen</option>
                  <option value="guia">Guía</option>
                </select>
                <div className="form-text text-light">Mantén presionado Ctrl (o Cmd en Mac) para seleccionar múltiples tags.</div>
              </div>
            </form>
          </div>

          {/* Footer con botón de subir */}
          <div className="modal-footer bg-dark">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" form="uploadDocumentForm" className="btn" style={{ backgroundColor: "#c0392b", color: "white" }}>Subir documento</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDocument;