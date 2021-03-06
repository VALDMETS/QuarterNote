import React from 'react';
import {hashHistory} from 'react-router';
import $ from 'jquery';

import Header from './header'
import FriendSearch from './friendsearch';

import FriendList from '../collections/friendlist';
import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      title: 'Your Friends',
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
      return <FriendSearch info={friend} key={i}/>
    });
    return (
      <div className="search-friend">
        <Header/>
        <div className="list-window">
          <h4>{this.state.title}</h4>
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
  componentDidMount: function() {
    if(store.friendList.toJSON().length) {
      let searchableFriends = store.friendList.toJSON();
      searchableFriends = searchableFriends.filter( (friend) => {
        if (friend._id === store.session.get('_id')) { return false } else { return true }
      });
      this.setState({friendList: searchableFriends});
    } else {
      store.session.friendSetup().then( () => {
        let searchableFriends = store.friendList.toJSON();
        searchableFriends = searchableFriends.filter( (friend) => {
          if (friend._id === store.session.get('_id')) { return false } else { return true }
        })
        this.setState({friendList: searchableFriends});
      });
    }
  },
  submitFunction: function(e) {
    e.preventDefault();
    let friendSearch = new FriendList();
    console.log(this.refs.searchname.value);
    let upperCaseString = this.refs.searchname.value.toUpperCase();
    console.log(upperCaseString);
    friendSearch.fetch({
      data: {
        query: JSON.stringify({"username":{"$regex":("^.+"+upperCaseString)+"|"+("^"+upperCaseString)}})
      },
      success: (resp) => {
        console.log(resp);
        let results = friendSearch.toJSON();
        let hiddenIds = store.hiddenRequests.map( (request) => {
          return request.get('recipient_id')
        });
        results = results.filter( (entry) => {
          if (store.friendList.get(entry._id) || hiddenIds.indexOf(String(entry._id)) !== -1) {
            return false
          } else {
            return true
          }
        });
        this.setState({friendList: results, title: 'Search Results'});
      }
    });
  }
});
