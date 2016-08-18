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
    authtoken: ''
  },
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}/login`,
  idAttribute: '_id',
  friendSetup: function() {
    let friendFilter = [{username: this.get('username')}];
    $.ajax({
      url: `https://baas.kinvey.com/appdata/${settings.appKey}/friends`,
      data: {
        query: JSON.stringify({
          "$and":[{
            "$or":[{
              confirmation: null
            }, {
              confirmation: true
            }]
          }, {
            "$or":[{
              requestor_id: this.get('_id')
            }, {
              recipient_id: this.get('_id')
            }]
          }]
        })
      },
      success: (friendData) => {
        // console.log(friendData);
        friendData.forEach( (listing) => {
          if(listing.confirmation === null) {
            store.friendRequests.push(listing);
          } else {
            if(listing.requestor_id === this.get('_id')) {
              friendFilter.push({username: listing.recipient});
            } else {
              friendFilter.push({username: listing.requestor});
            }
          }
        });
        console.log(store.friendRequests);
        console.log(friendFilter);
        store.friendList.fetch({
          data: {
            query: JSON.stringify({"$or": friendFilter})
          },
          success: function() {
            console.log(store.friendList);
          }
        });
        hashHistory.push('/main');
      }
    })
  }
});
