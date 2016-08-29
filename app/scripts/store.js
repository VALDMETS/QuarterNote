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
    theme_id: '57c3be462aff92a136799b7a'
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
    phrase: 'Everyone is talking about you. And they\'re only saying nice things. Don\'t act so surprised, or you\'ll lose some of your mystique.'
  }, {
    title: 'But you know what?',
    phrase: 'You\'re great looking. And you\'ve got great intangibles as well. You\'re more than just a person, you\'re a force of nature. People would vote for you on important matters.'
  }, {
    title: 'Did you know?',
    phrase: 'This app was coded in pitch blackness underneath an industrial paper shredding operation. We\'re committed to excellence.'
  }, {
    title: 'But if you think about it,',
    phrase: 'If you had a new message every time you logged on, it would be less special. Absence makes the heart grow fonder.'
  }, {
    title: 'Did you know?',
    phrase: 'The more messages you send, the more points you get. The more messages you check, the more points you get. People can\'t stop talking about all of these points.'
  }, {
    title: 'Did you know?',
    phrase: 'You can earn accessories for your avatar by getting more points. Points are earned by sending messages. There is a lot of buzz about this.'
  }, {
    title: 'Did you know?',
    phrase: 'You can check your message before you send it and edit to make it more sing-songy. That is a real word.'
  }, {
    title: 'Calm down,',
    phrase: 'We\'ve all been there. Maybe send some new messages and people will reply. Life is full of challenges, and we all believe in you.'
  }, {
    title: 'Did you know?',
    phrase: 'You got a random profile picture when you signed up. The universe is full of random, uncontrollable events. But you can earn cool accessories, both on this app and in real life.'
  }, {
    title: 'Did you know?',
    phrase: 'Social media is the new regular media. Regular media is now old media, which means watching TV is basically like going to a museum.'
  }],
  profileBlurb: [{
    phrase: ' is new to the game. They haven\'t sent or received a lot of messages, but give them time. We are all rooting for them!',
    tag: 'Next Reward: Grasshopper Headband - 2000 points'
  }, {
    phrase: ' is just getting warmed up. Heated up. You should see some of the notes they\'ve sent - A++++ would read again. Great intangibles.',
    tag: 'Next Reward: Trucker Cap - 5000 points'
  }, {
    phrase: ' is hitting their stride. Look at that hat - are you jealous? A real hat? Acting like you\'re not jealous is worse than the act itself.',
    tag: 'Next Reward: Sharp Shades - 10,000 points'
  }, {
    phrase: ' has really surpassed all of our expectations. Wow. When you talk about making it, they really have made it. They are a force of nature.',
    tag: 'Next Reward: ??????? - 50,000 points'
  }, {
    phrase: ' is on top. Don\'t be discouraged by this - maybe you can be on top someday! But not the very top. That\'s already taken.',
    tag: 'Next Reward: ??????? - 1,000,000 points'
  }]
};
