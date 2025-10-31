import React, { useEffect, useState } from "react";
import PdfViewer from "../components/PdfViewer";

const openPdfOverlay = (pdfPath) => {
  // Aquí puedes implementar la lógica para abrir el PDF en un overlay/modal
  alert(`Abrir PDF: ${pdfPath}`);
};

const Documents = ({folder_id}) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [show, setShow] = useState(false);

  const openPdf = (url) => {
    setPdfUrl(url);
    setShow(true);
  };
  const [documents, setDocuments] = useState([]);
  const fetchDocuments = async () => {
    try{
      if (!folder_id) {
          console.log('folder id is null');
          return [];
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}documents/findByFolder/${folder_id}`);
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
  link.href = `${import.meta.env.VITE_API_URL}/download/${content}`;
  link.click();
};
//verificamos que la respuesta contenga documentos
  const checkProperties = (doc) => {
  if(!doc) return false // Si el documento no existe se retorna falso

  const importantProperties = ['title', 'content', 'document_id'];
  return importantProperties.every(
    (property) => typeof doc[property] !== 'undefined' && doc[property]
  );
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
              <iframe src={`${import.meta.env.VITE_API_URL}/uploads/${document.content}`} width="100%" height="300px" title="Document 1"></iframe>
            </div>
            <div className="card-footer d-flex justify-content-center">
              <button
                className="btn btn-danger btn-sm px-4 py-2"
                onClick={() => openPdf(`${import.meta.env.VITE_API_URL}/uploads/${document.content}`)}
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
      <PdfViewer show={show} pdfUrl={pdfUrl} onClose={() => setShow(false)} />
      <div id="cards-container" className="container-md mt-4">
      <div className="row" id="cards-row">
    {documents.length === 0 || !checkProperties(documents[0]) ? (
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