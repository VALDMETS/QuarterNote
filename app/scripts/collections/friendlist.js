import Bb from 'backbone';

import Friend from '../models/friend';
import settings from '../settings';

export default Bb.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/friends`,
  model: Friend
});
