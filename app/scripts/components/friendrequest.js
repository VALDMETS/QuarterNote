import React from 'react';
import moment from 'moment';
import {hashHistory} from 'react-router';

import store from '../store';

export default React.createClass({
  render: function() {
    return (
      <div className="friend-request" onClick={this.clickFunction}>
        <div className="alert-color"/>
        <p>{this.props.info.requestor} wants to be friends!</p>
        <span>Click here to respond!</span>
      </div>
    )
  },
  clickFunction: function() {
    store.session.requestConfirm(this.props.info);
  }
});
