import Bb from 'backbone';

import PointEvent from '../models/pointevent';
import settings from '../settings';

export default Bb.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/points`,
  model: PointEvent
});
