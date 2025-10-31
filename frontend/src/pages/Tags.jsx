import { useState, useEffect } from 'react';

const Tags = () => {

    const API_URL = import.meta.env.VITE_API_URL;

    const [tags, setTags] = useState([]);

    

    const fetchTags = async () => {

        try {
            const res = await fetch(`${API_URL}tags`,
                {
                    credentials: 'include'
                }
            );
            if (!res) throw new Error('Error al obtener los tags.');

            setTags(res.data)
        } catch (err) {
            console.error(`Message: ${err}`);
        }
    }

    useEffect(() => {
        fetchTags()
    }, []);

    return (
        <div>
            <p>aloha</p>
            <p>${tags}</p>
        </div>
    )

}

export default Tags;