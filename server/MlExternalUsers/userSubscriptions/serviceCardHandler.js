/**
 * Created by venkatsrinag on 19/6/17.
 */
import { parse } from 'graphql';
import MlResolver from '../../commons/mlResolverDef';
import _ from 'lodash'

class MlserviceCardHandler{
  constructor(){
  }

  validateResource(context, query)
  {
      let resourceName,
      actionName,
      interactionType;

      if(!query)
          return false;

      var details = this.getQueryDetails(query);
      if(!details || (details && (!details.resourceName || !details.actionName)))
          return false;

      if(action == 'CREATE')
        return true;

      resourceName = details.resourceName;
      actionName = details.actionName;
      interactionType = details.interactionType;

      switch(resourceName){
        case 'OFFICE':{
        }
        break;
        case 'INTERACTION':{
          mlActionValidationService.validateUserActions(context.userId, resourceName, actionName, interactionType);
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
        resourceName = validApi.moduleName;
        actionName = validApi.actionName;
        interactionType = validApi.interactionType
        return;
      }
    })

    return {resourceName:resourceName, actionName:actionName, interactionType:interactionType}
  }
}

const mlserviceCardHandler = new MlserviceCardHandler();
Object.freeze(mlserviceCardHandler);

export default mlserviceCardHandler;
