/**
 * Created by venkatasrinag on 9/2/17.
 */
import MlResolver from '../../../commons/mlResolverDef'


MlResolver.MlQueryResolver.fetchModules = (obj, args, context, info) =>
  MlModules.find().fetch()
// return MlRoles.findOne({name});

