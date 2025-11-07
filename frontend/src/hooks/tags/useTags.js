import { useState, useEffect } from 'react';

export default function useTags() {

    const API_URL = import.meta.env.VITE_API_URL;

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [modTag, setModTag] = useState("");
    const [deleteTag, setDeleteTag] = useState("")
    const [collapse, setCollapse] = useState("");
    const [editFlag, setEditFlag] = useState(true);

    const collapseIs = (mode) => {
        return collapse === mode
    }
    
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
                method === 'POST' ? setNewTag("") : //Para vaciar el campo visualmente.
                (
                    method === 'PATCH' ? setDeleteTag(data.name) : //Si actualiza nombre, al cambiar al botón "Eliminar", el nombre aparecerá actualizado en el campo (solo para efectos visuales).
                    (
                        method === 'DELETE' ? setDeleteTag("") : null //Lo mismo al eliminar, se vacía el campo.
                    )
                );
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

    return {
        collapseIs,
        handleSubmit,
        handleEdit,
        handleDelete,
        findTagName,
        editFlag,
        setEditFlag,
        tags,
        collapse,
        setCollapse,
        newTag,
        modTag,
        deleteTag,
        setNewTag,
        setModTag
    }
}