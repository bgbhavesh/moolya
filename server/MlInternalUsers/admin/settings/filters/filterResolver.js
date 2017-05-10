/**
 * Created by muralidhar on 14/02/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import MlFilterListRepo from './filterListRepo';


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

MlResolver.MlQueryResolver['fetchModuleFilters'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.moduleName && context.userId) {
   /* let user = Meteor.users.findOne({_id:context.userId});
    if(user && user.profile && user.profile.isInternaluser == true){
      let userProfiles = user.profile.InternalUprofile && user.profile.InternalUprofile.moolyaProfile && user.profile.InternalUprofile.moolyaProfile.userProfiles;
      let defaultProfile = _.find(userProfiles, {isDefault:true});

    }*/
    let response= MlFilters.find({"moduleName":args.moduleName}).fetch();
    return response;
  }
}



MlResolver.MlQueryResolver['fetchFilterListDropDown'] = (obj, args, context, info) => {
  // TODO : Authorization
  let filtersData =new MlFilterListRepo(context.userId).getFilterDropDownSettings(args);
  return filtersData;
}


MlResolver.MlQueryResolver['fetchSelectedFilterListDropDown'] = (obj, args, context, info) => {
  // TODO : Authorization
  let filtersData =new MlFilterListRepo(context.userId).getFilterDropDownSettings(args);
  return filtersData;
}

MlResolver.MlQueryResolver['fetchSelectedFilterData'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.id) {
    let response= MlFilters.findOne({"_id":args.id});
    return response;
  }
}



