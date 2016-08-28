import React from 'react';
import {hashHistory} from 'react-router';
import $ from 'jquery';
import Bb from 'backbone';

import store from '../store';
import settings from '../settings';


export default Bb.Model.extend({
  defaults: {
    username: '',
    password: '',
    authtoken: '',
    img_url: '',
    points: 0,
  },
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}/login`,
  idAttribute: '_id',
  friendSetup: function() {
    return new Promise( (resolve,reject) => {
      let friendParams = [{username: this.get('username')}];
      return $.ajax({
        url: `https://baas.kinvey.com/appdata/${settings.appKey}/friends`,
        data: {
          query: JSON.stringify({
            "$and":[{
              "$or":[{ confirmation: null }, { confirmation: true }, { confirmation: false }]
            }, {
              "$or":[{ requestor_id: this.get('_id') }, { recipient_id: this.get('_id') }]
            }]
          })
        },
        success: (friendData) => {
          friendData.forEach( (listing) => {
            if (listing.confirmation === null && listing.recipient_id === store.session.get('_id')) {
              store.friendRequests.push(listing);
            } else if (listing.confirmation === true) {
              if(listing.requestor_id === this.get('_id')) {
                friendParams.push({username: listing.recipient});
              } else {
                friendParams.push({username: listing.requestor});
              }
            } else if (listing.confirmation === false && (listing.requestor_id === this.get('_id') || listing.recipient_id === this.get('_id'))) {
              store.hiddenRequests.push(listing);
            } else if (listing.confirmation === null && (listing.requestor_id === this.get('_id') || listing.recipient_id === this.get('_id'))) {
              store.pendingRequests.push(listing);
            }
          });
          store.friendList.fetch({
            data: {
              query: JSON.stringify({"$or": friendParams})
            }
          }).then( () => {
            // console.log(store.pendingRequests);
            resolve();
          });
        },
        error: () => {
          localStorage.clear();
          store.session.clear();
          hashHistory.push('/login');
          reject();
        }
      })
    });
  },
  localStoragePull: function() {
    let localInfo = JSON.parse(localStorage.getItem("user"));
    store.session.set({
      _id: localInfo._id,
      username: localInfo.username,
      authtoken: localInfo.authtoken,
      img_url: localInfo.img_url
    });
  },
  logoutFunction: function() {
    store.session.clear();
    localStorage.clear();
    store.newMessages.reset();
    store.messageToBeSent.clear();
    if(store.friendRequests) {
      store.friendRequests.reset();
    }
    store.requestPending = [];
  }
});
