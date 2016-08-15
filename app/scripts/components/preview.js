import React from 'react';
import {Howl} from 'howler';
import store from '../store';

import Theme from '../models/theme';

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
          </div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    let currentTheme = new Theme();
    currentTheme.fetch().then( () => {
      let sound = new Howl({src: currentTheme.attributes[0].timingArr[(store.messageToBeSent.get('content').length - 1)].sound_url});
      sound.play();
      sound.on('load', () => {
        let animationTiming = currentTheme.attributes[0].timingArr[(store.messageToBeSent.get('content').length - 1)].timing;
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
  }
});
