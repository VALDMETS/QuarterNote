import React from 'react';
import {hashHistory} from 'react-router';
import store from '../store';

export default React.createClass({
  render: function() {
    return (
      <div className="login-page">
        <h2>Welcome Back.</h2>
        <input type="button" ref="gotologin" onClick={this.goSignup} value="Sign Up"/>
        <form onSubmit={this.submitFunction}>
          <p>go ahead and log in below:</p>
          <input type="text" ref="loginname" placeholder="Your Name"/>
          <input type="password" ref="loginpass" placeholder="Password"/>
          <input type="submit" value="Let's do this rude thing"/>
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
        store.friendList.fetch();
        hashHistory.push('/main');
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
