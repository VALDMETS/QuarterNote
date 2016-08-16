import React from 'react';
import {hashHistory} from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div onClick={this.clickFunction} className="friend-selector">
        {this.props.info.username}
      </div>
    )
  },
  clickFunction: function() {
    hashHistory.push(`/newmessage/${this.props.info._id}`);
  }
});
