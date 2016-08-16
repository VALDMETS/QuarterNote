import React from 'react';
import {hashHistory} from 'react-router';
import store from '../store';

export default React.createClass({
  render: function() {
    return (
      <div className="login-page">
        <h2>Welcome to QuarterNote.</h2>
        <form onSubmit={this.submitFunction}>
          <h4>Ready to start having fun?</h4>
          <p>Go do something off the internet then. Get a life.</p>
          <p>But if you really insist on using the hottest new app of your lifetime, go ahead and log in below:</p>
          <input type="text" ref="loginname" placeholder="Your Name"/>
          <input type="password" ref="loginpass" placeholder="Password"/>
          <input type="submit" value="Let's do this rude thing"/>
        </form>
      </div>
    )
  },
  submitFunction: function(e) {
    e.preventDefault();
    store.session.save({username: this.refs.loginname.value, password: this.refs.loginpass.value}, {
      success: (user, resp) => {
        store.session.unset('password');
        store.session.set({authtoken: resp._kmd.authtoken, friend_id: resp.friend_id});
        store.friendList.fetch();
        hashHistory.push('/main');
      },
      error: () => {
        console.log('sorry, something went wrong');
      }
    })
  }
});
