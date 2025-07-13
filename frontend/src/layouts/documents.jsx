import React from "react";

const openPdfOverlay = (pdfPath) => {
  // Aquí puedes implementar la lógica para abrir el PDF en un overlay/modal
  alert(`Abrir PDF: ${pdfPath}`);
};

const Documents = () => (
  <div id="cards-container" className="container-md mt-4">
    <div className="row" id="cards-row">
      <div className="col-md-4 mb-4">
        <div className="card">
          <div className="card-header">Document Title 1</div>
          <div className="card-body">
            <iframe src="./dummy.pdf" width="100%" height="300px" title="Document 1"></iframe>
          </div>
          <div className="card-footer d-flex justify-content-center">
            <button
              className="btn btn-danger btn-sm px-4 py-2"
              onClick={() => openPdfOverlay("./dummy.pdf")}
            >
              Open
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card">
          <div className="card-header">Document Title 2</div>
          <div className="card-body">
            <iframe src="./dummy.pdf" width="100%" height="300px" title="Document 2"></iframe>
          </div>
          <div className="card-footer d-flex justify-content-center">
            <button
              className="btn btn-danger btn-sm px-4 py-2"
              onClick={() => openPdfOverlay("./dummy.pdf")}
            >
              Open
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card">
          <div className="card-header">Document Title 3</div>
          <div className="card-body">
            <iframe src="./dummy.pdf" width="100%" height="300px" title="Document 3"></iframe>
          </div>
          <div className="card-footer d-flex justify-content-center">
            <button
              className="btn btn-danger btn-sm px-4 py-2"
              onClick={() => openPdfOverlay("./dummy.pdf")}
            >
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Documents;