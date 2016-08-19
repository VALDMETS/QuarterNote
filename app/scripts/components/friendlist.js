import React from 'react';
import $ from 'jquery';

import Header from './header'
import FriendSearch from './friendsearch';

import FriendList from '../collections/friendlist';
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
        <div className="list-window">
          <h4>Your Friends</h4>
          {friendList}
        </div>
        <form onSubmit={this.submitFunction}>
          <h4>Find a new friend!</h4>
          <input type="text" ref="searchname" placeholder="Name Search"/>
          <input type="submit" value="FIND"/>
        </form>
      </div>
    )
  },
  submitFunction: function(e) {
    e.preventDefault();
    let friendSearch = new FriendList();
    friendSearch.fetch({
      data: {
        // query: JSON.stringify({"username": this.refs.searchname.value})
        query: JSON.stringify({"username":{"$regex":("^.+"+this.refs.searchname.value)+"|"+("^"+this.refs.searchname.value)}})
      },
    });
    console.log(friendSearch);
  }
});
