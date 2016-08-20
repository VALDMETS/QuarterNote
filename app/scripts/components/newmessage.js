import React from 'react';
import {hashHistory} from 'react-router';

import Friend from '../models/friend';
import Message from '../models/message';
import Header from './header';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      currentFriend: store.friendList.get(this.props.params.id).toJSON()
    }
  },
  render: function() {
    let messageTitle = <h4>Messaging {this.state.currentFriend.username}</h4>
    return (
      <div className="new-message">
        <Header/>
        {messageTitle}
        <form onSubmit={this.submitFunction}>
          <input type="text" ref="message" placeholder="Message"/>
          <section className="theme-list">
            <h6>Choose Theme</h6>
            <input type="button" ref="speak" className="speak active" onClick={this.speakFunction} value="CONSOLE"/>
            <input type="button" ref="fuji" className="fuji" onClick={this.fujiFunction} value="FUJI"/>
            <input type="button" ref="zara" className="zara" onClick={this.fujiFunction} value="ZARATHUSTRA"/>
          </section>
          <input type="submit" value="Send it!"/>
        </form>
        {this.props.children}
      </div>
    )
  },
  componentDidMount: function() {
    // let recipientName = new Friend({_id: this.props.params.id});
    // recipientName.fetch({
    //   success: () => {
    //     this.setState({name: recipientName.get('username')});
    //   }
    // })
  },
  submitFunction: function(e) {
    e.preventDefault();
    console.log(store.themeList);
    let content = store.messageToBeSent.syllabizer(this.refs.message.value);
    store.messageToBeSent.set({
      sender: store.session.get('username'),
      recipient_id: this.props.params.id,
      content: content,
      theme: store.themeMetaInfo[0].theme,
      theme_id: store.themeMetaInfo[0].theme_id
    });
    console.log(store.messageToBeSent);
    hashHistory.push(`/newmessage/${this.props.params.id}/preview`);
  }
});
