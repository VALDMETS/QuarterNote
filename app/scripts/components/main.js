import React from 'react';

import store from '../store';
import Header from './header';

export default React.createClass({
  render: function() {
    return (
      <div className="main-page">
        <Header/>
        <h2>Welcome, {store.session.get('username')}</h2>
      </div>
    )
  }
});
