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
      syllableDisplay: [''],
    }
  },
  render: function() {
    let themeClass = this.state.currentMessage.theme;
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
        <input type="button" value="Go Back" onClick={this.goBackFunction}/>
      </div>
    )
  },
  componentDidMount: function() {
    store.themeList.fetch().then( () => {
      let themeId = this.state.currentMessage.theme_id;
      let currentTheme = store.themeList.get(themeId);
      console.log(this.state.currentMessage.content);
      let sound = new Howl({src: currentTheme.get('timingArr')[(this.state.currentMessage.content.length - 1)].sound_url});
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
    //delete message option?
    hashHistory.push('/main');
  }
});
