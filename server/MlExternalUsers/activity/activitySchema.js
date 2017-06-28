/**
 * Created by Mukhil on 14/6/17.
 */

import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'
import MlResolver from "../../commons/mlResolverDef";


let activity=`

type AvailableCommunities{
  communityName: String
  communityId: String
  userCount: Int
  id: String
}


type TeamDetails{
  communityName: String
  availableCommunities:[AvailableCommunities]
  firstName: String
  name: String
  _id:String
}

type BranchType{
branchType: String
_id: String
}
    type FacilitationCharge {
      amount: Int
      percentage: Int
      derivedAmount: Int
    }

    type Conversation {
      isAudio: Boolean
      isVideo: Boolean
      isMeetUp: Boolean
    }

    type ActivityPayment {
      amount: Int
      isDiscount: Boolean
      discountType: String
      discountValue: Int
      isTaxInclusive: Boolean
      isPromoCodeApplicable: Boolean
    }

    type Teams {
      branch: String
      communityType: String
      users: [String]
    }
    type Duration {
        hours:Int
        minutes:Int
      }

    type Activity {
      _id: String
      userId: String
      profileId: String
      name: String
      displayName: String
      isInternal: Boolean
      isExternal: Boolean
      conversation: Conversation
      mode: String
      isServiceCardElligible: Boolean
      industryTypes:[String]
      note: String
      imageLink: String
      duration: Duration
      deliverable: [String]
      payment: ActivityPayment
      facilitationCharge: FacilitationCharge
      teams: [Teams]
      createdAt: Date
      updatedAt: Date
    }
    
    input TeamName {
      communityType: String
      officeId: String
    }
    
    type TeamUsers {
      firstName: String
      name: String
    }

     input facilitationCharge {
      amount: Int
      percentage: Int
      derivedAmount: Int
    }

    input conversations {
      isAudio: Boolean
      isVideo: Boolean
      isMeetUp: Boolean
    }
    input activityPayment {
      amount: Int
      isDiscount: Boolean
      discountType: String
      discountValue: Int
      isTaxInclusive: Boolean
      isPromoCodeApplicable: Boolean
    }
    input teams {
      branch: String
      communityType: String
      users: [String]
    }

    input duration {
        hours:Int
        minutes:Int
    }
    
    input activityUpdate{
      teams:[teams]
      payment: activityPayment
      facilitationCharge: facilitationCharge
    }

    input activity {
      userId: String
      profileId: String
      name: String
      displayName: String
      isInternal: Boolean
      isExternal: Boolean
      mode: String
      isServiceCardElligible: Boolean
      conversation: conversations
      industryTypes:[String]
      note: String
      imageLink: String
      duration : duration
      deliverable: [String]
      payment: activityPayment
      facilitationCharge: facilitationCharge
      teams: [teams]
      createdAt: Date
      updatedAt: Date
    }

    type Query {
        fetchActivities(profileId:String, isInternal: Boolean, isExternal: Boolean):[Activity]
        fetchActivity(activityId:String):Activity
              
    }

    type Mutation {
        createActivity(Details:activity):response
        updateActivity(activityId:String, Details:activity):response
    }
`


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], activity]);
let supportedApi = [
  {api:'fetchActivities', actionName:'READ', moduleName:"OFFICE"},
  {api:'fetchActivity', actionName:'READ', moduleName:"OFFICE"},
  {api:'getBranchDetails', actionName:'READ', moduleName:"OFFICE"},
  {api:'getTeamMembers', actionName:'READ', moduleName:"OFFICE"},
  {api:'getTeamUsers', actionName:'READ', moduleName:"OFFICE"},


  {api:'createActivity', actionName:'CREATE', moduleName:"OFFICE"},
  {api:'updateActivity', actionName:'UPDATE', moduleName:"OFFICE"}
]
MlResolver.MlModuleResolver.push(supportedApi)
// fetchActivities:[Activity]
// fetchActivity(id:String):Activity
