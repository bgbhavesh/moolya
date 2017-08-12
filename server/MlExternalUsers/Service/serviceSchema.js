/**
 * Created by Mukhil on 14/6/17.
 */

import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'
import MlResolver from "../../commons/mlResolverDef";


let service=`
  type ServiceFacilitationCharge {
     type: String
     amount: Float
  }
  type Attachments {
     name: String
     info: String
     isMandatory: Boolean
     fileUrl : [String]
  }
  type ServicePayment {
     tasksAmount: Float
     tasksDiscount: Float
     tasksDerived: Float
     isDiscount: Boolean
     discountType: String
     discountValue: Float
     isTaxInclusive: Boolean
     isPromoCodeApplicable: Boolean
  }
  type TermsAndCondition {
     isCancelable: Boolean
     noOfDaysBeforeCancelation: Int
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
  
  type TotalTaskAmount{
    totalAmount: Float
  }
  
  type ServiceTaskSessions {
    id : String
    sequence: String 
  }
  
  type ServiceTask {
    id : String
    sequence: String
    sessions: [ServiceTaskSessions]
  }
  
  type PortfolioDetails{
    portfolioId: String
  }

  type Service {
    userId: String
    _id: String
    about: String
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
    tasks: [ServiceTask]
    facilitationCharge : ServiceFacilitationCharge
    createdAt: Date
    updatedAt: Date
    validTill: Date
    community: [Communities]
    subChapter: [SubChapters]
    city: [Cities]
    state: [States]
    cluster: Clusters
    isBeSpoke : Boolean
    finalAmount: Float
    mode : String
    beSpokeCreatorProfileId: String
    beSpokeCreatorUserId: String
    industryId : [String]
    conversation : [String]
    expectedInput : String
    expectedOutput : String
    isApproved: Boolean
    isLive: Boolean
    finalAmount:Float
  }
  
  type UserDetails{
    accountType: String
    chapterId: String
    chapterName: String
    cityId: String
    cityName: String
    clusterId: String
    clusterName: String
    communityDefCode: String
    communityDefName: String
    communityId: String
    communityName: String
    communityType: String
    countryId: String
    countryName: String
    identityType: String
    isActive: Boolean
    isApprove: Boolean
    isDefault: Boolean
    mobileNumber: String
    optional: Boolean
    profileId: String
    registrationId: String
    subChapterId: String
    subChapterName: String
    userType: String
  }
  
  type AdminService{
    userId: String
    email: String
    _id: String
    about: String
    profileId: String
    name: String
    displayName: String
    noOfSession: Int
    sessionFrequency: String
    duration: Duration
    status: Boolean
    transactionId: String
    termsAndCondition: TermsAndCondition
    attachments: [Attachments]
    payment: ServicePayment
    tasks: [ServiceTask]
    facilitationCharge : ServiceFacilitationCharge
    createdAt: Date
    updatedAt: Date
    validTill: Date
    finalAmount: Float
    community: [Communities]
    subChapter: [SubChapters]
    city: [Cities]
    state: [States]
    cluster: Clusters
    isBeSpoke : Boolean
    mode : String
    industryId : [String]
    beSpokeCreatorProfileId: String
    beSpokeCreatorUserId: String
    conversation : [String]
    expectedInput : String
    expectedOutput : String
    isApproved: Boolean
    userDetails: UserDetails
    finalAmount:Float
  }

   input serviceFacilitationCharge {
       type: String
       amount: Float
   }

   input attachments {
       name: String
       info: String
       isMandatory: Boolean
       fileUrl : [String]
   }

   input servicepayment {
       tasksAmount: Float
       tasksDiscount: Float
       tasksDerived: Float
       isDiscount: Boolean
       discountType: String
       discountValue: Float
       isTaxInclusive: Boolean
       isPromoCodeApplicable: Boolean
   }

   input termsAndCondition {
       isCancelable: Boolean
       noOfDaysBeforeCancelation: Int
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
  
  input serviceTaskSessions {
    id : String
    sequence: String 
  }
  
  input serviceTask {
    id : String
    sequence: String
    sessions: [serviceTaskSessions]
  }

   input service {
        _id: String
        userId: String
        profileId: String
        about: String
        name: String
        displayName: String
        noOfSession: Int
        sessionFrequency:String
        duration: duration
        status: Boolean
        termsAndCondition: termsAndCondition
        attachments: [attachments]
        payment: servicepayment
        tasks: [serviceTask]
        facilitationCharge : serviceFacilitationCharge
        createdAt: Date
        updatedAt: Date
        validTill: Date
        finalAmount: Float
        community: [communities]
        subChapter: [subChapters]
        city: [cities]
        state:[states]
        cluster: clusters
        isBeSpoke : Boolean
        mode : String
        beSpokeCreatorProfileId: String
        beSpokeCreatorUserId: String
        industryId : [String]
        conversation : [String]
        expectedInput : String
        expectedOutput : String
        isApproved: Boolean
        finalAmount:Float
   }
   
   input userServiceCardPaymentInfo {
        orderId: String
        amount: Float
        paymentId: String
        paymentMethod: String
        curencyCode: String
   }

   type Query {
        fetchUserServices(profileId:String):[Service]
        fetchBeSpokeServices(portfolioId:String):[Service]
        findService(serviceId:String):Service
        fetchTasksAmount(profileId:String):[TotalTaskAmount]
        getProfileBasedOnPortfolio(portfolioId:String): PortfolioDetails
        getServiceBasedOnServiceId(serviceId:String, clusterId: String, chapterId: String, subChapterId: String, communityId: String): AdminService
        getTaskFromService(serviceId:String):Service
        fetchServicesForAppointments: [Service]
   }

   type Mutation {
        createService(Services:service):response
        createBeSpokeService(Services:service, portfolioId: String):response
        updateBeSpokeService(Services:service, portfolioId: String):response
        updateServiceGoLive(serviceId:String!):response
        updateServiceSendReview(serviceId:String!):response
        updateService(serviceId:String,Services:service):response
        updateServiceAdmin(serviceId:String,Services:service):response
        createServiceCardOrder(serviceId: String!, taskDetails: [tasks]):response
        updateServiceCardOrder(userServiceCardPaymentInfo: userServiceCardPaymentInfo):response
   }
`;


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], service]);

