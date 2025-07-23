import React from "react";
const DisplayButton = () => (<div
        id="floating-buttons"
        className="position-relative"
        style={{
          zIndex: 1045,
          marginTop: "1rem",
          marginLeft: "1rem",
          display: "block",
        }}
      >
        <button
          id="navigationButton"
          className="btn btn-secondary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
        >
          ☰
        </button>
      </div>)

export default DisplayButton;