import Bb from 'backbone';
import settings from '../settings';

export default Bb.Model.extend({
  defaults: {
    confirmation: null,
    requestor: '',
    requestor_id: '',
    recipient: '',
    recipient_id: ''
  },
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appKey}/friends`,
  idAttribute: '_id'
});
