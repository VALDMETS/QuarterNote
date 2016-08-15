import Bb from 'backbone';

import Theme from '../models/theme';
import settings from '../settings';

export default Bb.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/themes`,
  model: Theme
});
