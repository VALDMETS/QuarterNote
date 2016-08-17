import React from 'react';
import {hashHistory} from 'react-router';
import store from '../store';
import settings from '../settings'

export default React.createClass({
  render: function() {
    return (
      <div className="signup-page">
        <h2>Welcome to QuarterNote.</h2>
        <input type="button" ref="gotologin" onClick={this.goLogin} value="Log In"/>
        <form onSubmit={this.submitFunction}>
          <h4>Ready to start having fun?</h4>
          <p>Go do something off the internet then. Get a life.</p>
          <p>But if you really insist on using the hottest new app of your lifetime, go ahead and sign up below:</p>
          <input type="text" ref="signupname" placeholder="Your Name"/>
          <input type="password" ref="signuppass" placeholder="Password"/>
          <input type="submit" value="Let's do this rude thing"/>
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
