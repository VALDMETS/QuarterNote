import React from 'react';
import {hashHistory} from 'react-router';
import {Howl} from 'howler';
import store from '../store';

import Message from '../models/message';
import Theme from '../models/theme';

export default React.createClass({
  getInitialState: function() {
    return {
      currentMessage: store.newMessages.get(this.props.params.id).toJSON(),
      syllableDisplay: [],
      sound: {}
    }
  },
  render: function() {
    let themeClass = this.state.currentMessage.theme;
    let syllableAnimation = this.state.syllableDisplay.map((syllable, i) => {
      return <span key={i}>{syllable}</span>
    });
    return (
      <div className="message-placemat">
        <input type="button" value="X" onClick={this.escapeFunction}/>
        <div className="message-window">
          <div className={themeClass}>
            <div className="theme-object">
              {syllableAnimation}
            </div>
            <div className="left-button">
              <input type="button" value="REPLY" onClick={this.replyFunction}/>
            </div>
            <div className="right-button">
              <input type="button" value="GO BACK" onClick={this.goBackFunction}/>
            </div>
          </div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    store.themeList.fetch().then( () => {
      let themeId = this.state.currentMessage.theme_id;
      let currentTheme = store.themeList.get(themeId);
      let sound = new Howl({src: currentTheme.get('timingArr')[(this.state.currentMessage.content.length - 1)].sound_url});
      this.setState({sound: sound});
      sound.play();
      sound.on('load', () => {
        let animationTiming = currentTheme.get('timingArr')[(this.state.currentMessage.content.length - 1)].timing;
        animationTiming.forEach( (timer, i) => {
          setTimeout( () => {
            let newState = this.state.syllableDisplay;
            newState.push(this.state.currentMessage.content[i]);
            this.setState({
              syllableDisplay: newState
            })
          }, timer)
        });
      });
    });
  },
  goBackFunction: function() {
    store.newMessages.get(this.props.params.id).destroy();
    store.newMessages.remove(this.props.params.id);
    store.newMessages.trigger('update');
    this.state.sound.fade(1,0,500);
    hashHistory.push('/main');
  },
  replyFunction: function() {
    let replyTarget = store.friendList.where({username: this.state.currentMessage.sender});
    replyTarget = replyTarget[0].toJSON();
    store.newMessages.get(this.props.params.id).destroy();
    store.newMessages.remove(this.props.params.id);
    store.newMessages.trigger('update');
    this.state.sound.fade(1,0,500);
    hashHistory.push(`/newmessage/${replyTarget._id}`);
  },
  escapeFunction: function() {
    this.state.sound.fade(1,0,500);
    hashHistory.push('/main')
  },
});
