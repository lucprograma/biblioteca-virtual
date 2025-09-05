import React from "react";

export const AlertButton = ({ label, onClick, variant = "primary" }) => {
  return (
    <button 
      className={`btn btn-${variant} mx-1`} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};
