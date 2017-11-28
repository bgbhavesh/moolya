/**
 * Created by muralidhar on 14/02/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import MlFilterListRepo from './filterListRepo';

/*

MlResolver.MlMutationResolver['CreateFilter'] = (obj, args, context, info) => {
        // TODO : Authorization
        let id = MlFilters.insert({...args.filterObject});
        if(id){
            let code = 200;
            let result = {roleId: id}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
}
*/


MlResolver.MlMutationResolver.updateFilter = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.filterId) {
    const id = args.filterId;
    const updatedResponse = MlFilters.update({ _id: id }, { $set: args.filterObject });
    return updatedResponse
  }
}

MlResolver.MlQueryResolver.fetchModuleFilters = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.moduleName && context.userId) {
    const user = Meteor.users.findOne({ _id: context.userId });
    const roleIds = [];
    const hirarichyLevel = []
    const userProfiles = user && user.profile.InternalUprofile.moolyaProfile.userProfiles ? user.profile.InternalUprofile.moolyaProfile.userProfiles : [];
    userProfiles.map((doc, index) => {
      const userRoles = doc && doc.userRoles ? doc.userRoles : [];
      /* userRoles.map(function (doc, index) {
          hirarichyLevel.push(doc.hierarchyLevel)

        });
        hirarichyLevel.sort(function (a, b) {
          return b - a
        }); */
      for (let i = 0; i < userRoles.length; i++) {
        /* if (userRoles[i].hierarchyLevel == hirarichyLevel[0]) { */
        roleIds.push(userRoles[i].roleId);
        break
        // }
      }
    });
    /*   let response=  MlFilters.findOne({"moduleName" : "portfolio",
      "filterFields": {
        "$elemMatch": {
          "isDynamic": false,
          "fieldList": {
            "$elemMatch": {
              "roleId": {$in : roleIds}
            }
          }
        }
      }
    }) */
    const response = MlFilters.findOne({ moduleName: args.moduleName, isActive: true });

    return response;
  }
}


MlResolver.MlQueryResolver.fetchFilterListDropDown = (obj, args, context, info) => {
  // TODO : Authorization
  const filtersData = new MlFilterListRepo(context.userId).getFilterDropDownSettings(args);
  return filtersData;
}


MlResolver.MlQueryResolver.fetchSelectedFilterListDropDown = (obj, args, context, info) => {
  // TODO : Authorization
  const filtersData = new MlFilterListRepo(context.userId).getFilterDropDownSettings(args);
  return filtersData;
}

MlResolver.MlQueryResolver.fetchSelectedFilterData = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.id) {
    const response = MlFilters.findOne({ _id: args.id });
    return response;
  }
}

