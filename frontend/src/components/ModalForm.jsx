import React from 'react';

const ModalForm = ({ handleSubmit, title, children }) => {

  return (

    <div
      className="modal fade"
      id="uploadDocumentModal"
      tabIndex="-1"
      aria-labelledby="uploadDocumentModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ borderRadius: "12px", overflow: "hidden" }}>
          
          {/* Header */}
          <div className="modal-header" style={{ backgroundColor: "#6f42c1" }}>
            <h5 className="modal-title text-white" id="uploadDocumentModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Cuerpo */}
          <div className="modal-body bg-dark text-white">
            <form id="uploadDocumentForm" onSubmit={handleSubmit}>
              {children}
            </form>
          </div>

          {/* Footer */}
          <div className="modal-footer bg-dark">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button
              type="submit"
              form="uploadDocumentForm"
              className="btn"
              style={{ backgroundColor: "#c0392b", color: "white" }}
            >
              Aceptar
            </button>
          </div>

        </div>
      </div>
    </div>
    
  );
};

export default ModalForm;