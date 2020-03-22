import React, {useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
const API_URL = 'http://localhost:8081';
const REGISTER_API = `${API_URL}/api/user/register`;

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [routeRedirect, setRouteRedirect] = useState(false);
    
    const fetchRegistry = async (e) => {
        e.preventDefault();
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        setRouteRedirect(!!token);
    },[]);

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to='/' />
    }

    return (
        <>
        <h1>Register:</h1>
        <form onSubmit={fetchRegistry}>
            <input type="text" name="name" value={name} onChange={handleNameInput}/>
            <input type="email" name="email" value={email} onChange={handleEmailInput}/>
            <input type="password" name="password" value={password} onChange={handlePasswordInput}/>
            <button type="submit">Register</button><br/>
            <span>Maybe, you already have an  account?<Link to="/login">Login</Link> </span>
        </form>
        </>
    );
}