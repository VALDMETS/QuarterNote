import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import $ from 'jquery';

import store from './store';
import settings from './settings';
import router from './components/router';

if(localStorage.getItem("user")) {
  let localInfo = JSON.parse(localStorage.getItem("user"));
  console.log(localInfo);
  store.session.set({
    _id: localInfo._id,
    username: localInfo.username,
    authtoken: localInfo.authtoken,
    img_url: localInfo.img_url
  });
  store.session.friendSetup();
}

$(document).ajaxSend(function(e, xhr, jqueryAjax){
  if (store.session.get('authtoken')) {
    xhr.setRequestHeader('Authorization', 'Kinvey ' + store.session.get('authtoken'));
  } else {
    xhr.setRequestHeader('Authorization', 'Basic ' + settings.basicAuth);
  }
});

ReactDOM.render(router, document.getElementById('container'));

// if(!store.session.get('authtoken')) {
//   hashHistory.push('/signup');
// }

// console.log(localStorage.getItem("user"));
