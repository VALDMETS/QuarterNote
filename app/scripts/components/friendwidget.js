import React from 'react';
import {hashHistory} from 'react-router';

import store from '../store';

export default React.createClass({
  render: function() {
    return (
      <div onClick={this.friendClick} className="friend-widget">
        <div className="friend-pic"><img src={this.props.data.img_url}/></div>
        <h6>{this.props.data.username}</h6>
      </div>
    )
  },
  friendClick: function() {
    hashHistory.push(`/profile/${this.props.data._id}`)
  }
});
