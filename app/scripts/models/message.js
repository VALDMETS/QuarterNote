import Bb from 'backbone';
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
  idAttribute: '_id'
});
