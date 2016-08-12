import React from 'react';
import {Route, Router, hashHistory} from 'react-router';

import Main from './main';
import Login from './login';

const router = (
  <Router history={hashHistory}>
    <Route path="/main" component={Main}/>
    <Route path="/login" component={Login}/>
  </Router>

)

export default router;
