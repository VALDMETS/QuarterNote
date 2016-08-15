import Bb from 'backbone';
import _ from 'underscore';
import settings from '../settings';

export default Bb.Model.extend({
  defaults: {
    sender: '',
    recipient_id: '',
    content: '',
    theme: '',
    timestamp: new Date(),
  },
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appKey}/messages`,
  idAttribute: '_id',
  syllabizer: function(string) {
    string = string.toLowerCase();
    let arr = string.split(' ');
    arr = arr.map(function(word){
      return word + ' ';
    })
    arr = arr.map(function(word){
      let vowelIndex = [];
      let wordArr = word.split('');
      wordArr.forEach(function(letter, i){
        if (letter==='a' || letter==='e' || letter==='i' || letter==='o' || letter === 'u' || letter === 'y') {
          vowelIndex.push(i);
        }
      });
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
          } else {
            vowelClusters[i] = (word[vowelIndex[i]]+word[vowelIndex[i+1]]);
            vowelClusters[i+1] = '';
            vowelIndex.splice(i+1, 1);
          }
        }
      }
      vowelClusters = _.compact(vowelClusters);

      //prevents straggler vowel clusters

      if(vowelClusters.length > vowelIndex.length) {
        vowelClusters.pop();
      }
      if (vowelIndex[vowelIndex.length-1] === word.length-2) {
        if(vowelClusters[vowelClusters.length-1] === 'e' && wordArr[wordArr.length-3] !== 'l') {
          vowelClusters.pop();
          vowelIndex.pop();
        }
      }
      if (vowelClusters.length <= 1) {
        return word
      } else {
        let syllableArr = [];
        let syllableBuild = [];
        let splits = vowelClusters.length-1;
        let startIndex = 0;
        for (var i = 0; i < splits; i++) {

          //this may be tweaked

          let splitIndex = Math.floor((vowelIndex[i+1] - vowelIndex[i])/2) + vowelIndex[i] + 1;

          //insert fine tuning on split placement here, considering adjacent consonants, etc.

          for (var j = startIndex; j < splitIndex; j++) {
            syllableBuild.push(wordArr[j]);
          }
          startIndex = splitIndex;
          syllableBuild = syllableBuild.join('');
          syllableArr.push(syllableBuild);
          syllableBuild = [];
        }
        for (var i = startIndex; i <= word.length; i++) {
          syllableBuild.push(wordArr[i]);
        }
        syllableBuild = syllableBuild.join('');
        syllableArr.push(syllableBuild);
        return syllableArr;
      }
    });
    arr = _.flatten(arr)
    console.log(arr);
    return arr;
  }
});
