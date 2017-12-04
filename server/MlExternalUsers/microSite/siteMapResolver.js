/**
 * Created by Mukhil on 20/6/17.
 */

import MlResolver from '../../commons/mlResolverDef';
import MlRespPayload from '../../commons/mlPayload';

var _ = require('lodash');

MlResolver.MlQueryResolver['getMySiteMapUrl'] = (obj, args, context, info) => {
  let siteMapObject = MlSitemap.findOne({userId: context.userId}) || {}
  let seoUrl = siteMapObject.seoUrl;
  seoUrl = Meteor.absoluteUrl() +'/view' +seoUrl;
  return {url:seoUrl}
}
