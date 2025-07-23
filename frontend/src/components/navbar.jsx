import React from "react";

const Navbar = () => {

  return (
<div id="navbar-container" className="w-100 p-0 m-0">
      <nav className="navbar navbar-expand-lg w-100 custom-navbar">
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
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                id="searchInput"
                type="hidden"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-success"
                id="searchButton"
                type="submit"
                hidden
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;