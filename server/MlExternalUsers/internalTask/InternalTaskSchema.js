/**
 * Created by pankaj on 19/6/17.
 */

import {mergeStrings} from "gql-merge";
import MlSchemaDef from "../../commons/mlSchemaDef";
import MlResolver from "../../commons/mlResolverDef";

let internalTaskSchema = `
    
    type InternalTaskCommunity {
      code: String
      type: String
      name: String
    }
    
    type InternalTaskUserInfo {
      id: String,
      name: String,
      profileUrl: String
    }
    
    type InternalTaskAttendees {
      userId:String
      profileId:String
    }
    
    type InternalTask {
        _id: String
        userId:String
        attendee: String
        attendeeProfileId: String
        name: String
        stage: String
        type: String
        resourceId: String
        community: InternalTaskCommunity
        attendees: [InternalTaskAttendees]
        docs: [String]
        status: String
        note: String
        mode: String
        client: String
        userInfo: [InternalTaskUserInfo]
        createdAt: String
        note: String
        dueDate: String
        priority: String
        expectedInput: String
        expectedOutput: String
    }
    
    input internalTaskCommunity {
      code: String
      type: String
      name: String
    }
    
    input internalTaskAttendees {
      userId:String
      profileId:String
    }
    
    input internalTask {
      _id: String
      userId:String
      attendee: String
      attendeeProfileId: String
      name: String
      stage: String
      resourceId: String
      community: internalTaskCommunity
      attendees: [internalTaskAttendees]
      docs: [String]
      status: String
      note: String
      mode: String
    }
    
    input selfInternalTask {
      note: String
      name: String
      dueDate: String
      priority: String
      resourceId: String
      expectedInput: String
      expectedOutput: String
      users: [internalTaskAttendees]
    }
  
    type Query{
        fetchInternalTask:[InternalTask]
        fetchInternalTaskById(internalTaskId:String):InternalTask
        fetchMyInternalTask(status:[String]):[InternalTask]
        fetchSelfCreatedInternalTask(status:[String]):[InternalTask]
    }
    
    type Mutation{       
        createInternalTask(internalTask:internalTask):response
        updateInternalTask(internalTaskId:String, internalTask:internalTask):response
        createSelfInternalTask(selfInternalTask:selfInternalTask): response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], internalTaskSchema]);
let supportedApi = [
  {api: 'fetchInternalTask', actionName: 'READ', moduleName: "OFFICE", isAppWhiteList: true},
  {api: 'fetchInternalTaskById', actionName: 'READ', moduleName: "OFFICE", isAppWhiteList: true},
  {api: 'fetchMyInternalTask', actionName: 'READ', moduleName: "OFFICE", isAppWhiteList: true},
  {api: 'createInternalTask', actionName: 'CREATE', moduleName: "OFFICE", isAppWhiteList: true},
  {api: 'updateInternalTask', actionName: 'UPDATE', moduleName: "OFFICE", isAppWhiteList: true},
];
MlResolver.MlModuleResolver.push(supportedApi);
