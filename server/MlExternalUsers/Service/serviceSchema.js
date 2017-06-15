/**
 * Created by Mukhil on 14/6/17.
 */

import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'

let service=`
  type facilitationCharge {
     amount: Number
     percentage: Number
     derivedAmount: Number
  }
  type attachments {
     name: String
     info: String
     isMandatory: Boolean
  }
  type payment {
     amount: Number
     isDiscount: Boolean
     discountAmount: Boolean
     discountPercentage: Number
     isTaxInclusive: Boolean
     isPromoCodeApplicable: Boolean
  }
  type termsAndCondition {
     isCancelable: Boolean
     isRefundable: Boolean
     isReschedulable: Boolean
     noOfReschedulable: Number
  }
  
  type Service {
    userId: String
    profileId: String
    name: String
    displayName: String
    noOfSession: Number
    sessionFrequency: Number
    duration {
      hours
      minutes
    }
    status: Boolean
    termsAndCondition: termsAndCondition
    attachments: attachments
    payment: payment
    tasks: [String]
    attachments: 
    facilitationCharge : facilitationCharge
    note: String
    createdAt: Date
    updatedAt: Date
  }  
     
   input facilitationCharge {
       amount: Number
       percentage: Number
       derivedAmount: Number
   }
   
   input attachments {
       name: String
       info: String
       isMandatory: Boolean
   }
   
   input payment {
       amount: Number
       isDiscount: Boolean
       discountAmount: Boolean
       discountPercentage: Number
       isTaxInclusive: Boolean
       isPromoCodeApplicable: Boolean
   }
   
   input termsAndCondition {
       isCancelable: Boolean
       isRefundable: Boolean
       isReschedulable: Boolean
       noOfReschedulable: Number
   }

    input Service {
        userId: String
        profileId: String
        name: String
        displayName: String
        noOfSession: Number
        sessionFrequency: Number
        duration{
          hours
          minutes
        }
        status: Boolean
        termsAndCondition: termsAndCondition
        attachments: attachments
        payment: payment
        tasks: [String]
        attachments: 
        facilitationCharge : facilitationCharge
        note: String
        createdAt: Date
        updatedAt: Date
    }

    type Query {
        fetchServices:[Service]
        fetchService(id:String):Service
    }

    type Mutation {
        createService:response
        updateService:response
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
