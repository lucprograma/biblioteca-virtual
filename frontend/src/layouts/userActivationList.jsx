import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

export default function UserActivationTable() {
  const [users, setUsers] = useState([]);
  const fetchUnactive = async () => {
    try{
        const respose = await fetch("http://localhost:3000/api/auth/unactive");
        const users = await respose.json();
        if(!users ){
            console.error('Cannot get users');
        }
        console.log('users fetched with sucess', users)
        return users;
    }
    catch(err){
        console.error(`Error fetching users:${err}`)
        return [];
    }
  };
  const handleActivate = (id) => {
    console.log("Activando usuario con ID:", id);
    // Aquí iría la lógica para el fetch hacia tu backend
  };

  const handleDeactivate = (id) => {
    console.log("Desactivando usuario con ID:", id);
    // Aquí iría la lógica para el fetch hacia tu backend
  };
  const renderUsers = () => {
    if(!users || typeof users[0] === 'undefined'){
      return <tr><p>No hay usuarios en la lista</p></tr>
    }
    return (
      users.map((user) => (
              <tr key={user.user_id} style={{ borderBottom: "1px solid white" }}>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge bg-secondary">{user.is_active ? "Activo" : "Inactivo"}</span>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => handleActivate(user.user_id)}
                  >
                    <CheckCircle size={18} className="me-1" />
                    Activar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeactivate(user.user_id)}
                  >
                    <XCircle size={18} className="me-1" />
                    Rechazar
                  </button>
                </td>
              </tr>
            )));
  }
  useEffect(()=> {
    fetchUnactive().then((result) => {
      setUsers(result)
      console.log(result)
    })
  }, [])
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div style={{ width: "80%" }}>
        <h2 className="text-white mb-4 text-center">Activación de Usuarios</h2>
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr style={{ borderBottom: "2px solid white" }}>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
              {
              
                users.length > 0 ? (
                  renderUsers()
                ) : (<tr>
                <td colSpan="5" className="text-center text-muted">
                  No hay usuarios inactivos
                </td>
              </tr>)
              }
          </tbody>
        </table>
      </div>
    </div>
  );
}
