import React from 'react';
import {hashHistory} from 'react-router';

export default React.createClass({
  getInitialState: function() {
    return {
      routeOverride: false
    }
  },
  render: function() {
    return (
      <div onClick={this.clickFunction} className="friend-selector">
        <div className="selector-pic">
          <img src={this.props.info.img_url}/>
        </div>
        <h5>{this.props.info.username}</h5>
        {/*<div onClick={this.profileGo} className="profile-button"/>*/}
      </div>
    )
  },
  clickFunction: function() {
    console.log(this.state.routeOverride);
    if(!this.state.routeOverride) {
      hashHistory.push(`/newmessage/${this.props.info._id}`);
    } else {
      hashHistory.push('/main');
    }

  },
  profileGo: function() {
    this.setState({routeOverride: true});
  }
});
