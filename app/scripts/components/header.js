import React from 'react';
import {Link} from 'react-router';

import store from '../store';

export default React.createClass({
  render: function() {
    let selfProfile = `/profile/${store.session.get('_id')}`;
    return (
      <header>
        <div className="menu-button" onClick={this.expandFunction}>
          <ul className="header-menu" ref="headermenu">
            <li><Link to="/main">Check Messages</Link></li>
            <li><Link to="/selectfriend">New Message</Link></li>
            <li><Link to={selfProfile}>Profile</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <h1>QN</h1>
        <Link className="main-button" to="/selectfriend">Logo</Link>
      </header>
    )
  },
  expandFunction: function() {
    this.refs.headermenu.className = "header-menu expanded";
  }
});