let supportedApi = [
  {api:'fetchUserServices',           actionName:'READ',    moduleName:"SERVICECARD", isAppWhiteList:true},
  {api:'findService',                 actionName:'READ',    moduleName:"SERVICECARD", isAppWhiteList:true},
  {api:'fetchTasksAmount',            actionName:'READ',    moduleName:"SERVICECARD", isAppWhiteList:true},
  {api:'getProfileBasedOnPortfolio',  actionName:'READ',    moduleName:"SERVICECARD", isAppWhiteList:true},
  {api:'getTaskFromService',          actionName:'READ',    moduleName:"SERVICECARD", isAppWhiteList:true},
  {api:'fetchBeSpokeServices',        actionName:'READ',    moduleName:"SERVICECARD", isAppWhiteList:true},
  {api:'createService',               userAction:"CREATESERVICEDEF", actionName:'CREATE',  resourceName:"SERVICECARD"},
  {api:'updateService',               userAction:"UPDATESERVICEDEF", actionName:'UPDATE',  resourceName:"SERVICECARD"},
  {api:'updateServiceGoLive',         userAction:"UPDATESERVICEDEF", actionName:'UPDATE',  resourceName:"SERVICECARD"},
  {api:'updateServiceSendReview',     userAction:"UPDATESERVICEDEF", actionName:'UPDATE',  resourceName:"SERVICECARD"},
  {api:'updateServiceAdmin',          actionName:'UPDATE',  moduleName:"SERVICECARD"},
  {api:'createServiceCardOrder',      userAction:"CREATESERVICEORDER", actionName:'CREATE',  resourceName:"SERVICECARD"},
  {api:'updateServiceCardOrder',      userAction:"UPDATESERVICEORDER", actionName:'UPDATE',  resourceName:"SERVICECARD"},

  {api:'getServiceBasedOnServiceId',  actionName:'READ',    moduleName:"SERVICECARD", isWhiteList:true},
  {api:'fetchServicesForAppointments',  actionName:'READ',    resourceName:"SERVICECARD", isWhiteList:true}

]

MlResolver.MlModuleResolver.push(supportedApi)
/**note: removed white list from UPDATE*/
  // , isWhiteList:true
