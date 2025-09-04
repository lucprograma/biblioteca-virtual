import {React, useState, useEffect }from "react";

const Navbar = ({ children }) => {
 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/tokenchk", {
          method: "post",
          credentials: "include", // envía la cookie automáticamente
        });

        if (!res.ok) throw new Error("No autorizado");

        const data = await res.json();
        console.log(data)
        setUser(data);
      } catch (err) {
        console.log(err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);
   const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error al cerrar sesión");

      setUser(null); // limpiar estado
      window.location.href = "/login"; // redirigir al login
    } catch (err) {
      console.log(err);
    }
  };
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
            {/* Links principales a la izquierda */}
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/documentos">
              Documentos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/noticias">
              Noticias
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/carnet">
              Carnet
            </a>
          </li>

          {!user && (
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/login">
                LogIn
              </a>
            </li>
          )}

          {user?.role === "admin" && (
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/activation">
                Lista inactivos
              </a>
            </li>
          )}
        </ul>
         {/* Logout a la derecha */}
        {user && (
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="nav-link btn btn-link"
                style={{ cursor: "pointer" }}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
    
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;