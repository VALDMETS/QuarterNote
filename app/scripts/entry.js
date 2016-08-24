import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import $ from 'jquery';

import store from './store';
import settings from './settings';
import router from './components/router';

$(document).ajaxSend(function(e, xhr, jqueryAjax){
  // if (localStorage.getItem('user')) {
  if (store.session.get('authtoken')) {
    // xhr.setRequestHeader('Authorization', 'Kinvey ' + JSON.parse(localStorage.getItem('user')).authtoken);
    xhr.setRequestHeader('Authorization', 'Kinvey ' + store.session.get('authtoken'));
  } else {
    xhr.setRequestHeader('Authorization', 'Basic ' + settings.basicAuth);
  }
});

if(localStorage.getItem("user")) {
  store.session.localStoragePull();
  store.session.friendSetup();
}

ReactDOM.render(router, document.getElementById('container'));
