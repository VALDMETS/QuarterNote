import Bb from 'backbone';

import Request from '../models/request';
import settings from '../settings';

export default Bb.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/friends`,
  model: Request
});
