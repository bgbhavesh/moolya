/**
 * Created by Mukhil on 20/6/17.
 */

import MlResolver from '../../commons/mlResolverDef';
import MlRespPayload from '../../commons/mlPayload';

const _ = require('lodash');

MlResolver.MlQueryResolver.getMySiteMapUrl = (obj, args, context, info) => {
  const siteMapObject = MlSitemap.findOne({ userId: context.userId }) || {}
  const seoUrl = siteMapObject.seoUrl;
  return { url: seoUrl }
}
