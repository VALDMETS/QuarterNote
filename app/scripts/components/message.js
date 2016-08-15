import React from 'react';
import {hashHistory} from 'react-router';
import {Howl} from 'howler';
import store from '../store';

import Message from '../models/message';
import Theme from '../models/theme';

export default React.createClass({
  getInitialState: function() {
    return {
      currentMessage: [
        {theme: ''}
      ],
      syllableDisplay: [''],
    }
  },
  render: function() {
    let themeClass = this.state.currentMessage[0].theme;
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
    let currentMessage = new Message();
    currentMessage.fetch({
      data: {
        query: JSON.stringify({_id: this.props.params.id})
      },
      success: () => {
        console.log(currentMessage.toJSON());
        this.setState({currentMessage: currentMessage.toJSON()});
        let currentTheme = new Theme();
        currentTheme.fetch().then( () => {
          console.log(currentMessage.attributes[0].content);
          let sound = new Howl({src: currentTheme.attributes[0].timingArr[(currentMessage.attributes[0].content.length - 1)].sound_url});
          sound.play();
          sound.on('load', () => {
            let animationTiming = currentTheme.attributes[0].timingArr[(currentMessage.attributes[0].content.length - 1)].timing;
            animationTiming.forEach( (timer, i) => {
              setTimeout( () => {
                let newState = this.state.syllableDisplay;
                newState.push(currentMessage.attributes[0].content[i]);
                this.setState({
                  syllableDisplay: newState
                })
              }, timer)
            });
          });
        });
      }
    });


  },
  goBackFunction: function() {
    //delete message option?
    hashHistory.push('/main');
  }
});
