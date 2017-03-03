/**
 * Created by venkatasrinag on 18/1/17.
 */

import MlResolver from '../mlAdminResolverDef'
import MlAdminUserContext from '../../../mlAuthorization/mlAdminUserContext'


MlResolver.MlQueryResolver['FetchMenu'] = (_,{name},context) =>{
  //Resolve the context of the User and hierarchy
  //fetch Menu Name from the Hierarchy config.
  let menu=new MlAdminUserContext().getDefaultMenu(context.userId);

  return MlMenus.findOne({name:menu});
}
