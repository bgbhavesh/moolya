/**
 * Created by venkatsrinag on 19/6/17.
 */
import { parse } from 'graphql';
import MlResolver from '../../commons/mlResolverDef';
import _ from 'lodash'
import mlOfficeValidationRepo from '../office/officeRepo'
import mlServiceCardRepo from '../servicecards/servicecardRepo'


class MlserviceCardHandler {
  constructor() {
  }


  //-----------------------------------------------------------------------------
  /* FUNCTION		    :	validateResource
   * DESCRIPTION	  :	This function is used to validate end user resource(eg:office, interactions)
   * PROTOTYPE	    :	boolean mlserviceCardHandler.validateResource(query, context, bodyVariables)
   * PARAMETERS     : query:String (graphql query("createOffice"))
                      context:Object (Logged in User Context)
                      bodyVariables: Object (Related to that query)
   * RETURN VALUE	  :	boolean
   * CREATED BY	    :	Srinag
   */
  //-----------------------------------------------------------------------------
  validateResource(query, context, bodyVariables) {
    let resourceName,
      userAction,
      interactionType;

    if (!query) { return { success: false }; }

    const isAccessUrl = this.isCanAccessUrl(context);
    if (!isAccessUrl) {
      return { success: false, msg: 'Invalid Details' };
    }

    const details = this.getQueryDetails(query);
    if (details.resourceName != 'OFFICE' && details.resourceName != 'SERVICECARD') { return { success: true } }

    if (details && details.isWhiteList) { return { success: true } }
    if (!details || (details && (!details.resourceName || !details.actionName))) { return { success: false, msg: 'Invalid Details' }; }

    resourceName = details.resourceName;
    userAction = details.actionName;
    interactionType = details.interactionType;

    const variables = _.cloneDeep(bodyVariables)

    switch (resourceName) {
      case 'OFFICE': {
        return mlOfficeValidationRepo.validateOfficeActions(context.userId, resourceName, userAction, variables)
      }
        break;
      case 'INTERACTION': {
        return true;
        // return mlActionValidationService.validateUserActions(context.userId, resourceName, userAction, interactionType);
      }
        break;
      case 'SERVICECARD': {
        return mlServiceCardRepo.validateServiceCardActions(context, resourceName, userAction, interactionType);
      }
        break;

      default: {
        return { success: true }
      }
    }
  }

  getQueryDetails(gqlQuery) {
    let query = parse(gqlQuery),
      schemaDef,
      resourceName,
      actionName,
      interactionType,
      operation,
      isWhiteList
    typeName = '';

    for (let i = 0; i < query.definitions.length; i++) {
      const d = query.definitions[i];
      switch (d.kind) {
        case 'OperationDefinition':
          if (schemaDef) {
            throw new Error('Must provide only one schema definition.');
          }
          schemaDef = d;
          break;
      }
    }
    operation = schemaDef.operation;
    schemaDef.selectionSet.selections.forEach((operationType) => {
      typeName = operationType.name.value
    })
    const modules = MlResolver.MlModuleResolver;
    _.each(modules, (module) => {
      const validApi = _.find(module, { api: typeName })
      if (validApi) {
        resourceName = validApi.resource || validApi.moduleName;
        actionName = validApi.userAction || validApi.actionName;
        interactionType = validApi.interactionType
        isWhiteList = validApi.isAppWhiteList || false;
      }
    })

    return {
      resourceName, actionName, interactionType, isWhiteList
    }
  }

  isCanAccessUrl(context) {
    const isInternalUserCheck = getActiveUserDetail(context).isInternaluser;
    let res = true;
    const urlPath = context.url ? context.url : null;
    const pathCheck = isInternalUserCheck ? urlPath.indexOf('app') : urlPath.indexOf('admin');
    if (pathCheck != -1) { res = false; }
    return res
  }
}

const mlserviceCardHandler = new MlserviceCardHandler();
Object.freeze(mlserviceCardHandler);

export default mlserviceCardHandler;

getActiveUserDetail = (context) => {
  const user = mlDBController.findOne('users', { _id: context.userId }, context) || {};
  return user.profile ? user.profile : {};
};
