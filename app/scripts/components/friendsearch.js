import React from 'react';
import {hashHistory} from 'react-router';

import Request from '../models/request';

import store from '../store';

export default React.createClass({
  render: function() {
    let span;
    if (!store.friendList.get(this.props.info._id)){
      span = <span>Click to friend request!</span>
    }
    store.pendingRequests.forEach( (request) => {
      if((request.get('requestor_id') === this.props.info._id || request.get('recipient_id') === this.props.info._id) && request.get('confirmation') === null) {
        span = <span ref="noclick">Request Pending</span>
      }
    });
    return (
      <div onClick={this.clickFunction} className="friend-listing">
        <div className="search-pic">
          <img src={this.props.info.img_url}/>
        </div>
        <h5>{this.props.info.username}</h5>
        {span}
      </div>
    )
  },
  clickFunction: function() {
    if (this.refs.noclick) {

      //maybe put in a shakey animation

      return null;
    }
    if (store.friendList.get(this.props.info._id)){
      hashHistory.push(`/profile/${this.props.info._id}`);
    } else {
      let newRequest = new Request();
      newRequest.save({
        requestor: store.session.get('username'),
        requestor_id: store.session.get('_id'),
        recipient: this.props.info.username,
        recipient_id: this.props.info._id
      }, {
        success: () => {
          store.requestSentConfirmation = true;
          store.session.friendSetup();
          hashHistory.push('/main');
        }
      });
    }
  }
});
