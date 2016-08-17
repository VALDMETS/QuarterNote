import React from 'react';

import store from '../store';
import NewMessages from '../collections/newmessages';

import Header from './header';
import MessageAlert from './messagealert';

export default React.createClass({
  getInitialState: function() {
    return {
      messages: store.newMessages.toJSON(),
      messageSentConfirmation: store.messageSentConfirmation
    }
  },
  render: function() {
    let messageSentConfirmation;
    if (this.state.messageSentConfirmation === true) {
      messageSentConfirmation = <div className="message-sent"><p>Message Sent!</p></div>
    }
    let newMessages = this.state.messages.map( (message, i) => {
      return <MessageAlert info={message} key={i}/>
    });
    return (
      <div className="main-page">
        <Header/>
        <div className="alert-notifications">
          <h2>Welcome, {store.session.get('username')}</h2>
          {messageSentConfirmation}
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
  },
  componentWillUnmount: function() {
    store.messageSentConfirmation = false;
    store.newMessages.off('update', this.messageListener);
  },
  messageListener: function() {
    this.setState({messages: store.newMessages.toJSON()});
  }
});
