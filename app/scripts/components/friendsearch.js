import React from 'react';
import {hashHistory} from 'react-router';

import Request from '../models/request';

import store from '../store';

export default React.createClass({
  render: function() {
    return (
      <div onClick={this.clickFunction} className="friend-listing">
        <div className="search-pic">
          <img src={this.props.info.img_url}/>
        </div>
        <h5>{this.props.info.username}</h5>
      </div>
    )
  },
  clickFunction: function() {
    if (store.friendList.get(this.props.info._id)){
      hashHistory.push(`/profile/${this.props.info._id}`);
    } else {
      console.log(this.props.info);
      let newRequest = new Request();
      newRequest.save({
        requestor: store.session.get('username'),
        requestor_id: store.session.get('_id'),
        recipient: this.props.info.username,
        recipient_id: this.props.info._id
      }, {
        success: () => {
          store.requestSentConfirmation = true;
          hashHistory.push('/main');
        }
      })
    }
  }
});
