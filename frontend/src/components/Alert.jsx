// Alert.jsx
import React from "react";

export const Alert = ({ msg, children, show }) => {
  if (!show) return null;

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
      style={{ zIndex: 1055 }} // 👈 aseguramos que quede arriba
    >
      {/* Fondo oscuro */}
      <div 
        className="modal-backdrop fade show" 
        style={{ zIndex: 1050 }} // 👈 detrás de la tarjeta del alert
      ></div>

      {/* Caja del alert */}
      <div 
        className="alert alert-light border shadow-lg position-relative" 
        role="alert" 
        style={{ zIndex: 1056, minWidth: "320px" }} // 👈 por delante de todo
      >
        <p className="mb-3">{msg}</p>
        <div className="d-flex justify-content-end">{children}</div>
      </div>
    </div>
  );
};
