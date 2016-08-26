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
      points: 0
    }
  },
  render: function() {
    let profilePic;
    let friendPics;
    if(this.state.user.img_url) {
      profilePic = <img src={this.state.user.img_url} />
    }
    friendPics = this.state.friends.map( (friend,i) => {
      if (i < 7) {
        return <FriendWidget data={friend} key={i}/>
      }
    });

    let points = this.state.points;
    let profileHat;
    let description;
    let rankTag;
    let profileIndex = 0;
    if (this.state.points >= 2000 && this.state.points < 5000) {
      profileHat = <img className="profile-hat" src="assets/profile/headband.png"/>
      profileIndex = 1;
    } else if (this.state.points >= 5000 && this.state.points < 10000) {
      profileHat = <img className="profile-hat" src="assets/profile/trucker.png"/>
      profileIndex = 2;
    } else if (this.state.points >= 10000 && this.state.points < 50000) {
      points = (this.state.points/1000).toFixed(0) + 'K';
      profileHat = <img className="profile-hat" src="assets/profile/shades.png"/>
      profileIndex = 3;
    } else if (this.state.points >= 50000 && this.state.points < 1000000) {
      points = (this.state.points/1000).toFixed(0) + 'K';
      profileHat = <img className="profile-hat" src="assets/profile/crown.png"/>
      profileIndex = 4;
    }
    description = store.profileBlurb[profileIndex].phrase;
    rankTag = store.profileBlurb[profileIndex].tag;

    let messageButton;
    if (store.session.get('_id') !== this.props.params.id) {
      let buttonVal = `Message ${this.state.user.username}!`;
      messageButton = <input type="button" value={buttonVal} onClick={this.newMessage}/>
    }

    return (
      <div className="profile-page">
        <Header/>
        <div className="point-container">
          <h5>SCORE</h5>
          <span>{points}</span>
        </div>
        <section className="left-side">
          <h2>{this.state.user.username}</h2>
          <div className="profile-pic">
            {profileHat}
            {profilePic}
          </div>
          {messageButton}
        </section>
        <section className="right-side">
          <p className="sect1">{this.state.user.username}{description}</p>
          <p className="sect2">{rankTag}</p>
        </section>
        <section className="friend-list">
          <h5>Friends</h5>
          {friendPics}
        </section>
      </div>
    )
  },
  componentDidMount: function() {
    if(store.friendList.toJSON().length) {
      this.buildContent();
    } else {
      store.session.friendSetup().then( () => {
        this.buildContent();
      });
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if(this.props.params.id !== nextProps.params.id) {
      this.profileUpdater(nextProps.params.id)
      this.pointUpdater(nextProps.params.id);
    }
  },
  profileUpdater: function(id) {
    let currentProfile = store.friendList.get(id);
    this.setState({user: currentProfile.toJSON()});
  },
  pointUpdater: function(id) {
    let currentProfile = store.friendList.get(id);
    store.pointTotal.fetch({
      data: {query: JSON.stringify({recipient_id: currentProfile.get('_id')})}
    }).then( () => {
      let points = store.pointTotal.toJSON();
      points = points.reduce( (pointsSoFar, pointModel) => {
        pointsSoFar = pointsSoFar + pointModel.points;
        return pointsSoFar;
      }, 0)
      this.setState({points: points});
    });
  },
  newMessage: function() {
    let messageUrl = '/newmessage/' + this.props.params.id;
    hashHistory.push(messageUrl);
  },
  buildContent: function() {
    let currentProfile = store.friendList.get(this.props.params.id);
    this.setState({
      user: {
        username: currentProfile.get('username'),
        img_url: currentProfile.get('img_url')
      }
    });
    let messageableFriends = store.friendList.toJSON();
    messageableFriends = messageableFriends.filter( (friend) => {
      if (friend._id === store.session.get('_id')) { return false } else { return true }
    })
    this.setState({friends: messageableFriends});
    this.pointUpdater(this.props.params.id)
  }
});
