import { useState, useEffect } from 'react';

const Tags = () => {

    const API_URL = import.meta.env.VITE_API_URL;

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [modTag, setModTag] = useState(null);
    const [deleteTag, setDeleteTag] = useState(null)
    const [collapse, setCollapse] = useState(false);

    
    const requestTag = async (method, data, errorMessage) => {

        try {
            const res = await fetch(`${API_URL}tags`,
                {
                    method: method,
                    credentials: 'include',
                    body: data
                }
            );

            if (!res.ok) throw new Error(errorMessage);

            setTags(await res.json())
        } catch (err) {
            console.error(`Message: ${err}`);
        }

    }


    const fetchTags = async () => {

        try {
            const res = await fetch(`${API_URL}tags`,
                {
                    credentials: 'include'
                }
            );

            if (!res.ok) throw new Error('Error al obtener los tags.');

            setTags(await res.json())
        } catch (err) {
            console.error(`Message: ${err}`);
        }
    }



    const handleSubmit = (data) => requestTag('POST', data, 'Error al añadir el tag.');
    const handleEdit = (data) => requestTag('PUT', data, 'Error al actualizar el tag.');
    const handleDelete = (data) => requestTag('DELETE', data, 'Error al eliminar el tag.');
    


    useEffect(() => {
        fetchTags()
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
                    <label for="selectTag" style={{paddingBottom: 10, fontSize: 18}}>
                        <strong>
                            Seleccione una etiqueta:
                        </strong>
                    </label>
                    
                    <select
                        className="form-select"
                        multiple
                        style={{width: 300, height: 400}}
                        id="selectTag"
                        name="tag"
                        onChange={(e) => { setModTag(e.target.value), setDeleteTag(e.target.value) }}
                        data-bs-theme="dark"
                    >
                        {
                            tags.map((tag) => (
                                <div style={{borderBottom: '1px solid gray'}}>
                                    <option key={tag.id} value={tag.name}>{tag.name}</option>
                                </div>
                            ))
                        }
                    </select>
                </div>


                <div className="col-auto">
                    <div style={{paddingTop: 38}}>

                        <button
                            className={`btn btn-${collapse === 'agregar' ? "primary" : "outline-primary"}`}
                            type="button"
                            onClick={() => { setCollapse('agregar')}}
                            style={{ width: 200}}
                        >
                            Agregar
                        </button>                     
                        
                    </div>
                    


                    <div style={{paddingTop: 20}}>

                        <button
                            className={`btn btn-${collapse === 'editar' ? "warning" : "outline-warning"}`}
                            type="button"
                            onClick={() => { setCollapse('editar')}}
                            style={{ width: 200}}
                        >
                            Editar
                        </button>

                    </div>

                    

                    <div style={{paddingTop: 20}}>

                        <button
                            className={`btn btn-${collapse === 'eliminar' ? "danger" : "outline-danger"}`}
                            type="button"
                            onClick={() => { setCollapse('eliminar')}}
                            style={{ width: 200}}
                            data-bs-toggle="button"
                            aria-pressed="true"
                        >
                            Eliminar
                        </button>
                        
                    </div>

                    

                    { (['agregar', 'editar', 'eliminar'].includes(collapse)) && (

                        <div className="col-12 d-flex justify-content-center mt-4" style={{width: 200}}>
                        
                            

                            <form
                                className="d-flex flex-column gap-2"
                                onSubmit={(e) => {

                                        e.preventDefault();
                                        const data = new FormData(e.target);

                                        collapse === 'agregar' ? handleSubmit(data) :
                                        (
                                            collapse === 'editar' ? handleEdit(data) : 
                                            handleDelete(data)
                                        )

                                    }
                                }
                            >
                                <div style={{width:200}}>
                                    <label htmlFor="tag" style={{paddingBottom: 5}}>
                                        {
                                            collapse === "agregar" ? "Nombre de la etiqueta:" :
                                            (collapse === "editar" ? "Modificar nombre:" : "Etiqueta seleccionada:")
                                        }
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="tag"
                                        name={
                                            collapse === "agregar" ? "newTag" :
                                            (collapse === "editar" ? "modTag" : "deleteTag")
                                        }
                                        value={
                                            collapse === "agregar" ? newTag :
                                            (collapse === "editar" ? modTag : deleteTag)
                                        }
                                        onChange={(e) => {
                                                if (collapse === "agregar") setNewTag(e.target.value);
                                                else if (collapse === "editar") setModTag(e.target.value);
                                            }
                                        }
                                        readOnly={collapse === 'eliminar'}
                                    />
                                </div>
                                
                                <div className="d-flex justify-content-between">
                                    <input
                                        className={
                                            `btn btn-outline-${
                                                collapse === "agregar" ? "success" :
                                                (collapse === "editar" ? "warning" : "danger")}
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
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger g-3 bg-danger bg-opacity-10"
                                        onClick={() => { setCollapse(null) }}
                                    >
                                            Cancelar
                                    </button>
                                </div>
                            </form>
                        
                        </div>

                    )}
                </div>

            </div> 
        </div>

    )

}

export default Tags;