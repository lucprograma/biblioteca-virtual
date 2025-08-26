import React from "react";
import DisplayButton from "../components/displayButton";
import DocumentsBar from "../components/documentsBar";

const DocumentBarLayout = ({ folderState }) => (
  <div>
    <div className="d-flex align-items-center gap-2 mb-3">
      <DisplayButton
        text="☰"
        className="btn btn-secondary position-relative"
        style={{
          zIndex: 1045,
          marginTop: "1rem",
          marginLeft: "1rem",
          display: "block",
        }}
        id="navigationButton"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
      />
      <DisplayButton
        icon=""
        text="Añadir documento"
        className="btn btn-primary"
        type="button"
        id="addDocumentButton"
        data-bs-toggle="modal"
        data-bs-target="#uploadDocumentModal"
        style={{ zIndex: 1045,
          marginTop: "1rem",
          marginLeft: "1rem",
          display: "block", }}
      />
    </div>
    <DocumentsBar folderState={folderState} />
  </div>
);

export default DocumentBarLayout;