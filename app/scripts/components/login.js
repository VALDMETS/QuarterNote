import React from 'react';
import {hashHistory, Link} from 'react-router';
import $ from 'jquery';
import store from '../store';
import settings from '../settings';

export default React.createClass({
  getInitialState: function() {
    return {
      error: false
    }
  },
  render: function() {
    let randInt = Math.ceil(Math.random()*4);
    let loginIntro = <p>Click <Link to="/signup">here</Link> if you need to sign up</p>
    if(this.state.error) {
      loginIntro = <p className="loginerror">Incorrect name/password</p>
      randInt = 0;
    }
    return (
      <div className="login-page">
        <div className="intro-hero">
          <h2>Welcome Back.</h2>
          <input type="button" ref="gotologin" onClick={this.goSignup} value="Sign Up"/>
        </div>
        <p>{store.loginGreetings[randInt].phrase}</p>
        <form onSubmit={this.submitFunction}>
          {loginIntro}
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
      username: this.refs.loginname.value.toUpperCase(),
      password: this.refs.loginpass.value,
    }, {
      type: 'POST',
      success: (user, resp) => {
        store.session.unset('password');
        store.session.set({authtoken: resp._kmd.authtoken});
        localStorage.setItem('user', JSON.stringify({
          username: store.session.get('username'),
          authtoken: store.session.get('authtoken'),
          img_url: store.session.get('img_url'),
          _id: store.session.get('_id')
        }));
        store.session.friendSetup()
        .then( () => {
          store.themeList.fetch();
          hashHistory.push('/main');
        });
      },
      error: () => {
        this.setState({error: true});
      }
    })
  },
  goSignup: function() {
    hashHistory.push('/signup');
  }
});
