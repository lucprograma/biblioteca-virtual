import { useState } from "react";

function ProfileCard({ user, handleLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown" style={{ borderRadius: "0.5rem", border: "1px solid black" }}>
      {/* Botón de perfil */}
      <button
        className="btn d-flex flex-column align-items-center"
        style={{
          backgroundColor: "#6c3483",
          color: "white",
          borderRadius: "0.5rem",
          padding: "0.25rem 0.5rem",
          minWidth: "120px",
        }}
        onClick={() => setOpen(!open)}
      >
        {/* Nombre del usuario */}
        <div style={{ fontWeight: "bold", fontSize: "0.9rem", width: "100%", textAlign: "center" }}>
          {user.name}
        </div>

        {/* Línea horizontal negra */}
        <div
          style={{
            width: "90%",
            height: "1px",
            backgroundColor: "black",
            margin: "0.25rem 0",
          }}
        />

        {/* Botón con flecha */}
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <span style={{ color: "white", fontSize: "1.2rem" }}>▼</span>
        </div>
      </button>

      {/* Menu desplegable */}
      {open && (
        <ul
          className="dropdown-menu show"
          style={{
            position: "absolute",
            backgroundColor: "#fff",
            border: "1px solid black",
            borderRadius: "0.5rem",
            marginTop: "0.25rem",
            right: 0,
            minWidth: "150px",
            zIndex: 1000,
          }}
        >
          <li>
            <button
              className="dropdown-item"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </button>
          </li>
          <li>
            <a className="dropdown-item" href="/profile">
              Profile
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/carnet">
              Carnet
            </a>
          </li>
          {/* <li>
            <a className="dropdown-item" href="/settings">
              Settings
            </a>
          </li> */}
        </ul>
      )}
    </div>
  );
}

export default ProfileCard;
