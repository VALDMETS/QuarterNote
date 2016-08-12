import React from 'react';
import {Route, Router, hashHistory} from 'react-router';

import Main from './main';
import Login from './login';
import Profile from './profile';

const router = (
  <Router history={hashHistory}>
    <Route path="/main" component={Main}/>
    <Route path="/login" component={Login}/>
    <Route path="/profile/:id" component={Profile}/>
  </Router>

)

export default router;
