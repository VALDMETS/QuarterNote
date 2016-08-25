import React from 'react';
import moment from 'moment';
import {hashHistory} from 'react-router';

import store from '../store';
export default React.createClass({
  render: function() {
    let timestampFormat = 'from ' + moment(this.props.info.timestamp).fromNow();
    return (
      <div onClick={this.clickFunction} className="new-message-alert">
        <div className="alert-color"/>
        <p>New message from {this.props.info.sender}!</p>
        <span>{timestampFormat}</span>
      </div>
    )
  },
  clickFunction: function() {
    // let theme_id = store.messageToBeSent.get('theme_id');
    // let currentTheme = store.themeList.get(theme_id);
    let currentTheme = store.themeList.get(this.props.info.theme_id)
    let content = this.props.info.content;
    console.log(currentTheme);
    console.log(content);
    store.currentAudio = new Howl ({
      buffer: true,
      html5: true,
      src: currentTheme.get('timingArr')[(content.length - 1)].sound_url
    });
    hashHistory.push(`/main/message/${this.props.info._id}`)
  }
});
