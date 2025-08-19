import React from "react";

const DisplayButton = ({
  icon = "☰",
  text = "",
  className = "position-relative",
  style = {
    zIndex: 1045,
    marginTop: "1rem",
    marginLeft: "1rem",
    display: "block",
  },
  ...props
}) => (
  <div id="floating-buttons" className="position-relative" style={style}>
    <button
      id="navigationButton"
      className={className}
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      {...props}
    >
      {text}
    </button>
  </div>
);

export default DisplayButton;