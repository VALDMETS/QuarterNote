import React from 'react';
import {hashHistory} from 'react-router';

import store from '../store';

export default React.createClass({
  render: function() {
    return (
      <div onClick={this.friendClick} className="friend-widget">
        {this.props.data.username}
      </div>
    )
  },
  friendClick: function() {
    hashHistory.push(`/profile/${this.props.data._id}`)
  }
});
