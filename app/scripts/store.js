import Session from './models/session';
import FriendList from './collections/friendlist';
import Message from './models/message';

export default {
  session: new Session(),
  friendList: new FriendList(),
  messageToBeSent: new Message()
};
