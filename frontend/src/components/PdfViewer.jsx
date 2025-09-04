import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ArrowsFullscreen, X } from "react-bootstrap-icons";

const PdfViewer = ({ show, pdfUrl, onClose }) => {
  const [fullscreen, setFullscreen] = useState(false);

  const handleClose = () => {
    setFullscreen(false); // al cerrar, vuelve al modo normal
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      fullscreen={fullscreen}
    >
      <Modal.Header className="d-flex justify-content-between align-items-center">
        <Modal.Title>Visor de PDF</Modal.Title>
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="light"
            size="sm"
            onClick={() => setFullscreen(!fullscreen)}
          >
            <ArrowsFullscreen />
          </Button>
          <Button variant="light" size="sm" onClick={handleClose}>
            <X />
          </Button>
        </div>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-center">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="Visor PDF"
            width="100%"
            height="600px"
            style={{ border: "none" }}
          ></iframe>
        ) : (
          <p>No se ha seleccionado ningún PDF</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PdfViewer;
