import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Notes from './Notes/Notes'


export default function Main() {
    const [isAuthorized, setIsAuthorized] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthorized(false);
    }
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthorized(!!token);
    },[]);

    return (
        <>
        <h1> Homework #2 prepared by Volodymyr Mikulin  </h1>
        {isAuthorized
            ? (
                <>
                    <button type="button" className="logout" onClick={handleLogout}>LOGOUT</button>
                    <Notes/>
                </>
            ) : (
                <>
                
                    <Link className="login" to="/login"> LOGIN</Link>
                    <hr/>
                    <br/>
                    <Link className="register" to="/register"> REGISTER</Link>
                    <h3>To work with notes you must login!</h3>
                </>
            )} 
        </>
    );
}