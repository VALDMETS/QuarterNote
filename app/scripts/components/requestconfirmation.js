import React from 'react';
import {hashHistory} from 'react-router';

import Request from '../models/request';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return store.friendRequests.get(this.props.params.id).toJSON()
  },
  render: function() {
    return (
      <div className="message-placemat">
        <input type="button" value="X" onClick={this.escapeFunction}/>
        <div className="confirmation-window">
          <h3>Become friends with</h3>
          <h3>{this.state.requestor}?</h3>
          <input type="button" value="YES" onClick={this.confirmFunction}/>
          <input type="button" value="NO" onClick={this.denyFunction}/>
        </div>
      </div>
    )
  },
  escapeFunction: function() {
    hashHistory.push('/main')
  },
  confirmFunction: function() {
    let currentRequest = store.friendRequests.get(this.state._id);
    currentRequest.save({confirmation: true}).then( () => {
      store.friendRequests.remove(this.state._id);
      store.friendRequests.trigger('update');
      store.session.friendSetup();
      hashHistory.push('/main');
    });
  },
  denyFunction: function() {
    let currentRequest = store.friendRequests.get(this.state._id);
    currentRequest.save({confirmation: false}).then( () => {
      store.friendRequests.remove(this.state._id);
      store.friendRequests.trigger('update');
      hashHistory.push('/main');
    });
  }
});
