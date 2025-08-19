import React, { useEffect, useState } from "react";

const openPdfOverlay = (pdfPath) => {
  // Aquí puedes implementar la lógica para abrir el PDF en un overlay/modal
  alert(`Abrir PDF: ${pdfPath}`);
};

const Documents = ({folder_id}) => {

  const [documents, setDocuments] = useState([]);
  const fetchDocuments = async () => {
    try{
      if (!folder_id) {
          console.log('folder id is null');
          return [];
        }
        const response = await fetch(`http://localhost:3000/api/documents/findByFolder/${folder_id}`);
        const docs = response.json();
        return docs;
    }
    catch (error) {
        console.error("error fetching documents",error);
        return [];
      }
  }
  const handleDownload = (content) => {
  const link = document.createElement('a');
  link.href = `http://localhost:3000/download/${content}`;
  link.click();
};

  useEffect(() => {
      fetchDocuments().then(setDocuments);
  }, [folder_id]);
  const renderCards = (documents) => {
    console.table(documents)
    return(
      documents.map(
        document => (
            
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header">{document.title}</div>
            <div className="card-body">
              <iframe src={`http://localhost:3000/uploads/${document.content}`} width="100%" height="300px" title="Document 1"></iframe>
            </div>
            <div className="card-footer d-flex justify-content-center">
              <button
                className="btn btn-danger btn-sm px-4 py-2"
                onClick={() => openPdfOverlay("./dummy.pdf")}
              >
                Open
              </button>
              <button className="btn btn-primary btn-sm px-4 py-2" onClick={() => {handleDownload(document.content)}}>
                Download
              </button>
            </div>
          </div>
        </div>
        )
      )
    )
  }
  return(
  <>
  <main>
    <div id="cards-container" className="container-md mt-4">
      <div className="row" id="cards-row">
    {documents.length === 0 ? (
  <div className="col-12 d-flex justify-content-center pb-5 pt-5">
    <div
      style={{
        width: '100%',
        backgroundColor: '#f0f0f0ff', // gris claro
        borderRadius: '12px',       // bordes redondeados
        padding: '2rem',
        textAlign: 'center'
      }}
    >
      Busque los documentos que desee en el menú lateral izquierdo.
    </div>
  </div>
) : (
  renderCards(documents)
)}

            </div>
    </div>
    </main>
  </>
);}
export default Documents;