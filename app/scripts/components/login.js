import React from 'react';
import {hashHistory} from 'react-router';
import $ from 'jquery';
import store from '../store';
import settings from '../settings';

export default React.createClass({
  render: function() {
    let randInt = Math.floor(Math.random()*4);
    return (
      <div className="login-page">
        <div className="intro-hero">
          <h2>Welcome Back.</h2>
          <input type="button" ref="gotologin" onClick={this.goSignup} value="Sign Up"/>
        </div>
        <p>{store.loginGreetings[randInt].phrase}</p>
        <form onSubmit={this.submitFunction}>
          <p>Go ahead and log in</p>
          <input type="text" ref="loginname" placeholder="Your Name"/>
          <input type="password" ref="loginpass" placeholder="Password"/>
          <input type="submit" value={store.loginGreetings[randInt].button}/>
        </form>
      </div>
    )
  },
  submitFunction: function(e) {
    e.preventDefault();
    store.session.save({
      username: this.refs.loginname.value,
      password: this.refs.loginpass.value,
    }, {
      success: (user, resp) => {
        store.session.unset('password');
        store.session.set({authtoken: resp._kmd.authtoken});
        store.session.friendSetup()
        // .then( () => {
        //   console.log('whoa');
        // });
        
        // localStorage.setItem('user', JSON.stringify({
        //   username: store.session.get('username'),
        //   authtoken: store.session.get('authtoken'),
        //   img_url: store.session.get('img_url'),
        //   _id: store.session.get('_id')
        // }));
      },
      error: () => {
        console.log('sorry, something went wrong');
      }
    })
  },
  goSignup: function() {
    hashHistory.push('/signup');
  }
});
