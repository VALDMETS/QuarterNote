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

let string = "I can see clearly now the rain is gone";

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
        vowelIndex.push(i);
      } else if (letter==='y' && i === word.length-2) {
        vowelIndex.push(i);
      }
    });
    //right so far
    let vowelClusters = vowelIndex.map(function(vowelSpot, i) {
      return wordArr[vowelSpot];
    });
    for (var i = 0; i < vowelIndex.length; i++) {
      if (vowelIndex[i+1]-vowelIndex[i] === 1) {
        if (vowelIndex[i+2]-vowelIndex[i+1] === 1) {
          if (vowelIndex[i+3]-vowelIndex[i+2] === 1) {
            vowelClusters = [];
            i = vowelIndex.length;
          }
          vowelClusters[i] = (word[vowelIndex[i]]+word[vowelIndex[i+1]]+word[vowelIndex[i+2]]);
          vowelClusters[i+1] = '';
          vowelClusters[i+2] = '';
          vowelIndex.splice(i+1, 2);
          // console.log(vowelIndex);
          // if (vowelIndex.length - i === 2) {
          //   i+=2;
          // }
        } else {
          vowelClusters[i] = (word[vowelIndex[i]]+word[vowelIndex[i+1]]);
          vowelClusters[i+1] = '';
          vowelIndex.splice(i+1, 1);
          // console.log(vowelIndex);
          // if (vowelIndex.length - i === 1) {
          //   i++;
          // }
        }
      }
    }
    // console.log(vowelClusters);
    vowelClusters = _.compact(vowelClusters);
    if(vowelClusters.length > vowelIndex.length) {
      vowelClusters.pop();
    }
    // console.log(word.length);
    // console.log(vowelIndex[vowelIndex.length-1]);
    if (vowelIndex[vowelIndex.length-1] === word.length-2) {
      if(vowelClusters[vowelClusters.length-1] === 'e') {
        vowelClusters.pop();
        vowelIndex.pop();
      }
    }
    if (vowelClusters.length <= 1) {
      return word
    } else {
      console.log(vowelClusters);
      console.log(vowelIndex);
      let syllableArr = [];
      let syllableBuild = [];
      let splits = vowelClusters.length-1;
      let startIndex = 0;
      for (var i = 0; i < splits; i++) {
        console.log('starting');
        let splitIndex = Math.floor((vowelIndex[i+1] - vowelIndex[i])/2) + vowelIndex[i];
        // console.log(splitIndex);

        for (var j = startIndex; j < splitIndex; j++) {
          syllableBuild.push(wordArr[j]);
        }
        startIndex = splitIndex;
        // console.log();
        syllableBuild = syllableBuild.join('');
        console.log(syllableBuild);
        syllableArr.push(syllableBuild);
        syllableBuild = [];
      }
      for (var i = startIndex; i <= word.length; i++) {
        syllableBuild.push(wordArr[i]);
      }
      syllableBuild = syllableBuild.join('');
      syllableArr.push(syllableBuild);
      // console.log(vowelIndex);
      return syllableArr;
    }
  });
  arr = _.flatten(arr)
  return arr;
}
