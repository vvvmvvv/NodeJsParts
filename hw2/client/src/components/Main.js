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
        <h1> HoME </h1>
        {isAuthorized
            ? (
                <>
                    <button type="button" onClick={handleLogout}>LOGOUT</button>
                    <Notes/>
                </>
            ) : (
                <>
                    <Link to="/login"> LOGIN</Link>
                    <hr/>
                    <Link to="/register"> REGISTER</Link>
                </>
            )} 
        </>
    );
}