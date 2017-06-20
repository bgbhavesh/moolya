/**
 * Created by pankaj on 19/6/17.
 */

import {mergeStrings} from "gql-merge";
import MlSchemaDef from "../../commons/mlSchemaDef";
import MlResolver from "../../commons/mlResolverDef";

let internalTaskSchema = `
    
    type Community {
      id: String
      name: String
    }
    
    type InternalTask {
        _id: String
        userId:String
        attendee: String
        name: String
        stage: String
        client: String
        community: Community
        attendees: [String]
        docs: [String]
        status: String
    }
    
    input community {
      id: String
      name: String
    }
    
    input internalTask {
        _id: String
        userId:String
        attendee: String
        name: String
        stage: String
        client: String
        community: community
        attendees: [String]
        docs: [String]
        status: String
    }
  
    type Query{
        fetchInternalTask:[InternalTask]
        fetchInternalTaskById(internalTaskId:String):InternalTask
    }
    
    type Mutation{       
        createInternalTask(internalTask:internalTask):response
        updateInternalTask(internalTaskId:String, internalTask:internalTask):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], internalTaskSchema]);
let supportedApi = [
  {api: 'fetchInternalTask', actionName: 'READ', moduleName: "OFFICE"},
  {api: 'fetchInternalTaskById', actionName: 'READ', moduleName: "OFFICE"},
  {api: 'createInternalTask', actionName: 'CREATE', moduleName: "OFFICE"},
  {api: 'updateInternalTask', actionName: 'UPDATE', moduleName: "OFFICE"},
]
MlResolver.MlModuleResolver.push(supportedApi)

