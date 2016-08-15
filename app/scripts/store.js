import Session from './models/session';
import FriendList from './collections/friendlist';
import Message from './models/message';
import NewMessages from './collections/newmessages';
import ThemeList from './collections/themelist';

export default {
  session: new Session(),
  friendList: new FriendList(),
  messageToBeSent: new Message(),
  newMessages: new NewMessages(),
  themeList: new ThemeList()
};
