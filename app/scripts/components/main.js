import React from 'react';

import store from '../store';
import NewMessages from '../collections/newmessages';

import Header from './header';
import MessageAlert from './messagealert';

export default React.createClass({
  getInitialState: function() {
    return {
      messages: []
    }
  },
  render: function() {
    let newMessages = this.state.messages.map( (message, i) => {
      return <MessageAlert info={message} key={i}/>
    });
    return (
      <div className="main-page">
        <Header/>
        <h2>Welcome, {store.session.get('username')}</h2>
        {newMessages}
      </div>
    )
  },
  componentDidMount: function() {
    let newMessages = new NewMessages();
    newMessages.fetch({
      data: {
        query: JSON.stringify({recipient_id: store.session.get('friend_id')})
      }
    }).then( () => {
      console.log(newMessages.toJSON());
      this.setState({messages: newMessages.toJSON()});
    });

  },
});
