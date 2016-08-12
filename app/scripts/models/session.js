import Bb from 'backbone';
import settings from '../settings';

export default Bb.Model.extend({
  defaults: {
    username: '',
    password: '',
    authtoken: ''
  },
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}/login`
});
