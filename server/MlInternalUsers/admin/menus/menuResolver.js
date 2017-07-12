/**
 * Created by venkatasrinag on 18/1/17.
 */

import MlResolver from '../../../commons/mlResolverDef'
import MlAdminUserContext from '../../../mlAuthorization/mlAdminUserContext'
import MlUserContext from '../../../MlExternalUsers/mlUserContext'
var _lodash = require('lodash');


MlResolver.MlQueryResolver['FetchMenu'] = (_,{name},context) =>{
  //Resolve the context of the User and hierarchy
  //fetch Menu Name from the Hierarchy config.
  let menu=new MlAdminUserContext().getDefaultMenu(context.userId);

  return MlMenus.findOne({name:menu});
}

MlResolver.MlQueryResolver['fetchExternalUserMenu'] = ( _, {name}, context) =>{
    let menu = new MlUserContext().getDefaultMenu(context.userId);
    return MlMenus.findOne({name:menu});
}

MlResolver.MlQueryResolver['fetchExternalUserProfileMenu'] = ( _, {name}, context) =>{
  let menuName = new MlUserContext().getDefaultProfileMenu(context.userId);
  if(menuName){
    return MlMenus.findOne({name:menuName});
  }
}

MlResolver.MlQueryResolver['fetchExploreMenu'] = ( _, {name}, context) =>{
  let menu = new MlUserContext().getExploreMenu(context.userId);
  return MlMenus.findOne({name:menu});
}

MlResolver.MlQueryResolver['fetchCalendarMenu'] = ( _, {name}, context) =>{
  let menu = new MlUserContext().getCalendarMenu(context.userId);
  return MlMenus.findOne({name:menu});
}
