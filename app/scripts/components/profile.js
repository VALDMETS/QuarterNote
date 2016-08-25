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
    if(this.state.user.img_url) {
      profilePic = <img src={this.state.user.img_url} />
    }
    let friendPics;
    friendPics = this.state.friends.map( (friend,i) => {
      return <FriendWidget data={friend} key={i}/>
    });
    let points;
    let profileHat;
    if (this.state.points > 0 && this.state.points < 2000) {
      points = this.state.points;
      //add hat thing here
    } else if (this.state.points > 10000) {
      profileHat = <img className="profile-hat" src="assets/profile/crown.png"/>
      points = (this.state.points/1000).toFixed(0) + 'K';
    }
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
      console.log(points);
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
    console.log(currentProfile.get('_id'));
    this.pointUpdater(this.props.params.id)
  }
});
