import React from "react";

const DocumentsBar = ({ addCard }) => (
  <div
    className="offcanvas offcanvas-start bg-dark text-white"
    tabIndex={-1}
    id="sidebarMenu"
    aria-labelledby="sidebarMenuLabel"
  >
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="sidebarMenuLabel">
        Estructura de Carpetas
      </h5>
      <button
        type="button"
        className="btn-close btn-close-white"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div className="offcanvas-body">
      <ul className="list-unstyled">
        <li>
          <span
            data-bs-toggle="collapse"
            href="#folder1"
            role="button"
            aria-expanded="false"
            aria-controls="folder1"
            style={{ cursor: "pointer" }}
          >
            📁 Analisis de sistemas
          </span>
          <ul>
            <span
              data-bs-toggle="collapse"
              href="#folder3"
              role="button"
              aria-expanded="false"
              aria-controls="folder3"
              style={{ cursor: "pointer" }}
            >
              📁 Primer año
            </span>
            <ul className="collapse list-unstyled ps-3" id="folder3">
              <li>
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    if (addCard) addCard("./hola.txt");
                  }}
                >
                  📄 Archivo 1.1
                </a>
              </li>
              <li>📄 Archivo 1.2</li>
            </ul>
          </ul>
        </li>
        <li>
          <span
            data-bs-toggle="collapse"
            href="#folder2"
            role="button"
            aria-expanded="false"
            aria-controls="folder2"
            style={{ cursor: "pointer" }}
          >
            📁 Carpeta 2
          </span>
          <ul className="collapse list-unstyled ps-3" id="folder2">
            <li>📄 Archivo 2.1</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
);

export default DocumentsBar;