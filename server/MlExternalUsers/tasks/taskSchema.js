// /**
//  * Created by Mukhil on 14/6/17.
//  */
//   import {mergeStrings} from 'gql-merge';
//   import MlSchemaDef from '../../commons/mlSchemaDef'
//   import MlResolver from "../../commons/mlResolverDef";
//
//
//   let task=`
//
//    type termsAndCondition {
//      isCancelable: Boolean
//      isRefundable: Boolean
//      isReschedulable: Boolean
//      noOfReschedulable: Int
//    }
//
//    type attachments {
//      name: String
//      info: String
//      isMandatory: Boolean
//    }
//
//    type payment {
//      amount: Int
//      isDiscount: Boolean
//      discountAmount: Boolean
//      discountPercentage: Int
//      isTaxInclusive: Boolean
//      isPromoCodeApplicable: Boolean
//    }
//
//    type facilitationCharge {
//       amount: Int
//       percentage: Int
//       derivedAmount: Int
//    }
//
//    type duration {
//         hours:Int
//         minutes:Int
//    }
//
//    type Task {
//       userId: String
//       profileId: String
//       name: String
//       displayName: String
//       isInternal: Boolean
//       isExternal: Boolean
//       note: String
//       noOfSession: Int
//       sessionFrequency: String
//       duration: duration
//       isSessionCardEligible: Boolean
//       session: [session]
//       termsAndCondition: termsAndCondition
//       attachments: [attachments]
//       payment: payment
//       facilitationCharge: facilitationCharge
//       createdAt: Date
//       updatedAt: Date
//    }
//
//
//    input session{
//        duration : duration
//        activities: [String]
//    }
//
//    input termsAndCondition {
//        isCancelable: Boolean
//        isRefundable: Boolean
//        isReschedulable: Boolean
//        noOfReschedulable: Int
//    }
//
//    input attachments {
//        name: String
//        info: String
//        isMandatory: Boolean
//    }
//    input payment {
//        amount: Int
//        isDiscount: Boolean
//        discountAmount: Boolean
//        discountPercentage: Int
//        isTaxInclusive: Boolean
//        isPromoCodeApplicable: Boolean
//    }
//    input facilitationCharge {
//         amount: Int
//         percentage: Int
//         derivedAmount: Int
//    }
//    input duration {
//        hours:Int
//        minutes:Int
//    }
//    input Task {
//         userId: String
//         profileId: String
//         name: String
//         displayName: String
//         isInternal: Boolean
//         isExternal: Boolean
//         note: String
//         noOfSession: Int
//         sessionFrequency: String
//         duration: duration
//         isSessionCardEligible: Boolean
//         session: [session]
//         termsAndCondition: termsAndCondition
//         attachments: [attachments]
//         payment: payment
//         facilitationCharge: facilitationCharge
//         createdAt: Date
//         updatedAt: Date
//    }
//
//    type Query{
//           fetchTasks:[Task]
//           fetchTask(id:String):Task
//    }
//
//    type Mutation {
//           createTask:response
//           updateTask:response
//    }
//   `
//
//
//   MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], task])
//
//   let supportedApi = [
//     {api:'fetchTasks', actionName:'READ', moduleName:"OFFICE"},
//     {api:'fetchTask', actionName:'READ', moduleName:"OFFICE"},
//
//     {api:'createTask', actionName:'CREATE', moduleName:"OFFICE"},
//     {api:'updateTask', actionName:'UPDATE', moduleName:"OFFICE"},
//   ]
//   MlResolver.MlModuleResolver.push(supportedApi)
