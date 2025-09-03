import { useState, useEffect } from "react";

function ProfilePanel() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Obtener info del usuario
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/tokenchk", {
          method: "post",
          credentials: "include", // envía la cookie automáticamente
        });
        if (!res.ok) throw new Error("No autorizado");
        const data = await res.json();
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al actualizar perfil");

      const data = await res.json();
      setUser(data);
      setEditing(false);
      alert("Perfil actualizado correctamente");
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="container mt-4 mb-3">
      <div
        className="card p-4"
        style={{ backgroundColor: "white", borderRadius: "0.5rem" }}
      >
        <h2 className="mb-4">Perfil</h2>

        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>

        {/* Teléfono */}
        {/* <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editing}
          />
        </div> */}

        {/* Botones */}
        {!editing ? (
          <button
            className="btn btn-primary"
            onClick={() => setEditing(true)}
          >
            Editar
          </button>
        ) : (
          <>
            <button className="btn btn-success me-2" onClick={handleSave}>
              Guardar
            </button>
            <button
              className="btn btn-danger mt-3"
              onClick={() => setEditing(false)}
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePanel;
