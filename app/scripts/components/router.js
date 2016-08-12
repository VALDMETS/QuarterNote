import React from 'react';
import {Route, Router, hashHistory} from 'react-router';

import Main from './main';
import Login from './login';
import Profile from './profile';
import NewMessageSelect from './newmessageselect';
import NewMessage from './newmessage';
import Preview from './preview';
import Message from './message';
import About from './about';

const router = (
  <Router history={hashHistory}>
    <Route path="/main" component={Main}/>
    <Route path="/login" component={Login}/>
    <Route path="/profile/:id" component={Profile}/>
    <Route path="/selectfriend" component={NewMessageSelect}/>
    <Route path="/newmessage/:id" component={NewMessage}>
      <Route path="confirm" component={Preview}/>
    </Route>
    <Route path="/message/:id" component={Message}/>
    <Route path="/about" component={About}/>

  </Router>

)

export default router;
