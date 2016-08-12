import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <header>
        <ul className="header-menu">
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/newmessage/overlay">New Message</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <h1>Quarter Note</h1>
        <Link to="/newmessage/overlay">Logo</Link>
      </header>
    )
  }
});
