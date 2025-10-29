import { useState, useEffect } from 'react';

const Tags = () => {

    const API = import.meta.env.VITE_API_URL;

    const [tags, setTags] = useState([]);



    const fetchTags = async () => {

        const res = await fetch(API + "/api/")
    }

}