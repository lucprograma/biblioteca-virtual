import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useGetUser } from "../hooks/getUser";

export default function UserActivationTable() {

  const [users, setUsers] = useState([]);
  const [checkUsersFlag, setCheckUsersFlag] = useState(true)
  const { user } = useGetUser();
  const [filters, setFilters] = useState({});

  useEffect(()=> {
    const loadUsers = async () => {
      const allUsers = await fetchAll();
      setUsers(allUsers);
      console.log("users loaded", allUsers)
    }
    loadUsers();
  }, [checkUsersFlag]);


  const addFilter = (name, fn) => {
    setFilters((prev) => ({ ...prev, [name]: fn }));
  };

  const removeFilter = (name) => {
    setFilters((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }


  const fetchAll = async () => {
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`,
        {
          credentials: 'include',
          method: 'GET'
        }
      );
      console.log("response", response)
      const users_ers = await response.json();
      if(!users_ers ){
            console.error('Cannot get users');
        }
      console.log('users fetched with sucess', users_ers)
      return users_ers;
    }
    catch(err){
        console.error(`Error fetching users:${err}`)
        return [];
    }
  }
  

  const fetchActivate = async (id, activationFlag) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/lowuser`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
          user_id: id,
        })
      });

      if (!res.ok) throw new Error("Error al actualizar perfil");

      // Actualiza dinámicamente el estado local sin refetch
      setUsers((prev) =>
        prev.map((u) =>
          u.user_id === id ? { ...u, is_active: !u.is_active } : u
        )
      );
      setCheckUsersFlag(!checkUsersFlag);
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
    }
  };


  const handleActivate = (id) => {
      console.log("Activando usuario con ID:", id);
      fetchActivate(id, true)
    };

  const handleDeactivate = (id) => {
    console.log("Desactivando usuario con ID:", id);
    fetchActivate(id, false);
  };


  const renderUsers = (filterListFunctions) => {
    if(!users || users.length === 0 || typeof users[0] === 'undefined'){
      return <tr>No hay usuarios en la lista</tr>
    }
    const visibles = users.filter((u) =>
    Object.values(filters).every((fn) => fn(u))
    ); 
    return (
      visibles.map((user) => (
              <tr key={user.user_id} style={{ borderBottom: "1px solid white" }}>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {
                  user.is_active ?
                    <span className="badge bg-primary">Activo</span> :
                    <span className="badge bg-secondary">Inactivo</span>
                  }
                  </td>
                <td className="text-center">
                  {
                    !user.is_active ?
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleActivate(user.user_id)}
                      >
                        <CheckCircle size={18} className="me-1" />
                        Activar
                      </button> : 
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeactivate(user.user_id)}
                      >
                        <XCircle size={18} className="me-1" />
                        Desactivar
                      </button>
                  }
                </td>
              </tr>
            )));
  }

  return (

    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div style={{ width: "80%" }}>
        {/* Input búsqueda por nombre */}
        <h2 className="text-white mb-4 text-center">Activación de Usuarios</h2>

        <div className="input-group mb-3 w-25">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">@</span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              if (value) {
                addFilter("search", (u) => u.name.toLowerCase().includes(value));
              } else {
                removeFilter("search");
              }
            }}
          />
        </div>

        <div className="mb-2 text-white">
          <label>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  console
                  addFilter("unactive", (u) => u.is_active === false);
                } else {
                  removeFilter("unactive");
                }
              }}
            />{" "}
            Mostrar solo inactivos
        </label>        
      </div>

        <table className="table table-dark table-hover align-middle table-responsive">
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
            {renderUsers(filters)}
          </tbody>
        </table>

      </div>
    </div>
  );
}
