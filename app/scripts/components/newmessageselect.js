import React from 'react';
import {hashHistory} from 'react-router';

import Header from './header'
import FriendSelect from './friendselect';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      friendList: []
    }
  },
  componentWillMount: function() {
    if(!store.session.get('authtoken')){
      hashHistory.push('/login');
    }
  },
  render: function() {
    let friendList = this.state.friendList.map( (friend, i) => {
      return <FriendSelect info={friend} key={i}/>
    });
    return (
      <div className="select-friend">
        <Header/>
        <div className="recipient-window">
          <h4>Who are you going to message?</h4>
          {friendList}
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    if(store.friendList.toJSON().length) {
      let messageableFriends = store.friendList.toJSON();
      messageableFriends = messageableFriends.filter( (friend) => {
        if (friend._id === store.session.get('_id')) { return false } else { return true }
      });
      this.setState({friendList: messageableFriends});
    } else {
      store.session.friendSetup()
      .then( () => {
        let messageableFriends = store.friendList.toJSON();
        messageableFriends = messageableFriends.filter( (friend) => {
          if (friend._id === store.session.get('_id')) { return false } else { return true }
        });
        this.setState({friendList: messageableFriends});
      });
    }
  }
});
