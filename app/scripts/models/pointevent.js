import Bb from 'backbone';
import settings from '../settings';

export default Bb.Model.extend({
  defaults: {
    recipient_id: '',
    event_type: '',
    points: 0
  },
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appKey}/points`,
  idAttribute: '_id'
});
