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
     fileUrl : [String]
  }
  type ServicePayment {
     amount: Int
     tasksAmount: Int
     tasksDiscount: Int
     tasksDerived: Int
     isDiscount: Boolean
     discountType: String
     discountValue: Int
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
    totalAmount: Int
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
    facilitationCharge : FacilitationCharge
    createdAt: Date
    updatedAt: Date
    validTill: Date
    community: [Communities]
    subChapter: [SubChapters]
    city: [Cities]
    state: [States]
    cluster: Clusters
    isBeSpoke : Boolean
    mode : String
    beSpokeCreatorProfileId: String
    beSpokeCreatorUserId: String
    industryId : [String]
    conversation : [String]
    expectedInput : String
    expectedOutput : String
    isApproved: Boolean
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
    isBeSpoke : Boolean
    mode : String
    industryId : [String]
    beSpokeCreatorProfileId: String
    beSpokeCreatorUserId: String
    conversation : [String]
    expectedInput : String
    expectedOutput : String
    userDetails: UserDetails
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
       fileUrl : [String]
   }

   input servicepayment {
       amount: Int
       tasksAmount: Int
       tasksDiscount: Int
       tasksDerived: Int
       isDiscount: Boolean
       discountType: String
       discountValue: Int
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
        facilitationCharge : facilitationCharge
        createdAt: Date
        updatedAt: Date
        validTill: Date
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
    }

    type Query {
        fetchUserServices(profileId:String):[Service]
        fetchBeSpokeServices(portfolioId:String):[Service]
        findService(serviceId:String):Service
        fetchTasksAmount(profileId:String):[TotalTaskAmount]
        getProfileBasedOnPortfolio(portfolioId:String): PortfolioDetails
        getServiceBasedOnProfileId(profileId:String): AdminService
        getTaskFromService(serviceId:String):Service
    }

    type Mutation {
        createService(Services:service):response
        updateService(serviceId:String,Services:service):response
        updateServiceAdmin(serviceId:String,Services:service):response
    }
`;


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], service]);

let supportedApi = [
  {api:'fetchUserServices', actionName:'READ', moduleName:"OFFICE"},
  {api:'findService', actionName:'READ', moduleName:"OFFICE"},
  {api:'fetchTasksAmount', actionName:'READ', moduleName:"OFFICE"},
  {api:'getProfileBasedOnPortfolio', actionName:'READ', moduleName:"OFFICE"},
  {api:'getServiceBasedOnProfileId', actionName:'READ', moduleName:"OFFICE"},
  {api:'getTaskFromService', actionName:'READ', moduleName:"OFFICE"},
  {api:'fetchBeSpokeServices', actionName:'READ', moduleName:"OFFICE"},
  {api:'createService', actionName:'CREATE', moduleName:"OFFICE"},
  {api:'updateService', actionName:'UPDATE', moduleName:"OFFICE"},
  {api:'updateServiceAdmin', actionName:'UPDATE', moduleName:"OFFICE"}
]

MlResolver.MlModuleResolver.push(supportedApi)
