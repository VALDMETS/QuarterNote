import React from 'react';
import {Link} from 'react-router';

import store from '../store';

export default React.createClass({
  render: function() {
    let selfProfile = `/profile/${store.session.get('friend_id')}`;
    return (
      <header>
        <ul className="header-menu">
          <li><Link to="/main">Check Messages</Link></li>
          <li><Link to="/selectfriend">New Message</Link></li>
          <li><Link to={selfProfile}>Profile</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <h1>QN</h1>
        <Link className="main-button" to="/selectfriend">Logo</Link>
      </header>
    )
  }
});
