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

  if (args.moduleName) {
    var id= args._id;
    let response= MlFilters.find({"moduleName":args.moduleName}).fetch();
    return response;
  }
}



MlResolver.MlQueryResolver['fetchFilterListDropDown'] = (obj, args, context, info) => {
  // TODO : Authorization
  let filtersData =new MlFilterListRepo().getFilterDropDownSettings(args);
  return filtersData;
}


MlResolver.MlQueryResolver['fetchSelectedFilterListDropDown'] = (obj, args, context, info) => {
  // TODO : Authorization
  console.log(args);
  let filtersData =new MlFilterListRepo().getFilterDropDownSettings(args);
  return filtersData;
}


