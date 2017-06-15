/**
 * Created by Mukhil on 14/6/17.
 */
  import {mergeStrings} from 'gql-merge';
  import MlSchemaDef from '../../commons/mlSchemaDef'

  let task=`
  
   type Task{
     duration{
       hours:Number
       minutes:Number
     }
     activities: [String]
   }
     
   type termsAndCondition{
     isCancelable: Boolean
     isRefundable: Boolean
     isReschedulable: Boolean
     noOfReschedulable: Number
   }
     
   type attachments{
     name: String
     info: String
     isMandatory: Boolean  
   }  
   type payment{
     amount: Number
     isDiscount: Boolean
     discountAmount: Boolean
     discountPercentage: Number
     isTaxInclusive: Boolean
     isPromoCodeApplicable: Boolean
   }
   type facilitationCharge{
      amount: Number
      percentage: Number
      derivedAmount: Number   
   }
   type Activity{
      userId: String
      profileId: String
      name: String
      displayName: String
      isInternal: Boolean
      isExternal: Boolean
      note: String
      noOfSession: Number
      sessionFrequency: String
      duration{
        hours:Number
        minutes:Number
      }
      isSessionCardEligible: Boolean
      session: [session]
      termsAndCondition: termsAndCondition
      attachments: [attachments]
      payment: payment 
      facilitationCharge: facilitationCharge
      createdAt: Date
      updatedAt: Date
   }
   
   
   input session{
       duration{
         hours:Number
         minutes:Number
       }
     activities: [String]
   }
     
   input termsAndCondition{
       isCancelable: Boolean
       isRefundable: Boolean
       isReschedulable: Boolean
       noOfReschedulable: Number
   }
     
   input attachments{
       name: String
       info: String
       isMandatory: Boolean  
   }  
   input payment{
       amount: Number
       isDiscount: Boolean
       discountAmount: Boolean
       discountPercentage: Number
       isTaxInclusive: Boolean
       isPromoCodeApplicable: Boolean
   }
   input facilitationCharge{
        amount: Number
        percentage: Number
        derivedAmount: Number   
   }
   input Task{
        userId: String
        profileId: String
        name: String
        displayName: String
        isInternal: Boolean
        isExternal: Boolean
        note: String
        noOfSession: Number
        sessionFrequency: String
        duration{
          hours:Number
          minutes:Number
        }
        isSessionCardEligible: Boolean
        session: [session]
        termsAndCondition: termsAndCondition
        attachments: [attachments]
        payment: payment 
        facilitationCharge: facilitationCharge
        createdAt: Date
        updatedAt: Date
   }
   
   
   
   
   type Query{
          fetchTasks:[Task]
          fetchTask(id:String):Task
   }
  
   type Mutation{
          createTask:response
          updateTask:response
   }
  `


  MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], task])

  let supportedApi = [
    {api:'fetchTasks', actionName:'READ', moduleName:"OFFICE"},
    {api:'fetchTask', actionName:'READ', moduleName:"OFFICE"},

    {api:'createTask', actionName:'CREATE', moduleName:"OFFICE"},
    {api:'updateTask', actionName:'UPDATE', moduleName:"OFFICE"},
  ]
  MlResolver.MlModuleResolver.push(supportedApi)
