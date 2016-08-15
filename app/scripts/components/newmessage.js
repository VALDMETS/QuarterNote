import React from 'react';

import Friend from '../models/friend';
import Message from '../models/message';
import Header from './header';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      name: ''
    }
  },
  render: function() {
    let messageTitle = <h4>New Quarter Note to {this.state.name}</h4>
    return (
      <div>
        <Header/>
        {messageTitle}
        <form onSubmit={this.submitFunction}>
          <input type="text" ref="message" placeholder="Your New Quarter Note"/>
          <input type="submit" value="Send it!"/>
        </form>
      </div>
    )
  },
  componentDidMount: function() {
    let recipientName = new Friend({_id: this.props.params.id});
    recipientName.fetch({
      success: () => {
        this.setState({name: recipientName.get('username')});
      }
    })
  },
  submitFunction: function(e) {
    e.preventDefault();
    let content = store.currentMessage.syllabizer(this.refs.message.value);
    store.currentMessage.set({
      sender: store.session.get('username'),
      recipient_id: this.props.params.id,
      content: content,
      theme: 'speak'
    });

    console.log(store.currentMessage);

    // Call this on confirmation page, actually
    // message.save().then(() => {console.log('wow!!');});

  }
});
