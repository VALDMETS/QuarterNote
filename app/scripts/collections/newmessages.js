import Bb from 'backbone';

import Message from '../models/message';
import settings from '../settings';

export default Bb.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/messages`,
  model: Message
});
