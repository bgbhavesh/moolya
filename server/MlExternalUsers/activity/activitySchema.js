/**
 * Created by Mukhil on 14/6/17.
 */

import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'

let activity=`

    type facilitationCharge {
      amount: Number
      percentage: Number
      derivedAmount: Number
    }
    
    type conversation {
      isAudio: Boolean
      isVideo: Boolean
      isMeetup: Boolean
    }
       
    type payment {
      amount: Number
      isDiscount: Boolean
      discountAmount: Number
      discountPercentage: Number
      isTaxInclusive: Number
      isPromoCodeApplicable: Boolean
    }   
        
    type teams {
      branch: String
      communityType: String
      users: [String]
    }
    
    type Activity {
      userId: String
      profileId: String
      name: String
      displayName: String
      isInternal: Boolean
      isExternal: Boolean
      mode: String
      conversation: conversation
      industryTypes:[String]
      note: String
      imageLink: String
      duration {
        hours:Number
        minutes:Number
      }
      deliverable: [String]
      payment: payment 
      facilitationCharge: facilitationCharge
      teams: [teams]
      createdAt: Date
      updatedAt: Date
    }
 }
 
 
 
     input facilitationCharge {
      amount: Number
      percentage: Number
      derivedAmount: Number
    }
    input conversation {
      isAudio: Boolean
      isVideo: Boolean
      isMeetup: Boolean
    }   
    input payment {
      amount: Number
      isDiscount: Boolean
      discountAmount: Number
      discountPercentage: Number
      isTaxInclusive: Number
      isPromoCodeApplicable: Boolean
    }          
    input teams {
      branch: String
      communityType: String
      users: [String]
    }
    input Activity {
    userId: String
      profileId: String
      name: String
      displayName: String
      isInternal: Boolean
      isExternal: Boolean
      mode: String
      conversation: conversation
      industryTypes:[String]
      note: String
      imageLink: String
      duration {
        hours:Number
        minutes:Number
      }
      deliverable: [String]
      payment: payment 
      facilitationCharge: facilitationCharge
      teams: [teams]
      createdAt: Date
      updatedAt: Date
    }

    type Query {
        fetchActivities:[Activity]
        fetchActivity(id:String):Activity
    }

    type Mutation {
        createActivity:response
        updateActivity:response
    }
`


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], activity]);
let supportedApi = [
  {api:'fetchActivities', actionName:'READ', moduleName:"OFFICE"},
  {api:'fetchActivity', actionName:'READ', moduleName:"OFFICE"},

  {api:'createActivity', actionName:'CREATE', moduleName:"OFFICE"},
  {api:'updateActivity', actionName:'UPDATE', moduleName:"OFFICE"},
]
MlResolver.MlModuleResolver.push(supportedApi)
