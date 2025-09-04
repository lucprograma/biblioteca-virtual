import React from "react";

const StateMessage = ({message}) => (
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
      {message}
    </div>
  </div>
);

export default StateMessage;