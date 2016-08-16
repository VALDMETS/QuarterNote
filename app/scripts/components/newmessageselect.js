import React from 'react';

import Header from './header'
import FriendSelect from './friendselect';

import store from '../store';

export default React.createClass({
  getInitialState: function() {
    return {
      friendList: []
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
          <h4>Who you gonna message?</h4>
          {friendList}
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    store.friendList.fetch().then( () => {
      store.friendList.remove(store.session.get('friend_id'));
      this.setState({friendList: store.friendList.toJSON()});
      console.log(this.state.friendList);
    });
  }
});
