import React from 'react';
import {hashHistory} from 'react-router';
import store from '../store';
import settings from '../settings'

export default React.createClass({
  render: function() {
    return (
      <div className="signup-page">
        <div className="intro-hero">
          <h2>Welcome to QuarterNote</h2>
          <input type="button" ref="gotologin" onClick={this.goLogin} value="Log In"/>
        </div>
        <p>The piping-hottest musical messenger app</p>
        <h4>- of all time -</h4>
        <form onSubmit={this.submitFunction}>
          <h3>I feel so lucky to sign up</h3>
          <input type="text" ref="signupname" placeholder="Your Name"/>
          <input type="password" ref="signuppass" placeholder="Password"/>
          <input type="submit" value="GO"/>
        </form>
      </div>
    )
  },
  submitFunction: function(e) {
    e.preventDefault();
    store.session.save({
      username: this.refs.signupname.value,
      password: this.refs.signuppass.value
    }, {
      url: `https://baas.kinvey.com/user/${settings.appKey}`,
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
  goLogin: function() {
    hashHistory.push('/login')
  }
});