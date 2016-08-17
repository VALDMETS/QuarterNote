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
  themeList: new ThemeList(),

  messageSentConfirmation: false,
  themeMetaInfo: [{
    key: 0,
    theme: 'speak',
    theme_id: '57b1e44e616900c708e8400c'
  }, {

  }],


  loginGreetings: [{
    button: 'Let\'s Party',
    phrase: 'There\'s a party on my phone and everyone\'s invited.'
  }, {
    button: 'I Believe in Magic',
    phrase: 'If phone apps are spells, then consider this one a level 9 empowered fireball.'
  }, {
    button: 'I Think You\'re Right',
    phrase: '\"With so many ways to talk, QuarterNote has replaced all other forms of communication for me.\" -- You, soon'
  }, {
    button: 'You Know Me Well',
    phrase: 'The smart phone is a great invention. You can be outside, pretending to take in the world. But you\'re in a different world. A cyber-world.'
  }]
};
