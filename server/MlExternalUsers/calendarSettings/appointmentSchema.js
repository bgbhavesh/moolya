/**
 * Created by pankaj on 26/6/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../commons/mlSchemaDef'
import MlResolver from "../../commons/mlResolverDef";

let appointment=`
  
  input userServiceCardPaymentInfo {
    orderId: String!,
    paymentId: String,
    paymentMethod: String,
    amount: Int,
    currencyCode: String
  }
  
  input Documents {
    fileName: String
    fileUrl: String
  }

  
  input tasks {
    taskId: String
    documents:[Documents] 
  }
  
  input userServiceCardAppointmentInfo {
    orderId: String!
    sessionId: String!
    hours: Int!
    minutes: Int!
    day: Int!
    month: Int!
    year: Int!
  }
  
  input appointmentExtraUser {
    userId: String
    profileId: String
  }
  
  input taskInternalAppointmentInfo {
    taskId: String!
    sessionId: String!
    hours: Int!
    minutes: Int!
    day: Int!
    month: Int!
    year: Int!
    extraUsers: [appointmentExtraUser] 
  }
  
  input appointmentDuration {
    hours: Int
    minutes: Int
  }
  
  input appointmentTaskInfo {
    profileId: String!
    name: String!
    mode: String
    about: String
    industries: [String]
    conversation: [String]
    duration: appointmentDuration!
    frequency: String
    expectedInput: String
    expectedOutput: String
  }
  
  input selfInternalAppointmentInfo {
    hours: Int!
    minutes: Int!
    day: Int!
    month: Int!
    year: Int!
    taskDetails: appointmentTaskInfo!
  }
  
  type AppointmentUser {
    userId: String
    profileId: String
  }
  
  type AppointmentInfo {
    resourceType: String
    resourceId: String
    serviceCardId: String
    serviceName: String
    taskId: String
    taskName: String
    sessionId: String
    serviceOrderId: String
  }
  
  type AllProfileAppointment {
    date: String
    userId: String
    profileId: String
    count: String
  }
  
  type Appointment {
    _id: String
    appointmentType: String
    appointmentId: String
    client: AppointmentUser
    provider: AppointmentUser
    appointmentInfo: AppointmentInfo
    startDate: Date
    endDate: Date
  }
  
  type appointmentEvents {
    date: String
    userId: String
    profileId: String
    count: String
  }
  
  type appointmentHolidays {
    isActive: Boolean
    start: String
    end: String
    type: String
  }
  
  type profileAppointment {
    events: [appointmentEvents]
    days: [appointmentHolidays]
  }
  
  type serviceSeekerList {
    name: String
    userId: String
    profileId: String
    transId: String
    orderId: String
    serviceId: String
  }
  
  type myAppointmentData {
    id: String
    type: String
    name: String
  }
  
  type myAppointmentsResponse {
    slot: String,
    appointments: [myAppointmentData]
  }
  
  type AppointmentDuration {
    hours: Int
    minutes: Int
  }
  
  type selfTask {
    _id: String
    profileId: String
    name: String
    mode: String
    about: String
    industries: [String]
    conversation: [String]
    duration: AppointmentDuration
    frequency: String
    expectedInput: String
    expectedOutput: String
  }
  type Query {
     fetchMyAppointmentByStatus(status: String): [Appointment]
     fetchAllProfileAppointmentCounts: profileAppointment
     fetchOfficeMemberAppointmentCounts(userId:String!, profileId:String!, month:Int, year: Int): profileAppointment
     fetchAllOfficeMemberAppointmentCounts(month:Int, year: Int): profileAppointment
     fetchProfileAppointmentCounts( profileId: String, month:Int, year: Int): profileAppointment
     fetchServiceSeekerList(profileId: String!, serviceId: String): [serviceSeekerList]
     fetchMyAppointment(userId: String, profileId: String!, day: Int, month: Int, year: Int): [myAppointmentsResponse]
     fetchSelfTask(selfTaskId: String): selfTask
  }
  
  type Mutation {
     bookUserServiceCard(serviceId: String!, taskDetails: [tasks]):response
     bookTaskInternalAppointment( taskInternalAppointmentInfo: taskInternalAppointmentInfo ) : response
     bookSelfTaskInternalAppointment( selfInternalAppointmentInfo: selfInternalAppointmentInfo ) : response
     userServiceCardPayment(userServiceCardPaymentInfo: userServiceCardPaymentInfo): response
     bookUserServiceCardAppointment(userServiceCardAppointmentInfo: userServiceCardAppointmentInfo!): response
     updateAppointmentByStatus(appointmentId: String, status: String): response
  }
`;


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], appointment]);
let supportedApi = [
  {api:'bookUserServiceCard', actionName:'CREATE', moduleName:"OFFICE", isWhiteList:true},
  {api:'userServiceCardPayment', actionName:'CREATE', moduleName:"OFFICE", isWhiteList:true},
  {api:'bookUserServiceCardAppointment', actionName:'CREATE', userAction:"CREATEAPPOINTMENT", resourceName:"SERVICECARD", isWhiteList:true},
  {api:'updateAppointmentByStatus', actionName:'UPDATE', resourceName:"SERVICECARD"},
];
MlResolver.MlModuleResolver.push(supportedApi);
