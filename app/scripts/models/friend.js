import Bb from 'backbone';
import settings from '../settings';

export default Bb.Model.extend({
  defaults: {
    user_id: '',
    username: '',
    img_url: '',
    _id: ''
  },
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}`,
  idAttribute: '_id'
});
