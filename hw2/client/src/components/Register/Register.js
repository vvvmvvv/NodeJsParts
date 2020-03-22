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
            <span>Enter  Name: </span><input type="text"  minLength="6" name="name" className="normalizeInput" value={name} onChange={handleNameInput} required /><br/>
            <span>Enter  Email: </span><input type="email" minLength="6" name="email" className="normalizeInput" value={email} onChange={handleEmailInput} required/><br/>
            <span>Enter  Password: </span><input type="password" minLength="6" name="password" className="normalizeInput" value={password} onChange={handlePasswordInput} required />
            <br/>
            <button type="submit" className="register">Register</button><br/>
            <hr/>
            <span>Maybe, you already have an  account?<Link to="/login">Login</Link> </span>
        </form>
        </>
    );
}