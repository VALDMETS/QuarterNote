import React from 'react';

import store from '../store';
import NewMessages from '../collections/newmessages';

import Header from './header';
import MessageAlert from './messagealert';
import FriendRequest from './friendrequest';

export default React.createClass({
  getInitialState: function() {
    return {
      messages: store.newMessages.toJSON(),
      friendRequests: store.friendRequests.toJSON(),
      messageSentConfirmation: store.messageSentConfirmation,
      requestSentConfirmation: store.requestSentConfirmation,
      newAcceptedConfirmation: store.newAcceptedConfirmation,
      interval: window.setInterval( () => {
        store.newMessages.fetch({
          data: {
            query: JSON.stringify({recipient_id: store.session.get('_id')})
          }
        });
      }, 2000)
    }
  },
  render: function() {
    let messageSentConfirmation;
    if (this.state.messageSentConfirmation === true) {
      messageSentConfirmation = <div className="message-sent"><p>Message Sent!</p></div>
    }
    let requestSentConfirmation;
    if (this.state.requestSentConfirmation === true) {
      requestSentConfirmation = <div className="message-sent"><p>Friend Request Sent!</p></div>
    }
    let newAcceptedConfirmation;
    if (this.state.newAcceptedConfirmation === true) {
      newAcceptedConfirmation = <div className="message-sent"><p>New Friend Accepted!</p></div>
    }
    let friendRequests = this.state.friendRequests.map( (request, i) => {
      return <FriendRequest info={request} key={i}/>
    });
    let newMessages = this.state.messages.map( (message, i) => {
      return <MessageAlert info={message} key={i}/>
    });
    let blankPage;
    if (!friendRequests.length && !newMessages.length) {
      let randInt = Math.floor(Math.random()*3);
      blankPage = <div className="misc-message"><span>No New Messages</span><h6>{store.emptyPage[randInt].title}</h6><p>{store.emptyPage[randInt].phrase}</p></div>
      if (store.newUser) {
        blankPage = (
          <div className="misc-message">
            <span>No New Messages</span>
            <h6>Welcome to QuarterNote!</h6>
            <p>So kind of you to join us. You're already friends with our benevolent dictator, VALDMETS, but you can find more friends using the menu to the top left.</p>
            <p>You can also play around with message themes before sending them, which is fun in itself. Cool!</p>
          </div>
        )
      }
    }
    return (
      <div className="main-page">
        <Header/>
        <div className="alert-notifications">
          <h2>Welcome, {store.session.get('username')}</h2>
          {messageSentConfirmation}
          {requestSentConfirmation}
          {newAcceptedConfirmation}
          {friendRequests}
          {blankPage}
        </div>
        <div className="alert-box">
          {newMessages}
        </div>
        {this.props.children}
      </div>
    )
  },
  componentDidMount: function() {
    if(!store.newMessages.length) {
      store.newMessages.fetch({
        data: {
          query: JSON.stringify({recipient_id: store.session.get('_id')})
        }
      });
    }
    store.newMessages.on('update', this.messageListener);
    store.friendRequests.on('update', this.messageListener);
  },
  componentWillUnmount: function() {
    clearInterval(this.state.interval);
    store.messageSentConfirmation = false;
    store.requestSentConfirmation = false;
    store.newAcceptedConfirmation = false;
    store.newMessages.off('update', this.messageListener);
    if(store.friendRequests) {
      store.friendRequests.off('update', this.messageListener);
    }
  },
  messageListener: function() {
    this.setState({messages: store.newMessages.toJSON()});
    this.setState({friendRequests: store.friendRequests.toJSON()});
  }
});
