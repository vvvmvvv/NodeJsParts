import React, {useState} from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:8081';
const REGISTER_API = `${API_URL}/api/user/register`;

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const fetchRegistry = async (e) => {
        e.preventDefault();
        const user = {name,email, password};
        console.log(user);
        await axios.post(REGISTER_API, {name,email, password});
        
    }
    
    const handleNameInput = (e) => {
        setName(e.target.value);
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    return (
        <form onSubmit={fetchRegistry}>
            <input type="text" name="name" value={name} onChange={handleNameInput}/>
            <input type="email" name="email" value={email} onChange={handleEmailInput}/>
            <input type="password" name="password" value={password} onChange={handlePasswordInput}/>
            <button type="submit">Register</button>
        </form>
    );
}