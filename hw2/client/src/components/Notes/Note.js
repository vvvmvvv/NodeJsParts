import React from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:8081';
const NOTES_API = `${API_URL}/api/notes`;

export default function Note({note, fetchNotes}) {
    const token = localStorage.getItem('token');
    const config = {headers: {
        authorization: token
    }};

    const deleteNote = async (e,id) =>{
        e.preventDefault();
        await axios.delete(`${NOTES_API}/${id}`, config);
        fetchNotes();
    }

    const checkNote = async (e, id) =>{
        e.preventDefault();
        await axios.put(`${NOTES_API}/${id}`, {isChecked: e.target.checked}, config);
        fetchNotes();
    }

    return (
        <li>
            <input type="checkbox" checked={note.isChecked} onChange={(e) => checkNote(e, note._id)} />
            {note.title}
            <button onClick={(e) => deleteNote(e, note._id)}>Delete</button>
        </li>
    );
}