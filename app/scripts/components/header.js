import React from 'react';
import {Link, hashHistory} from 'react-router';

import store from '../store';
import settings from '../settings';

export default React.createClass({
  getInitialState: function() {
    return {
      menuToggle: true
    }
  },
  render: function() {
    let selfProfile = `/profile/${store.session.get('_id')}`;
    let opacity = {opacity: .7};
    if (!this.state.menuToggle) {
      opacity = {opacity: .2};
    }
    return (
      <header>
        <div className="menu-button" onClick={this.expandFunction}>
          <img ref="menuicon" src="assets/menu.png" style={opacity}/>
          <ul className="header-menu" ref="headermenu">
            <li><Link to="/main">Check Messages</Link></li>
            <li><Link to="/selectfriend">New Message</Link></li>
            <li><Link to="/friends">Friends</Link></li>
            <li><Link to={selfProfile}>Profile</Link></li>
            <li><Link onClick={this.logoutFunction} to="/login">Log Out</Link></li>
            <li><Link to="/about">About</Link></li>
            <div ref="escaper" onClick={this.escapeFunction}/>
          </ul>
        </div>
        <h1 onClick={this.homeFunction}>QuarterNote</h1>
      </header>
    )
  },
  expandFunction: function() {
    if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) < 750) {
      if (this.state.menuToggle) {
        this.refs.headermenu.className = "header-menu expanded";
        this.refs.escaper.className = "invisible-escape";
      } else {
        this.refs.headermenu.className = "header-menu";
        this.refs.escaper.className = "";
      }
      this.setState({menuToggle: !(this.state.menuToggle)});
    }
  },
  logoutFunction: function () {
    store.session.save(null, {
      type: 'POST',
      url: `https://baas.kinvey.com/user/${settings.appKey}/_logout`
    })
    store.session.logoutFunction();
  },
  escapeFunction: function () {
    this.expandFunction();
  },
  homeFunction: function() {
    hashHistory.push('/main');
  }
});
