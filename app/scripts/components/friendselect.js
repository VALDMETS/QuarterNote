import React from 'react';
import {hashHistory} from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div onClick={this.clickFunction} className="friend-selector">
        <div className="selector-pic">
          <img src={this.props.info.img_url}/>
        </div>
        <h5>{this.props.info.username}</h5>
      </div>
    )
  },
  clickFunction: function() {
    hashHistory.push(`/newmessage/${this.props.info._id}`);
  }
});
