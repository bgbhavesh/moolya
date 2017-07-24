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
  
  type Query {   
     
  }
  
  type Mutation {
     bookUserServiceCard(serviceId: String!, taskDetails: [tasks]):response
     userServiceCardPayment(userServiceCardPaymentInfo: userServiceCardPaymentInfo): response
     bookUserServiceCardAppointment(userServiceCardAppointmentInfo: userServiceCardAppointmentInfo!): response
  }
`;


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], appointment]);
let supportedApi = [
  {api:'bookUserServiceCard', actionName:'CREATE', moduleName:"OFFICE"},
  {api:'userServiceCardPayment', actionName:'CREATE', moduleName:"OFFICE"},
  {api:'bookUserServiceCardAppointment', actionName:'CREATE', userAction:"CREATEAPPOINTMENT", resourceName:"SERVICECARD"},
];
MlResolver.MlModuleResolver.push(supportedApi);
