import React from 'react';
import {Link} from 'react-router';
import store from '../store';

export default React.createClass({
  render: function() {
    return (
      <div className="missing">
        <h4>Error 404</h4>
        <p>Sorry! You ended up in a place that doesn't exist. <Link to="/login">Click here</Link> to get back to the Login page</p>
      </div>
    )
  },
  componentDidMount: function() {
    store.session.logoutFunction();
  }
});
