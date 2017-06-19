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
  type Payment {
     amount: Int
     isDiscount: Boolean
     discountAmount: Boolean
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

  type Service {
    userId: String
    profileId: String
    name: String
    displayName: String
    noOfSession: Int
    sessionFrequency: Int
    duration: Duration
    status: Boolean
    termsAndCondition: TermsAndCondition
    attachments: Attachments
    payment: Payment
    tasks: [String]
    facilitationCharge : FacilitationCharge
    note: String
    createdAt: Date
    updatedAt: Date

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

   input payment {
       amount: Int
       isDiscount: Boolean
       discountAmount: Boolean
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

   input service {
        userId: String
        profileId: String
        name: String
        displayName: String
        noOfSession: Int
        sessionFrequency:Int
        duration: duration
        status: Boolean
        termsAndCondition: termsAndCondition
        attachments: attachments
        payment: payment
        tasks: [String]
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