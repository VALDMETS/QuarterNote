import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import router from './components/router';

$(document).ajaxSend(function(e, xhr, jqueryAjax){
  if (store.session.get('authtoken')) {
    xhr.setRequestHeader('Authorization', 'Kinvey ' + store.session.get('authtoken'));
  } else {
    xhr.setRequestHeader('Authorization', 'Basic ' + settings.basicAuth);
  }
});

ReactDOM.render(router, document.getElementById('container'));
