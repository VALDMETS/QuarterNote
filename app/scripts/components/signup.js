import React from 'react';
import {hashHistory} from 'react-router';
import store from '../store';
import settings from '../settings'

import Request from '../models/request';

export default React.createClass({
  render: function() {
    return (
      <div className="signup-page">
        <div className="intro-hero">
          <h2>Welcome to QuarterNote</h2>
          <input type="button" ref="gotologin" onClick={this.goLogin} value="Log In"/>
        </div>
        <p>"The piping-hottest musical messenger app</p>
        <h4>of all time"</h4>
        <p>-- You, 2016</p>
        <form onSubmit={this.submitFunction}>
          <p>I feel so lucky to sign up</p>
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
      username: this.refs.signupname.value.toUpperCase(),
      password: this.refs.signuppass.value,
      img_url: "http://piq.codeus.net/static/media/userpics/piq_43701_400x400.png"
    }, {
      url: `https://baas.kinvey.com/user/${settings.appKey}`,
      success: (user, resp) => {
        store.session.unset('password');
        store.session.set({authtoken: resp._kmd.authtoken});

        // gives new user a friend to start :^)

        let initialFriend = new Request({
          confirmation: true,
          requestor: "VALDMETS",
          requestor_id: '57ae0b2c1d7f092358391184',
          recipient: store.session.get('username'),
          recipient_id: store.session.get('_id')
        })
        initialFriend.save().then( () => {
          store.session.friendSetup().then( () => {
            hashHistory.push('/main');
          })
        });
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
