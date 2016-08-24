import React from 'react';
import {hashHistory} from 'react-router';

import Friend from '../models/friend';
import Message from '../models/message';
import Header from './header';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      currentFriend: [],
      themeKey: 0,
      error: false
    }
  },
  render: function() {
    let messageTitle = <h4>Messaging {this.state.currentFriend.username}</h4>
    if(this.state.error) {
      messageTitle = <h4 className="error">Sorry, try a shorter message!</h4>
    }
    return (
      <div className="new-message">
        <Header/>
        {messageTitle}
        <form onSubmit={this.submitFunction}>
          <input type="text" ref="message" placeholder="Message"/>
          <section className="theme-list">
            <h6>Choose Theme</h6>
            <input type="button" ref="speak" className="speak active" onClick={this.speakFunction} value="CONSOLE"/>
            <input type="button" ref="know" className="know" onClick={this.knowFunction} value="KNOWLEDGE"/>
            <input type="button" ref="neon" className="neon" onClick={this.neonFunction} value="NEON"/>
            <input type="button" ref="fuji" className="fuji" onClick={this.fujiFunction} value="FUJI"/>
            <input type="button" ref="zara" className="zara" onClick={this.zaraFunction} value="ZARATHUSTRA"/>
          </section>
          <input type="submit" value="Send it!"/>
        </form>
        {this.props.children}
      </div>
    )
  },
  componentDidMount: function () {
    if(store.friendList.toJSON().length) {
      this.setState({currentFriend: store.friendList.get(this.props.params.id).toJSON()});
    } else {
      store.session.friendSetup()
        .then( () => {
          this.setState({currentFriend: store.friendList.get(this.props.params.id).toJSON()
        });
      });
    }
  },
  submitFunction: function(e) {
    e.preventDefault();
    let content = store.messageToBeSent.syllabizer(this.refs.message.value);
    if (content.length < 15) {
      this.setState({error: false});
      store.messageToBeSent.set({
        sender: store.session.get('username'),
        recipient_id: this.props.params.id,
        content: content,
        theme: store.themeMetaInfo[this.state.themeKey].theme,
        theme_id: store.themeMetaInfo[this.state.themeKey].theme_id,
        timestamp: new Date()
      });
      hashHistory.push(`/newmessage/${this.props.params.id}/preview`);
    } else {
      this.setState({error: true});
    }
  },
  speakFunction: function() {
    this.refs.speak.className = "speak active";
    this.refs.know.className = "know";
    this.refs.neon.className = "neon";
    this.refs.fuji.className = "fuji";
    this.refs.zara.className = "zara";
    this.setState({themeKey: 0});
  },
  knowFunction: function() {
    this.refs.speak.className = "speak";
    this.refs.know.className = "know active";
    this.refs.neon.className = "neon";
    this.refs.fuji.className = "fuji";
    this.refs.zara.className = "zara";
    this.setState({themeKey: 1});
  },
  neonFunction: function() {
    this.refs.speak.className = "speak";
    this.refs.know.className = "know";
    this.refs.neon.className = "neon active";
    this.refs.fuji.className = "fuji";
    this.refs.zara.className = "zara";
    this.setState({themeKey: 2});
  },
  fujiFunction: function() {
    this.refs.speak.className = "speak";
    this.refs.know.className = "know";
    this.refs.neon.className = "neon";
    this.refs.fuji.className = "fuji active";
    this.refs.zara.className = "zara";
    this.setState({themeKey: 3});
  },
  zaraFunction: function() {
    this.refs.speak.className = "speak";
    this.refs.know.className = "know";
    this.refs.neon.className = "neon";
    this.refs.fuji.className = "fuji";
    this.refs.zara.className = "zara active";
    this.setState({themeKey: 4});
  },
});
