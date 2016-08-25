import Session from './models/session';
import Message from './models/message';

import FriendList from './collections/friendlist';
import NewMessages from './collections/newmessages';
import ThemeList from './collections/themelist';
import RequestList from './collections/requestlist';
import PointTotal from './collections/pointtotal';

export default {
  session: new Session(),
  friendList: new FriendList(),
  messageToBeSent: new Message(),
  newMessages: new NewMessages(),
  themeList: new ThemeList(),
  friendRequests: new RequestList(),
  hiddenRequests: new RequestList(),
  pendingRequests: new RequestList(),
  pointTotal: new PointTotal(),

  currentAudio: '',

  messageSentConfirmation: false,
  requestSentConfirmation: false,
  newAcceptedConfirmation: false,
  newUser: false,

  themeMetaInfo: [{
    key: 0,
    theme: 'speak',
    theme_id: '57b1e44e616900c708e8400c'
  }, {
    key: 1,
    theme: 'know',
    theme_id: '57bca116bfc43b0e64e144c1'
  }, {
    key: 2,
    theme: 'neon',
    theme_id: '57bdb8b7860f011015de8519'
  }, {
    key: 3,
    theme: 'fuji',
    theme_id: '4444'
  }, {
    key: 4,
    theme: 'zarathustra',
    theme_id: '57b91314e9ea451559128287'
  }],
  loginGreetings: [{
    button: 'I beg forgiveness',
    phrase: 'Nice try, but that didn\'t work.'
  }, {
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
  }],
  emptyPage: [{
    title: 'But hey,',
    phrase: 'Everyone is talking about you. And they\'re only saying nice things. Don\'t act so surprised.'
  }, {
    title: 'But hey,',
    phrase: 'You\'re great looking. And you\'ve got great intangible features as well. You\'re more than just a person, you\'re a force of nature.'
  }, {
    title: 'Did you know?',
    phrase: 'This app was coded in pitch blackness underneath an industrial paper shredding operation. We\'re committed to excellence.'
  }]
};
