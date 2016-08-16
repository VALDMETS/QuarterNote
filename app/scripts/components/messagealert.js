import React from 'react';
import {hashHistory} from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div onClick={this.clickFunction} className="new-message">
        <span>New message from {this.props.info.sender}!</span>
        <span>{this.props.info.timestamp}</span>
      </div>
    )
  },
  clickFunction: function() {
    hashHistory.push(`/main/message/${this.props.info._id}`)
  }
});
