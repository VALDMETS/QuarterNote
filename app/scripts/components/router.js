import React from 'react';
import {Route, Router, hashHistory} from 'react-router';

import Main from './main';
import Signup from './signup';
import Login from './login';
import Profile from './profile';
import NewMessageSelect from './newmessageselect';
import NewMessage from './newmessage';
import Preview from './preview';
import Message from './message';
import RequestConfirmation from './requestconfirmation';
import FriendList from './friendlist';
import About from './about';
import Missing from './missing';

const router = (
  <Router history={hashHistory}>
    <Route path="/main" component={Main}>
      <Route path="message/:id" component={Message}/>
      <Route path="request/:id" component={RequestConfirmation}/>
    </Route>
    <Route path="/signup" component={Signup}/>
    <Route path="/login" component={Login}/>
    <Route path="/profile/:id" component={Profile}/>
    <Route path="/selectfriend" component={NewMessageSelect}/>
    <Route path="/newmessage/:id" component={NewMessage}>
      <Route path="preview" component={Preview}/>
    </Route>
    <Route path="/friends" component={FriendList}/>
    <Route path="/about" component={About}/>
    <Route path="/*" component={Missing}/>
  </Router>

)

export default router;
