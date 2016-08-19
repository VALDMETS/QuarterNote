import React from 'react';
import {hashHistory} from 'react-router';

import Request from '../models/request';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return store.friendRequests.reduce((returnSoFar, request, i) => {
      if (this.props.params.id === request._id) {
        returnSoFar = request;
      }
      return returnSoFar;
    }, {})
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
    let friendRequest = new Request({
      _id: this.state._id,
      confirmation: true,
      requestor: this.state.requestor,
      requestor_id: this.state.requestor_id,
      recipient: this.state.recipient,
      recipient_id: this.state.recipient_id
    })
    friendRequest.save().then( () => {
      store.friendRequests = store.friendRequests.filter( (request) => {
        console.log(this.state._id);
        console.log(request._id);
        if (this.state._id === request._id) {
          return false
        } else { return true }
      });
      console.log(store.friendRequests);
      hashHistory.push('/main');
    });

  },
  denyFunction: function() {
    let friendRequest = new Request({
      _id: this.state._id,
      confirmation: false,
      requestor: this.state.requestor,
      requestor_id: this.state.requestor_id,
      recipient: this.state.recipient,
      recipient_id: this.state.recipient_id
    })
    friendRequest.save().then( () => {
      store.friendRequests = store.friendRequests.filter( (request) => {
        if (this.state._id === request._id) {
          return false
        } else { return true }
      });
    });
    console.log(store.friendRequests);
    hashHistory.push('/main');
  }
})
