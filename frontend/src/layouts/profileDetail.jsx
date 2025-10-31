import { useState, useEffect } from "react";
import { Alert } from "../components/Alert";
import { AlertButton } from "../components/AlertButton";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks/getUser";
function ProfilePanel() {
  const {user} =  useGetUser();
  const [formData, setFormData] = useState({
     name: "",
    email: "",
  });
  const [editing, setEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate();
  
  useEffect(() => {
  if (user) {
    setFormData({
      name: user.name || "",
      email: user.email || "",
    });
  }
}, [user]);

  //   fetchUser();
  // }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSaveUser = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al actualizar perfil");
      return res;
    }
    catch (err) {
      console.log(err);
      throw new Error("Error al actualizar perfil");
    }
  }

  const deactivateUser = async () => {
    try{
      const res = await handleSaveUser({
        is_active: false
      });
      if (!res.ok) throw new Error("Error al actualizar perfil");
     const logoutRes = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      
      if (!res.ok) throw new Error("Error al cerrar sesión");
      navigate("/login")
    }
    catch{
      console.log(err);
    }
  }
  const handleSave = async () => {
    try {
      const res = await handleSaveUser(formData);

      if (!res.ok) throw new Error("Error al actualizar perfil");

      const data = await res.json();
      setEditing(false);
      alert("Perfil actualizado correctamente");
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <>
    {/*Alerta*/}
    <Alert show={showAlert} msg={"¿Estas seguro de querer dar de baja tu cuenta?"}>
              <AlertButton onClick={()=>{
                deactivateUser()
                setShowAlert(false)
              }} label={"Si"}></AlertButton>
              <AlertButton onClick={()=>{setShowAlert(false)}} label={"No"}></AlertButton>
    </Alert>
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

        {/* Botones */}
        {!editing ? (
          <>
          <button
          className="btn btn-primary"
          onClick={() => setEditing(true)}
          >
            Editar
          </button>
          <button
          className="btn btn-danger mt-3"
          onClick={() => { setShowAlert(true)}}
          >
            Dar de baja usuario
          </button></>
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
    </div></>
  );
}

export default ProfilePanel;
