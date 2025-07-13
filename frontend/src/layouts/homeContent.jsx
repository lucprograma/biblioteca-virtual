import React from "react";

const Home = () => (
  <div
    id="home-container"
    className="container-fluid d-flex align-items-center justify-content-center"
    style={{
      minHeight: "80vh",
      position: "relative",
      backgroundImage: "url('../../public/thumb-1920-1042582.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  >
    <div className="row w-100">
      <div
        className="col-md-12 text-center text-white"
        style={{
          background: "rgba(44, 44, 44, 0.6)",
          padding: "2rem",
          borderRadius: "1rem",
        }}
      >
        <h1>Bienvenido a la pagina principal</h1>
        <p>Somos la libreria del instituto 2!!</p>
      </div>
    </div>
  </div>
);

export default Home;