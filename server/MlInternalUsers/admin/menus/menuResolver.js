/**
 * Created by venkatasrinag on 18/1/17.
 */

import MlResolver from '../../../commons/mlResolverDef'
import MlAdminUserContext from '../../../mlAuthorization/mlAdminUserContext'
import MlUserContext from '../../../MlExternalUsers/mlUserContext'
import menuRepo from './menuRepo'
const _lodash = require('lodash');


MlResolver.MlQueryResolver.FetchMenu = (_, { name }, context) => {
  // Resolve the context of the User and hierarchy
  // fetch Menu Name from the Hierarchy config.
  const menu = new MlAdminUserContext().getDefaultMenu(context.userId);

  return MlMenus.findOne({ name: menu });
}

MlResolver.MlQueryResolver.fetchExternalUserMenu = (_, { name }, context) => {
  const menu = new MlUserContext().getDefaultMenu(context.userId);
  return MlMenus.findOne({ name: menu });
}

MlResolver.MlQueryResolver.fetchExternalUserProfileMenu = (_, { name }, context) => {
  const menuName = new MlUserContext().getDefaultProfileMenu(context.userId);
  if (menuName) {
    const menu = MlMenus.findOne({ name: menuName });
    if (menu) {
      const result = menuRepo.findProfileResources(menu, context);
      return result;
    }
  }

  return []
}

MlResolver.MlQueryResolver.fetchExploreMenu = (_, { name }, context) => {
  const menu = new MlUserContext().getExploreMenu(context.userId);
  return MlMenus.findOne({ name: menu });
}

MlResolver.MlQueryResolver.fetchCalendarMenu = (_, { name }, context) => {
  const menuName = new MlUserContext().getCalendarMenu(context.userId);
  if (menuName) {
    const menu = MlMenus.findOne({ name: menuName });
    if (menu) {
      const result = menuRepo.findCalendarResources(menu, context);
      return result;
    }
  }
  return []
}
