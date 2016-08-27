import React from 'react';
import {hashHistory} from 'react-router';
import {Howl} from 'howler';

import settings from '../settings';
import store from '../store';

import Theme from '../models/theme';
import Message from '../models/message';
import PointEvent from '../models/pointevent';

export default React.createClass({
  getInitialState: function() {
    return {
      syllableDisplay: []
    }
  },
  componentWillMount: function() {
    if(!store.session.get('authtoken')){
      hashHistory.push('/login');
    }
  },
  render: function() {
    let themeClass = store.messageToBeSent.get('theme');
    let syllableAnimation = this.state.syllableDisplay.map((syllable, i) => {
      return <span key={i}>{syllable}</span>
    });
    return (
      <div className="message-placemat" ref="preview">
        <audio src="https://www.dropbox.com/s/fhe3n1y1n7z7i5m/speak1.mp3?dl=1" ref="audio" onPlay={this.playAnimation}/>
        <div className="message-window">
          <div className={themeClass}>
            <div className="theme-object">
              {syllableAnimation}
            </div>
            <div className="left-button">
              <input type="button" value="CONFIRM" onClick={this.confirmFunction}/>
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
    let theme_id = store.messageToBeSent.get('theme_id');
    let currentTheme = store.themeList.get(theme_id);
    store.currentAudio.play();
    store.currentAudio.on('load', () => {
      let animationTiming = currentTheme.get('timingArr')[(store.messageToBeSent.get('content').length - 1)].timing;
      animationTiming.forEach( (timer, i) => {
        setTimeout( () => {
          let newState = this.state.syllableDisplay;
          newState.push(store.messageToBeSent.get('content')[i]);
          this.setState({
            syllableDisplay: newState
          });
        }, timer);
      });
    });
  },
  confirmFunction: function() {
    store.messageToBeSent.save().
    then(() => {
      let newPoints = store.session.get('points') + store.messageToBeSent.get('points');
      let pointScore = new PointEvent();
      pointScore.save({
        recipient_id: store.session.get('_id'),
        points: store.messageToBeSent.get('points'),
        event_type: 'msg_sent'
      })
      store.messageToBeSent = new Message();
      store.messageSentConfirmation = true;
      store.currentAudio.fade(1,0,500);
      hashHistory.push(`/main`);
    });
  },
  goBackFunction: function() {
    store.currentAudio.fade(1,0,500);
    hashHistory.push(`/newmessage/${store.messageToBeSent.get('recipient_id')}`);
  },
  animateFunction: function() {
    console.log('wow wee got em');
  }
});
