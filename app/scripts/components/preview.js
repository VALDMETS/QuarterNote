import React from 'react';
import {hashHistory} from 'react-router';
import {Howl} from 'howler';

import settings from '../settings';
import store from '../store';

import Theme from '../models/theme';
import Message from '../models/message';

export default React.createClass({
  getInitialState: function() {
    return {
      syllableDisplay: [],
      sound: {}
    }
  },
  render: function() {
    let themeClass = store.messageToBeSent.get('theme');
    let syllableAnimation = this.state.syllableDisplay.map((syllable, i) => {
      return <span key={i}>{syllable}</span>
    });
    return (
      <div className="message-placemat">
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
    store.themeList.fetch().then( () => {
      let theme_id = store.messageToBeSent.get('theme_id');
      let currentTheme = store.themeList.get(theme_id)
      let sound = new Howl({src: currentTheme.get('timingArr')[(store.messageToBeSent.get('content').length - 1)].sound_url});
      this.setState({sound: sound});
      sound.play();
      sound.on('load', () => {
        let animationTiming = currentTheme.get('timingArr')[(store.messageToBeSent.get('content').length - 1)].timing;
        animationTiming.forEach( (timer, i) => {
          setTimeout( () => {
            let newState = this.state.syllableDisplay;
            newState.push(store.messageToBeSent.get('content')[i]);
            this.setState({
              syllableDisplay: newState
            })
          }, timer)
        });
      });
    });
  },
  confirmFunction: function() {
    store.messageToBeSent.save().
    then(() => {
      let newPoints = store.session.get('points') + store.messageToBeSent.get('points');
      localStorage.setItem('user', JSON.stringify({
        username: store.session.get('username'),
        authtoken: store.session.get('authtoken'),
        img_url: store.session.get('img_url'),
        points: newPoints,
        _id: store.session.get('_id')
      }));
      store.session.save({points: newPoints},{url: `https://baas.kinvey.com/user/${settings.appKey}/${store.session.get('_id')}`});
      store.messageToBeSent = new Message();
      store.messageSentConfirmation = true;
      this.state.sound.fade(1,0,500);
      hashHistory.push(`/main`);
    });
  },
  goBackFunction: function() {
    this.state.sound.fade(1,0,500);
    hashHistory.push(`/newmessage/${store.messageToBeSent.get('recipient_id')}`);
  }
});
