import React from 'react';
import {hashHistory} from 'react-router';

import Header from './header';
import FriendWidget from './friendwidget';

import Friend from '../models/friend';
import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      user: {
        username: '',
        img_url: ''
      },
      friends: [],
    }
  },
  render: function() {
    let profilePic;
    if(this.state.user.img_url) {
      profilePic = <img src={this.state.user.img_url} />
    }
    let friendPics;
    friendPics = this.state.friends.map( (friend,i) => {
      return <FriendWidget data={friend} key={i}/>
    });
    let messageButton;
    if (store.session.get('_id') !== this.props.params.id) {
      let buttonVal = `Send a message to ${this.state.user.username}!`;
      messageButton = <input type="button" value={buttonVal} onClick={this.newMessage}/>
    }
    return (
      <div className="profile-page">
        <Header/>
        <h2>{this.state.user.username}</h2>
        <div className="profile-pic">{profilePic}</div>
        {messageButton}
        <section className="friend-list">
          <h5>Friends</h5>
          {friendPics}
        </section>
      </div>
    )
  },
  componentDidMount: function() {
    this.profileUpdater(this.props.params.id);
    store.friendList.fetch({
      success: () => {
        this.setState({friends: store.friendList.toJSON()})
      }
    });
  },
  componentWillReceiveProps: function(nextProps) {
    if(this.props.params.id !== nextProps.params.id) {
      this.profileUpdater(nextProps.params.id)
    }
  },
  profileUpdater: function(id) {
    let currentProfile = new Friend({_id: id})
    currentProfile.fetch({
      success: (resp) => {
        this.setState({user: currentProfile.toJSON()});
      }
    });
  },
  newMessage: function() {
    let messageUrl = '/newmessage/' + this.props.params.id;
    hashHistory.push(messageUrl);
  }
});
