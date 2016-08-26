import React from 'react';
import {hashHistory} from 'react-router';
import store from '../store';
import settings from '../settings'

import Request from '../models/request';
import Message from '../models/message';

export default React.createClass({
  getInitialState: function() {
    return {
      error: false
    }
  },
  render: function() {
    let loginIntro = <p>I feel so lucky to sign up</p>;
    if(this.state.error) {
      loginIntro = <p className="loginerror">Username is already taken!</p>
      if(this.refs.signupname.value.length > 12) {
        loginIntro = <p className="loginerror">Username is too long!</p>
      }
    }
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
          {loginIntro}
          <input type="text" ref="signupname" placeholder="Your Name"/>
          <input type="password" ref="signuppass" placeholder="Password"/>
          <input type="submit" value="GO"/>
        </form>
      </div>
    )
  },
  submitFunction: function(e) {
    e.preventDefault();
    let randInt = Math.floor(Math.random()*10);
    if (this.refs.signupname.value.length <= 12) {
      store.session.save({
        username: this.refs.signupname.value.toUpperCase(),
        password: this.refs.signuppass.value,
        img_url: `assets/profile/tar${randInt}.png`
      }, {
        url: `https://baas.kinvey.com/user/${settings.appKey}`,
        success: (user, resp) => {
          store.session.unset('password');
          store.session.set({authtoken: resp._kmd.authtoken});

          // gives new user a friend + message to start :^)

          let initialFriend = new Request({
            confirmation: true,
            requestor: "VALDMETS",
            requestor_id: '57ae0b2c1d7f092358391184',
            recipient: store.session.get('username'),
            recipient_id: store.session.get('_id')
          })
          let initialMessage = new Message({
            sender: 'VALDMETS',
            recipient_id: store.session.get('_id'),
            content: ['thanks ','for ','join','ing ','quar','ter ','note!'],
            theme: 'know',
            theme_id: '57bca116bfc43b0e64e144c1',
            points: 100,
            timestamp: new Date()
          });
          initialMessage.save().then( () => {
            initialFriend.save().then( () => {
              store.session.friendSetup().then( () => {
                store.themeList.fetch();
                store.newUser = true;
                hashHistory.push('/main');
              })
            });
          });
        },
        error: () => {
          this.setState({error: true});
        }
      })
    } else {
      this.setState({error: true});
    }
  },
  goLogin: function() {
    hashHistory.push('/login')
  }
});
