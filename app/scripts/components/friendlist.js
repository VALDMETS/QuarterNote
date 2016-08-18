import React from 'react';

import Header from './header'
import FriendSearch from './friendsearch';

import store from '../store';

export default React.createClass({
  getInitialState: function() {

    // disallows user to search/friend self by removing them from friend collection on this profile-page

    let searchableFriends = store.friendList.toJSON();
    searchableFriends = searchableFriends.filter( (friend) => {
      if (friend._id === store.session.get('_id')) { return false } else { return true }
    })
    return {
      friendList: searchableFriends
    }
  },
  render: function() {
    let friendList = this.state.friendList.map( (friend, i) => {
      return <FriendSearch info={friend} key={i}/>
    });
    return (
      <div className="search-friend">
        <Header/>
        <div className="search-window">
          <h4>Your Friends</h4>
          {friendList}
        </div>
      </div>
    )
  }
});
