import React from 'react';
import {hashHistory} from 'react-router';
import {Howl} from 'howler';
import store from '../store';

import Theme from '../models/theme';
import Message from '../models/message';

export default React.createClass({
  getInitialState: function() {
    return {
      syllableDisplay: [''],
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
            {syllableAnimation}
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
      store.messageToBeSent = new Message();
      // console.log(store.messageToBeSent);
      store.messageSentConfirmation = true;
      hashHistory.push(`/main`);
    });
  },
  goBackFunction: function() {
    hashHistory.push(`/newmessage/${store.messageToBeSent.get('recipient_id')}`);
  }
});
