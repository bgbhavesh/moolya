/**
 * Created by Mukhil on 14/6/17.
 */

import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'
import MlResolver from "../../commons/mlResolverDef";


let service=`
  type FacilitationCharge {
     amount: Int
     percentage: Int
     derivedAmount: Int
  }
  type Attachments {
     name: String
     info: String
     isMandatory: Boolean
  }
  type ServicePayment {
     amount: Int
     isDiscount: Boolean
     discountAmount: Int
     discountPercentage: Int
     isTaxInclusive: Boolean
     isPromoCodeApplicable: Boolean
  }
  type TermsAndCondition {
     isCancelable: Boolean
     isRefundable: Boolean
     isReschedulable: Boolean
     noOfReschedulable: Int
  }
  type Duration{
     hours: Int
     minutes: Int
  }
  
  type Communities{
    id: String
    name:String
  }
  type SubChapters{
    id: String
    name: String
  }
  
  type Cities{
    id:String
    name:String
  }
  
  type Clusters{
    id:String
    name:String
  }
  
  type States{
    id:String
    name:String
  }

  type Service {
    userId: String
    _id: String
    profileId: String
    name: String
    displayName: String
    noOfSession: Int
    sessionFrequency: String
    duration: Duration
    status: Boolean
    termsAndCondition: TermsAndCondition
    attachments: [Attachments]
    payment: ServicePayment
    tasks: [String]
    facilitationCharge : FacilitationCharge
    createdAt: Date
    updatedAt: Date
    validTill: Date
    community: [Communities]
    subChapter: [SubChapters]
    city: [Cities]
    state: [States]
    cluster: Clusters
  }

   input facilitationCharge {
       amount: Int
       percentage: Int
       derivedAmount: Int
   }

   input attachments {
       name: String
       info: String
       isMandatory: Boolean
   }

   input servicepayment {
       amount: Int
       isDiscount: Boolean
       discountAmount: Int
       discountPercentage: Int
       isTaxInclusive: Boolean
       isPromoCodeApplicable: Boolean
   }

   input termsAndCondition {
       isCancelable: Boolean
       isRefundable: Boolean
       isReschedulable: Boolean
       noOfReschedulable: Int
   }

   input duration{
      hours: Int
      minutes: Int
   }
   
  input communities{
    id: String
    name:String
  }
  input subChapters{
    id: String
    name: String
  }
  
  input cities{
    id:String
    name:String
  }
  
  input clusters{
    id:String
    name:String
  }
    
  input states{
   id:String
    name:String
  }

   input service {
        userId: String
        profileId: String
        name: String
        displayName: String
        noOfSession: Int
        sessionFrequency:String
        duration: duration
        status: Boolean
        termsAndCondition: termsAndCondition
        attachments: [attachments]
        payment: servicepayment
        tasks: [String]
        facilitationCharge : facilitationCharge
        createdAt: Date
        updatedAt: Date
        validTill: Date
        community: [communities]
        subChapter: [subChapters]
        city: [cities]
        state:[states]
        cluster: clusters
    }

    type Query {
        fetchServices(profileId:String):[Service]
        fetchService(serviceId:String):Service
    }

    type Mutation {
        createService(Services:service):response
        updateService(serviceId:String,Services:service):response
    }
`;


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], service]);

let supportedApi = [
  {api:'fetchServices', actionName:'READ', moduleName:"OFFICE"},
  {api:'fetchService', actionName:'READ', moduleName:"OFFICE"},

  {api:'createService', actionName:'CREATE', moduleName:"OFFICE"},
  {api:'updateService', actionName:'UPDATE', moduleName:"OFFICE"},
]

MlResolver.MlModuleResolver.push(supportedApi)
