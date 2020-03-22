import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Note from './Note';

import './Notes.scss'

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
        <div className="notes">
            <div className="notes__header">
                <h2>My notes page! Number of notes: {notes.length}</h2>
            </div>
            <div className="notes__form">
            <form onSubmit={addNote}>
                <div className="notes__form-title"><span>Title:</span><br/><input type="text" className="normalizeInput"name="title" value={title} onChange={handleTitleInput} required/></div>
                <div className="notes__form-description"><span>Description:</span><br/><textarea className="normilizeDescr" name="description" value={description} onChange={handleDescriptionInput} required/></div>
                <div className="notes__form-button"><button type="submit" className="add_note">ADD NOTE</button></div>
            </form>
            </div>
            <div className="notes__list">
                <ul>
                    {notes.map((note) => <Note key={note._id} note={note} fetchNotes={fetchNotes} /> )}
                </ul>
            </div>
        </div>
        </>
    );
}