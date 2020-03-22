import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Note from './Note';

const API_URL = 'http://localhost:8081';
const NOTES_API = `${API_URL}/api/notes`;

export default function Notes() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState([]);
    const token = localStorage.getItem('token');
    const config = {headers: {
        authorization: token
    }};
    
    const addNote = async (e) => {
        e.preventDefault();
        await axios.post(NOTES_API, {title,description}, config);
        fetchNotes();
    }

    const fetchNotes = () => {
        axios.get(NOTES_API, config)
            .then(({data: notes}) => {
                setNotes(notes);
            });
    }
    useEffect(() => {
        fetchNotes();
    }, []);
    
    const handleTitleInput = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionInput = (e) => {
        setDescription(e.target.value);
    }

    return (
        <>
        <h3>My notes: {notes.length}</h3>
        <form onSubmit={addNote}>
            <span>Title:</span>><input type="text" name="title" value={title} onChange={handleTitleInput}/>
            <span>Description:</span><textarea  name="description" value={description} onChange={handleDescriptionInput}/><br/>
            <button type="submit">ADD NOTE</button>
        </form>
        <ul>
        {notes.map((note) => <Note key={note._id} note={note} fetchNotes={fetchNotes} /> )}
        </ul>
        </>
    );
}