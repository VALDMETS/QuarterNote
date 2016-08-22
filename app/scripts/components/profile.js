import React from 'react';
import {hashHistory} from 'react-router';

import Header from './header';
import FriendWidget from './friendwidget';

import Friend from '../models/friend';
import store from '../store';

export default React.createClass({
  getInitialState: function() {
    let currentProfile;
    if(store.friendList) {
      currentProfile = store.friendList.get(this.props.params.id)
    } else {
      store.session.friendSetup({}, {
        success: () => {
          currentProfile = storefriendList.get(this.props.params.id)
        }
      });
    }
    return {
      user: {
        username: currentProfile.get('username'),
        img_url: currentProfile.get('img_url')
      },
      friends: store.friendList.toJSON(),
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
      let buttonVal = `Message ${this.state.user.username}!`;
      messageButton = <input type="button" value={buttonVal} onClick={this.newMessage}/>
    }
    return (
      <div className="profile-page">
        <Header/>
        <h2>{this.state.user.username}</h2>
        <section className="left-side">
          <div className="profile-pic">{profilePic}</div>
          {messageButton}
        </section>
        <section className="right-side">
          <p className="sect1">Some descriptive stuff that will be replaced by actual profile materials. But when? Hopefully soon. Don't go crazy waiting for it.</p>
          <p className="sect2">Additional facts, blah blah blah</p>
        </section>
        <section className="friend-list">
          <h5>Friends</h5>
          {friendPics}
        </section>
      </div>
    )
  },
  componentDidMount: function() {
    let messageableFriends = store.friendList.toJSON();
    messageableFriends = messageableFriends.filter( (friend) => {
      if (friend._id === store.session.get('_id')) { return false } else { return true }
    })
    this.setState({friends: messageableFriends});
  },
  componentWillReceiveProps: function(nextProps) {
    if(this.props.params.id !== nextProps.params.id) {
      this.profileUpdater(nextProps.params.id)
    }
  },
  profileUpdater: function(id) {
    let currentProfile = store.friendList.get(id);
    this.setState({user: currentProfile.toJSON()});
  },
  newMessage: function() {
    let messageUrl = '/newmessage/' + this.props.params.id;
    hashHistory.push(messageUrl);
  }
});
