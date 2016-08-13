import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';

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

let string = "Wow what a cooel maessage";

console.log(syllablizer(string));

function syllablizer (string) {
  string = string.toLowerCase();
  let arr = string.split(' ');
  arr = arr.map(function(word){
    return word + ' ';
  })
  arr = arr.map(function(word){
    let vowelIndex = [];
    let wordArr = word.split('');
    wordArr.forEach(function(letter, i){
      if (letter==='a' || letter==='e' || letter==='i' || letter==='o' || letter === 'u') {
        // console.log('v');
        vowelIndex.push(i)
      }
    });
    let vowelClusters = vowelIndex.map(function(vowelSpot, i) {
      return wordArr[vowelSpot];
    });
    for (var i = 0; i < vowelIndex.length; i++) {
      if(vowelIndex[i+1]-vowelIndex[i] === 1) {
        if(vowelIndex[i+2]-vowelIndex[i+1] === 1) {
          vowelClusters[i] = (word[vowelIndex[i]]+word[vowelIndex[i+1]]+word[vowelIndex[i+2]]);
          vowelClusters[i+1] = '';
          vowelClusters[i+2] = '';
          i+=2;
        } else {
          vowelClusters[i] = (word[vowelIndex[i]]+word[vowelIndex[i+1]]);
          vowelClusters[i+1] = '';
          i++;
        }
      }
    }
    vowelClusters = _.compact(vowelClusters);
    if (vowelClusters.length <= 1) {
      return word
    } else {
      return vowelClusters;
      // for (var i = 0; i <= vowelIndex[0]; i++) {
      //   syllableArr.push(word[i]);
      // }
      // if (vowelIndex[1]-vowelIndex[0] === 1) {
      //   syllableArr.push(word[vowelIndex[1]]);
      // }
      // if
      // syllableArr = syllableArr.join('');
      // return syllableArr;
    }
  });
  return _.flatten(arr);
}
