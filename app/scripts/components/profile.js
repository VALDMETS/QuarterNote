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
    return (
      <div className="profile-page">
        <Header/>
        <h2>{this.state.user.username}</h2>
        <div className="profile-pic">{profilePic}</div>
        <section className="friend-list">
          <h5>Friends</h5>
          {friendPics}
        </section>
      </div>
    )
  },
  componentDidMount: function() {
    store.currentFriend.set({_id: this.props.params.id});
    console.log(store.currentFriend);
    this.profileListener();
    store.currentFriend.on('change', this.profileListener);

    store.friendList.fetch({
      success: () => {
        this.setState({friends: store.friendList.toJSON()})
        console.log(this.state);
      }
    });
  },
  profileListener: function() {
    store.currentFriend.fetch({
      success: (resp) => {
        this.setState({user: store.currentFriend.toJSON()});
        console.log(this.state);
      }
    });
  }
});
