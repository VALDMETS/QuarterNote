import React from 'react';

import Header from './header'
import FriendSelect from './friendselect';

import store from '../store';

export default React.createClass({
  getInitialState: function() {

    // disallows user to message self by removing them from friend collection on this profile-page
    
    let messageableFriends = store.friendList.toJSON();
    console.log(messageableFriends);
    messageableFriends = messageableFriends.filter( (friend) => {
      if (friend._id === store.session.get('_id')) { return false } else { return true }
    })
    return {
      friendList: messageableFriends
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
  }
});
