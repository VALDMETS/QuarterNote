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
  store.themeList.fetch();
}

ReactDOM.render(router, document.getElementById('container'));

// var snd = new Audio("https://www.dropbox.com/s/fhe3n1y1n7z7i5m/speak1.mp3?dl=1"); // buffers automatically when created
// snd.play();
// snd.buffered = function (){
//   console.log('bloop');
// }

// let sound = document.getElementById('audio');
// let button = document.getElementById('button');
// button.addEventListener('click', function () {
//   console.log('wow');
//   sound.src="https://www.dropbox.com/s/fhe3n1y1n7z7i5m/speak1.mp3?dl=1";
//   sound.play();
//
// });
//
// this.refs.blah.
//
// let audio = this.refs.blah
