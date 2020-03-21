import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notes from './components/Notes/Notes'


const Routes = () => (
    <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/notes' component={Notes} />

    </Switch>
);

export default Routes;