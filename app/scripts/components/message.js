import React from 'react';
import {hashHistory} from 'react-router';
import {Howl} from 'howler';

import settings from '../settings';
import store from '../store';

import Message from '../models/message';
import Theme from '../models/theme';
import PointEvent from '../models/pointevent';

export default React.createClass({
  getInitialState: function() {
    return {
      currentMessage: store.newMessages.get(this.props.params.id).toJSON(),
      syllableDisplay: [],
    }
  },
  componentWillMount: function() {
    if(!store.session.get('authtoken')){
      hashHistory.push('/login');
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
    let themeId = this.state.currentMessage.theme_id;
    let currentTheme = store.themeList.get(themeId);
    store.currentAudio.play();
    store.currentAudio.on('load', () => {
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
  },
  goBackFunction: function() {
    let pointScore = new PointEvent();
    pointScore.save({
      recipient_id: store.session.get('_id'),
      points: store.newMessages.get(this.props.params.id).get('points'),
      event_type: 'msg_received'
    });
    store.newMessages.get(this.props.params.id).destroy();
    store.newMessages.remove(this.props.params.id);
    store.newMessages.trigger('update');
    store.currentAudio.fade(1,0,500);
    hashHistory.push('/main');
  },
  replyFunction: function() {
    let replyTarget = store.friendList.where({username: this.state.currentMessage.sender});
    replyTarget = replyTarget[0].toJSON();
    let pointScore = new PointEvent();
    pointScore.save({
      recipient_id: store.session.get('_id'),
      points: store.newMessages.get(this.props.params.id).get('points'),
      event_type: 'msg_received'
    });
    store.newMessages.get(this.props.params.id).destroy();
    store.newMessages.remove(this.props.params.id);
    store.newMessages.trigger('update');
    store.currentAudio.fade(1,0,500);
    hashHistory.push(`/newmessage/${replyTarget._id}`);
  },
  escapeFunction: function() {
    store.currentAudio.fade(1,0,500);
    hashHistory.push('/main')
  },
});
