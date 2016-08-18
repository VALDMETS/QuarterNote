import React from 'react';
import moment from 'moment';
import {hashHistory} from 'react-router';

import Request from '../models/request';

import store from '../store';

export default React.createClass({
  render: function() {
    return (
      <div className="friend-request" onClick={this.clickFunction}>
        <div className="alert-color"/>
        <p>{this.props.info.requestor} wants to be friends!</p>
        <span>Click here to respond!</span>
      </div>
    )
  },
  clickFunction: function() {
    let friendRequest = new Request({
      _id: this.props.info._id,
      confirmation: true,
      requestor: this.props.info.requestor,
      requestor_id: this.props.info.requestor_id,
      recipient: this.props.info.recipient,
      recipient_id: this.props.info.recipient_id
    })
    friendRequest.save();
    // store.session.requestConfirm(this.props.info);
  }
});
