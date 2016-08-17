import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';
import $ from 'jquery';

import store from './store';
import settings from './settings';
import router from './components/router';



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
