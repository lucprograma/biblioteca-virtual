import React from "react";

const Navbar = ({ children }) => {
 
  
  return (
<div id="navbar-container" className="w-100 p-0 m-0">
      <nav id="navBar" className="navbar navbar-expand-lg w-100 custom-navbar">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="/"
          >
            Biblioteca
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/documentos"
                >
                  Documentos
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/noticias"
                >
                  Noticias
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/login"
                >
                  LogIn
                </a>
              </li>
            </ul>
    
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;