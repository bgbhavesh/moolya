/**
 * Created by Mukhil on 14/6/17.
 */
  import {mergeStrings} from 'gql-merge';
  import MlSchemaDef from '../../commons/mlSchemaDef'
  import MlResolver from "../../commons/mlResolverDef";

  let task=`
   type Attachments {
     name: String
     info: String
     isMandatory: Boolean
   }

   type Payment {
     amount: Int
     isDiscount: Boolean
     discountType : String
     discountValue : Int
     activitiesDerived: Int
     activitiesDiscount: Int
     activitiesAmount: Int
     derivedAmount :Int
   }

   type FacilitationCharge {
      amount: Int
      percentage: Int
      derivedAmount: Int
   }

   type Duration {
        hours:Int
        minutes:Int
   }
  
   type Session{
       sessionId : String
       duration : Duration
       activities: [String]
   }

   type Task {
      _id: String
      userId: String
      profileId: String
      name: String
      displayName: String
      isInternal: Boolean
      isExternal: Boolean
      note: String
      noOfSession: Int
      sessionFrequency: String
      duration: Duration
      isServiceCardEligible: Boolean
      session: [Session]
      attachments: [Attachments]
      payment: Payment
      facilitationCharge: FacilitationCharge
      createdAt: Date
      updatedAt: Date
      isActive: Boolean
   }

   type TaskSession{
       sessionId : String
       duration : Duration
       activities: [TaskActivity]
   }
 
   type TaskActivity {
     _id: String
     mode: String
     name: String
     displayName: String
     duration : Duration
   }
   type ServiceTask {
      _id: String
      userId: String
      profileId: String
      name: String
      displayName: String
      isInternal: Boolean
      isExternal: Boolean
      note: String
      noOfSession: Int
      sessionFrequency: String
      duration: Duration
      isServiceCardEligible: Boolean
      session: [TaskSession]
      attachments: [Attachments]
      payment: Payment
      facilitationCharge: FacilitationCharge
      createdAt: Date
      updatedAt: Date
      isActive: Boolean
   }
   
   input session{
       sessionId : String
       duration : duration
       activities: [String]
   }

   input attachments {
       name: String
       info: String
       isMandatory: Boolean
   }
   
   input payment {
       amount: Int
       isDiscount: Boolean
       discountType : String
       discountValue : Int
       activitiesDerived: Int
       activitiesDiscount: Int
       activitiesAmount: Int
       derivedAmount :Int
   }
   
   input facilitationCharge {
        amount: Int
        percentage: Int
        derivedAmount: Int
   }
   input duration {
       hours:Int
       minutes:Int
   }
   input task {
        userId: String
        profileId: String
        name: String
        displayName: String
        isInternal: Boolean
        isExternal: Boolean
        note: String
        noOfSession: Int
        sessionFrequency: String
        duration: duration
        isServiceCardEligible: Boolean
        session: [session]
        attachments: [attachments]
        payment: payment
        facilitationCharge: facilitationCharge
        createdAt: Date
        updatedAt: Date
        isActive: Boolean
   }

   type Query{
          fetchTasks(profileId:String):[Task]
          fetchTask(taskId:String):Task
          fetchTaskDetails(name: String):Task
          fetchTaskDetailsAdmin(name: [String]): [Task]
          fetchTaskDetailsForServiceCard(profileId:String, serviceId: String):[ServiceTask]
          fetchTaskDetailsForAdminServiceCard(profileId:String, serviceId: String):[ServiceTask]
          fetchTasksInBooking(id: [String]): [Task]
          fetchTaskForApointment(taskId: String): ServiceTask
   }

   type Mutation {
          createTask(taskDetails:task):response
          updateTask(taskId:String, taskDetails:task):response
   }
  `


  MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], task])

  let supportedApi = [
    {api:'fetchTasks', actionName:'READ', moduleName:"OFFICE", isAppWhiteList: true},
    {api:'fetchTaskDetails', actionName:'READ', moduleName:"OFFICE", isAppWhiteList: true},
    {api:'fetchTask', actionName:'READ', moduleName:"OFFICE", isAppWhiteList: true},
    {api:'fetchTaskDetailsForServiceCard', actionName:'READ', moduleName:"OFFICE", isAppWhiteList: true},
    {api:'fetchTaskDetailsForAdminServiceCard', actionName:'READ', moduleName:"OFFICE", isAppWhiteList: true},
    {api:'fetchTaskDetailsAdmin', actionName:'READ', moduleName:"OFFICE", isAppWhiteList: true},
    {api:'fetchTasksInBooking', actionName:'READ', moduleName:"OFFICE", isAppWhiteList: true},
    {api:'createTask', actionName:'CREATE', moduleName:"OFFICE", isAppWhiteList: true},
    {api:'updateTask', actionName:'UPDATE', moduleName:"OFFICE", isAppWhiteList: true},
    {api:'fetchTaskForApointment', actionName:'READ', moduleName:"OFFICE", isAppWhiteList: true},
  ]
  MlResolver.MlModuleResolver.push(supportedApi)
// termsAndCondition: TermsAndCondition

// type TermsAndCondition {
//   isCancelable: Boolean
//   isRefundable: Boolean
//   isReschedulable: Boolean
//   noOfReschedulable: Int
// }

// input termsAndCondition {
//   isCancelable: Boolean
//   isRefundable: Boolean
//   isReschedulable: Boolean
//   noOfReschedulable: Int
// }
// termsAndCondition: termsAndCondition
