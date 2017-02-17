/**
 * Created by venkatasrinag on 9/2/17.
 */
import MlResolver from '../mlAdminResolverDef'


MlResolver.MlQueryResolver['fetchModules'] = (obj, args, context, info) =>{
    return MlModules.find().fetch();
    // return MlRoles.findOne({name});
}
