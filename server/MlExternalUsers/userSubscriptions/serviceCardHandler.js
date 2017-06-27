/**
 * Created by venkatsrinag on 19/6/17.
 */
import { parse } from 'graphql';
import MlResolver from '../../commons/mlResolverDef';
import _ from 'lodash'
import mlOfficeValidationRepo from '../office/officeRepo'


class MlserviceCardHandler{
  constructor(){
  }

  validateResource(query, context, bodyVariables)
  {
      let resourceName,
      userAction,
      interactionType;

      if(!query)
          return {success:false};

      var details = this.getQueryDetails(query);
      if(resourceName != "OFFICE")
        return {success:true}

      if(details && details.isWhiteList)
        return {success:true}
      if(!details || (details && (!details.resourceName || !details.actionName)))
          return {success:false, msg:"Invalid Details"};

      if(userAction == 'CREATE')
        return {success:true};

      resourceName = details.resourceName;
      userAction = details.actionName;
      interactionType = details.interactionType;

      let variables = _.cloneDeep(bodyVariables)

      switch(resourceName){
        case 'OFFICE':{
          return mlOfficeValidationRepo.validateOfficeActions(context.userId, resourceName, userAction, variables)
        }
        break;
        case 'INTERACTION':{
          return mlActionValidationService.validateUserActions(context.userId, resourceName, userAction, interactionType);
        }
        break;
      }
  }

  getQueryDetails(gqlQuery){
    let query = parse(gqlQuery),
    schemaDef,
    resourceName,
    actionName,
    interactionType,
    operation,
    isWhiteList
    typeName = '';

    for(var i = 0; i < query.definitions.length; i++){
      const d = query.definitions[i];
      switch (d.kind){
        case 'OperationDefinition':
          if (schemaDef) {
            throw new Error('Must provide only one schema definition.');
          }
          schemaDef = d;
          break;
      }
    }
    operation = schemaDef.operation;
    schemaDef.selectionSet.selections.forEach(operationType => {
      typeName = operationType.name.value
    })
    let modules = MlResolver.MlModuleResolver;
    _.each(modules, function (module)
    {
      let validApi = _.find(module, {api:typeName})
      if(validApi){
        resourceName = validApi.resource || validApi.moduleName;
        actionName = validApi.userAction || validApi.actionName ;
        interactionType = validApi.interactionType
        isWhiteList = validApi.isAppWhiteList || false;
        return;
      }
    })

    return {resourceName:resourceName, actionName:actionName, interactionType:interactionType, isWhiteList:isWhiteList}
  }
}

const mlserviceCardHandler = new MlserviceCardHandler();
Object.freeze(mlserviceCardHandler);

export default mlserviceCardHandler;