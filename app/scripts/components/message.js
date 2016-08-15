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
    // let themeClass = this.state.currentMessage[0].theme;
    console.log(this.state.currentMessage.theme);
    let themeClass = this.state.currentMessage.theme;
    let syllableAnimation = this.state.syllableDisplay.map((syllable, i) => {
      // console.log('wow');
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

    let currentTheme = new Theme();
    currentTheme.fetch().then( () => {
      console.log(this.state.currentMessage.content);
      let sound = new Howl({src: currentTheme.attributes[0].timingArr[(this.state.currentMessage.content.length - 1)].sound_url});
      sound.play();
      sound.on('load', () => {
        let animationTiming = currentTheme.attributes[0].timingArr[(this.state.currentMessage.content.length - 1)].timing;
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
