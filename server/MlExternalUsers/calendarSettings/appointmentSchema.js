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
  
  type Query {   
     fetchMyAppointment: [Appointment]
     fetchAllProfileAppointmentCounts: profileAppointment
     fetchProfileAppointmentCounts( profileId: String ): profileAppointment
  }
  
  type Mutation {
     bookUserServiceCard(serviceId: String!, taskDetails: [tasks]):response
     userServiceCardPayment(userServiceCardPaymentInfo: userServiceCardPaymentInfo): response
     bookUserServiceCardAppointment(userServiceCardAppointmentInfo: userServiceCardAppointmentInfo!): response
  }
`;


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], appointment]);
let supportedApi = [
  {api:'bookUserServiceCard', actionName:'CREATE', moduleName:"OFFICE", isWhiteList:true},
  {api:'userServiceCardPayment', actionName:'CREATE', moduleName:"OFFICE", isWhiteList:true},
  {api:'bookUserServiceCardAppointment', actionName:'CREATE', userAction:"CREATEAPPOINTMENT", resourceName:"SERVICECARD", isWhiteList:true},
];
MlResolver.MlModuleResolver.push(supportedApi);
