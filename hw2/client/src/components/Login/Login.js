import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
const API_URL = 'http://localhost:8081';
const LOGIN_API = `${API_URL}/api/user/login`;


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [routeRedirect, setRouteRedirect] = useState(false);
    
    const fetchLogin = async (e) => {
        e.preventDefault();
        const token = await axios.post(LOGIN_API, {email, password});
        console.log(token);
        localStorage.setItem('token', token.data);
        setRouteRedirect(true);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        setRouteRedirect(!!token);
    },[]);

    
    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to='/' />
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    return (
        <>
        <h1> LOGIN: </h1>
        <form onSubmit={fetchLogin}>
            <input type="email" name="email" value={email} onChange={handleEmailInput}/>
            <input type="password" name="password" value={password} onChange={handlePasswordInput}/>
            <button type="submit">Login</button><br/>
            <span>If you dont`t have an account, you can register!<Link to="/register">Register</Link> </span>
        </form>
        </>
    );
}