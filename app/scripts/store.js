import Session from './models/session';
import FriendList from './collections/friendlist';
import Friend from './models/friend';

export default {
  session: new Session(),
  friendList: new FriendList(),
  currentFriend: new Friend()
};
