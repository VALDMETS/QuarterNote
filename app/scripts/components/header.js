import React from 'react';
import {Link} from 'react-router';

import store from '../store';

export default React.createClass({
  render: function() {
    let selfProfile = `/profile/${store.session.get('friend_id')}`;
    return (
      <header>
        <ul className="header-menu">
          <li><Link to={selfProfile}>Profile</Link></li>
          <li><Link to="/newmessage/overlay">New Message</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <h1>Quarter Note</h1>
        <Link className="main-button" to="/newmessage/overlay">Logo</Link>
      </header>
    )
  }
});
