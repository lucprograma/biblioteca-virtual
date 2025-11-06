import { useState, useEffect } from 'react';

const Tags = () => {

    const API_URL = import.meta.env.VITE_API_URL;

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [modTag, setModTag] = useState("");
    const [deleteTag, setDeleteTag] = useState("")
    const [collapse, setCollapse] = useState("");
    const [editFlag, setEditFlag] = useState(true);

    
    const requestToTags = async (method = 'GET', data = null, errorMessage = 'Error en la solicitud.') => {

        try {

            const options = {
                credentials: 'include'
            }

            if (method !== 'GET') {
                options.method = method;
                options.headers = {
                    'Content-Type': 'application/json'
                };
                options.body = JSON.stringify(data);
            } else {
                errorMessage = "Error al obtener los tags.";
            }

            const res = await fetch(`${API_URL}tags`, options);

            if (!res.ok) throw new Error(errorMessage);

            if (method === 'GET') {
                setTags(await res.json())
            } else {
                requestToTags();
                method === 'PATCH' ? setDeleteTag(data.name) : null; //Si actualiza nombre, al cambiar al botón "Eliminar", el nombre aparecerá actualizado.
            }
            
        } catch (err) {
            console.error(`Message: ${err}`);
        }

    }


    const handleSubmit = (data) => requestToTags('POST', data, 'Error al añadir el tag.');
    const handleEdit = (data) => requestToTags('PATCH', data, 'Error al actualizar el tag.');
    const handleDelete = (data) => requestToTags('DELETE', data, 'Error al eliminar el tag.');

    const findTagName = async (id) => {

        try {
            const tagName = tags.filter((tag) => tag.tag_id === Number(id))[0].name;
            setModTag(tagName);
            setDeleteTag(tagName);
        } catch (err) {
            console.error(`Message: ${err.message}`)
        }
    }

    useEffect(() => {
        requestToTags()
    }, []);
    

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: 65,
                paddingBottom: 40
            }}
        >     
        
            <div
                className="row g-4"
                style={{
                    paddingBottom: 40,
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    border: '2px solid',
                    borderColor: 'grey',
                    borderRadius: 20,
                    width: 615
                }}
            >

                <h4 style={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'white',
                    borderBottom: '2px solid gray',
                    paddingBottom: 26
                    }}
                >
                    Gestión de etiquetas
                </h4>             

                <div className="col-auto">                   
                    
                    <form
                        className="d-flex flex-row gap-2"
                        onSubmit={(e) => {

                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const data = Object.fromEntries(formData.entries());
                            
                                if (collapse === 'agregar') {
                                    data.name ? handleSubmit(data) : alert("Ingrese un nombre.")
                                } else if (collapse === 'editar') {
                                    handleEdit(data);
                                } else {
                                    handleDelete(data)
                                }

                            }
                        }
                    >
                        <div className="col-auto">
                            <label htmlFor="selectTag" style={{paddingBottom: 10, fontSize: 18}}>
                                <strong>
                                    Seleccione una etiqueta:
                                </strong>
                            </label>
                            
                            <select
                                className="form-select"
                                multiple
                                style={{width: 300, height: 400}}
                                id="selectTag"
                                name="id"
                                onChange={(e) => {
                                    findTagName(e.target.value);
                                    editFlag === true ? setEditFlag(false) : null
                                }}
                                disabled={collapse === 'agregar'}
                                data-bs-theme="dark"
                            >
                                {
                                    tags.map((tag) => (

                                        <option
                                            key={tag.tag_id}
                                            value={tag.tag_id}
                                            style={{borderBottom: '1px solid gray'}}
                                        >
                                            {tag.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div 
                            className="col-auto d-flex flex-column align-items-start"
                            style={{ paddingLeft: 10}}
                        >

                            <div style={{ paddingTop: 38}}>
                                <button
                                    className={`btn btn-${collapse === 'agregar' ? "primary" : "outline-primary"}`}
                                    type="button"
                                    onClick={() => { setCollapse('agregar')}}
                                    style={{ width: 200 }}
                                >
                                    Agregar
                                </button>                     
                            </div>
                                          
                        
                            <div style={{ paddingTop: 20 }}>
                                <button
                                    className={`btn btn-${collapse === 'editar' ? "warning" : "outline-warning"}`}
                                    type="button"
                                    onClick={() => { setCollapse('editar') }}
                                    style={{ width: 200 }}
                                >
                                    Editar
                                </button>
                            </div>
                        

                            <div style={{ paddingTop: 20 }}>
                                <button
                                    className={`btn btn-${collapse === 'eliminar' ? "danger" : "outline-danger"}`}
                                    type="button"
                                    onClick={() => { setCollapse('eliminar') }}
                                    style={{ width: 200 }}
                                    data-bs-toggle="button"
                                    aria-pressed="true"
                                >
                                    Eliminar
                                </button>
                            </div>
                            
                        

                            { (['agregar', 'editar', 'eliminar'].includes(collapse)) && (

                                <div className="mt-4" style={{width: 200}}>
                                                                                        
                                    <div style={{width:200}}>
                                        <label htmlFor="tagName" style={{paddingBottom: 5}}>
                                            {
                                                collapse === "agregar" ? "Nombre de la etiqueta:" :
                                                (collapse === "editar" ? "Modificar nombre:" :
                                                "Etiqueta seleccionada:")
                                            }
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="tagName"
                                            name="name"
                                            value={
                                                collapse === "agregar" ? newTag :
                                                (collapse === "editar" ? modTag : deleteTag)
                                            }
                                            onChange={(e) => {
                                                    if (collapse === "agregar") setNewTag(e.target.value);
                                                    if (collapse === "editar") setModTag(e.target.value);
                                                }
                                            }
                                            disabled={collapse === 'editar' ? editFlag : collapse === 'eliminar' }
                                        />
                                    </div>
                                    
                                    <div className="d-flex justify-content-between mt-3">
                                        <input
                                            className={
                                                `btn btn-outline-${
                                                    collapse === "agregar" ? "success" :
                                                    (collapse === "editar" ? "warning" : "danger")
                                                }
                                                ${
                                                    collapse === "agregar" ? "bg-success bg-opacity-10" :
                                                    (collapse === "editar" ? "bg-warning bg-opacity-10" : "")
                                                }
                                                `                                
                                            }
                                            type="submit"
                                            value={
                                                    collapse === "agregar" ? "Crear" :
                                                    (collapse === "editar" ? "Actualizar" : "Borrar")
                                            }
                                            disabled={
                                                collapse === 'agregar' ? newTag === "" :
                                                (
                                                    collapse === 'editar' || collapse === 'eliminar' ? editFlag : false
                                                )
                                            }
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-danger g-3 bg-danger bg-opacity-10"
                                            onClick={() => { setCollapse(null) }}
                                        >
                                                Cancelar
                                        </button>
                                    </div>
                                                            
                                </div>

                            )}
                        </div>
                    </form>
                </div>

            </div>
        </div>

    )

}

export default Tags;