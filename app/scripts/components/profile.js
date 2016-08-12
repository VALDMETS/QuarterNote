import React from 'react';
import {hashHistory} from 'react-router';

import Header from './header';

import Friend from '../models/friend';
import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      user: {
        username: '',
        img_url: ''
      }
    }
  },
  render: function() {
    let profilePic;
    if(this.state.user.img_url) {
      profilePic = <img src={this.state.user.img_url} />
    }
    return (
      <div className="profile-page">
        <Header/>
        <h2>{this.state.user.username}</h2>
        <div className="profile-pic">{profilePic}</div>
      </div>
    )
  },
  componentDidMount: function() {
    let currentProfileUser = new Friend();
    currentProfileUser.set({_id: this.props.params.id});
    currentProfileUser.fetch({
      success: (resp) => {
        this.setState({user: currentProfileUser.toJSON()});
        console.log(this.state);
      }
    });
  }
});
