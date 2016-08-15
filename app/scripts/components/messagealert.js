import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div className="new-message">
        <span>New message from {this.props.info.sender}!</span>
        <span>{this.props.info.timestamp}</span>
      </div>
    )
  }
});
