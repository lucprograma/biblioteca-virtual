import TagButton from "./TagButton";
import useTags from "../../hooks/tags/useTags";
import TagSelect from "./TagSelect";

export default function TagsForm() {

    const {
        collapseIs,
        handleSubmit,
        handleEdit,
        handleDelete,
        findTagName,
        tags,
        collapse,
        setCollapse,
        newTag,
        modTag,
        deleteTag,
        setNewTag,
        setModTag
    } = useTags();



    return (

        <div className="col-auto">                   
                            
            <form
                className="d-flex flex-row gap-2"
                onSubmit={(e) => {

                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const data = Object.fromEntries(formData.entries());
                    
                        collapseIs('agregar') ? handleSubmit(data) :
                        (
                            collapseIs('editar') ? handleEdit(data) : handleDelete(data)
                        )

                    }
                }
            >
                <TagSelect
                    findTagName={findTagName}
                    collapseIs={collapseIs}
                    tags={tags}
                />

                <div 
                    className="col-auto d-flex flex-column align-items-start"
                    style={{ paddingLeft: 10}}
                >

                    <TagButton
                        mode='agregar'
                        setCollapse={setCollapse}
                        collapseIs={collapseIs}
                        paddingTop={38}
                    />

                    <TagButton
                        mode='editar'
                        setCollapse={setCollapse}
                        collapseIs={collapseIs}
                        paddingTop={20}
                    />

                    <TagButton
                        mode='eliminar'
                        setCollapse={setCollapse}
                        collapseIs={collapseIs}
                        paddingTop={20}
                    />
                                            

                    { (['agregar', 'editar', 'eliminar'].includes(collapse)) && (

                        <div className="mt-4" style={{width: 200}}>
                                                                                
                            <div style={{width:200}}>
                                <label htmlFor="tagName" style={{paddingBottom: 5}}>
                                    {
                                        collapseIs('agregar') ? "Nombre de la etiqueta:" :
                                        (collapseIs('editar') ? "Modificar nombre:" :
                                        "Etiqueta seleccionada:")
                                    }
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="tagName"
                                    name="name"
                                    value={
                                        collapseIs('agregar') ? newTag :
                                        (collapseIs('editar') ? modTag : deleteTag)
                                    }
                                    onChange={(e) => {
                                            if (collapseIs('agregar')) setNewTag(e.target.value);
                                            if (collapseIs('editar')) setModTag(e.target.value);
                                        }
                                    }
                                    disabled={
                                        collapseIs('editar') ? modTag === "" :
                                        (
                                            collapseIs('eliminar') ? deleteTag === "" : false
                                        )
                                    }
                                />
                            </div>
                            
                            <div className="d-flex justify-content-between mt-3">
                                <input
                                    className={
                                        `btn btn-outline-${
                                            collapseIs('agregar') ? "success" :
                                            (collapseIs('editar') ? "warning" : "danger")
                                        }
                                        ${
                                            collapseIs('agregar') ? "bg-success" :
                                            (collapseIs('editar') ? "bg-warning" : "")
                                        }
                                            bg-opacity-10
                                        `                                
                                    }
                                    type="submit"
                                    value={
                                            collapseIs('agregar') ? "Crear" :
                                            (collapseIs('editar') ? "Actualizar" : "Borrar")
                                    }
                                    disabled={
                                        collapseIs('agregar') ? newTag === "" :
                                        (
                                            collapseIs('editar') ? modTag === "" :
                                            (
                                                collapseIs('eliminar') ? deleteTag === "" : false
                                            )
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

    )
}