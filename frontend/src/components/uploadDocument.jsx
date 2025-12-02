import React, { useEffect } from "react";
import useTags from '../hooks/tags/useTags.js';

const CreateDocument = () => {
    const [courses, setCourses] = React.useState([]);
    const [years, setYears] = React.useState([]);
    const modalRef = React.useRef(null);
    const { tags } = useTags();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/documents/createDocument`,
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
        }    
    }

  const fetchYears = async (parent_id) => {
    try {
      
      //const response = await fetch(`${import.meta.env.VITE_API_URL}/api/folders/byParent/${parent_id}`);
      //const data = await response.json();
      //alert(parent_id);
      //alert(      courses[parent_id-1].years);
      const yearsNO = courses[parent_id-1].years;
      const _years = [];
      for(let i=0; i<yearsNO; i++){
        _years.push(i+1);
      }

        setYears(_years);
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/careers`);
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
                        <option key={course.id_course} value={course.id_course}>{course.name}</option>
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
                        <option key={year.folder_id} value={year}>{year+"°"}</option>
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
                  {
                    tags.map((tag) => (

                        <option
                            key={tag.tag_id}
                            value={tag.tag_id}
                            style={{borderBottom: '1px solid gray'}}
                        >
                            {tag.name}
                        </option>
                    ))
                }
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