import React from 'react';
import moment from 'moment';
import {hashHistory} from 'react-router';

export default React.createClass({
  render: function() {
    let timestampFormat = 'from ' + moment(this.props.info.timestamp).fromNow();
    return (
      <div onClick={this.clickFunction} className="new-message-alert">
        <div className="alert-color"/>
        <p>New message from {this.props.info.sender}!</p>
        <span>{timestampFormat}</span>
      </div>
    )
  },
  clickFunction: function() {
    hashHistory.push(`/main/message/${this.props.info._id}`)
  }
});
