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
    let friendRequests = this.state.friendRequests.map( (request, i) => {
      return <FriendRequest info={request} key={i}/>
    });
    let newMessages = this.state.messages.map( (message, i) => {
      return <MessageAlert info={message} key={i}/>
    });
    return (
      <div className="main-page">
        <Header/>
        <div className="alert-notifications">
          <h2>Welcome, {store.session.get('username')}</h2>
          {messageSentConfirmation}
          {requestSentConfirmation}
          {friendRequests}
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
