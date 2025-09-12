import {React, useState, useEffect }from "react";

import ProfileCard from "./profileCard";
//import DropButtonNavbar from "../layouts/drop-button-navbar";
import { useNavigate } from "react-router";


const Navbar = ({ children }) => {
 
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

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
      navigate("/login")

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

             {/* {user && (
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/carnet">
                Carnet
              </a>
            </li>
          )} */}
          
          {!user && (
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/login">
                LogIn
              </a>
            </li>
          )}

          {user?.role === "admin" && (
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/admin">
                Administracion
              </a>
            </li>
          )}
           </ul>

       {/*{user?.role === 'admin' && <DropButtonNavbar />}         
          {user?.role === "admin" && (
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/activation">
                Lista inactivos
              </a>
            </li>
          )}
          
        
          */}

         {/* Logout a la derecha */}
        {user && (
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">          
            <ProfileCard user={user} handleLogout={handleLogout}/>

          </ul>
        )}
    
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;