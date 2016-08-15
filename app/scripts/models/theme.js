import Bb from 'backbone';
import settings from '../settings';

export default Bb.Model.extend({
  // defaults: {
  //   theme: '',
  //   timingArr: []
  // },
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appKey}/themes`,
  idAttribute: '_id'
});
