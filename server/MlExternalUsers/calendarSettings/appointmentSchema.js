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
  
  input Documents{
    fileName: String
    fileUrl: String
  }

  
  input tasks{
    taskId: String
    documents:[Documents] 
  }
  
  type Query {   
     
  }
  
  type Mutation {
     bookUserServiceCard(serviceId: String!, taskDetails: [tasks]):response
     userServiceCardPayment(userServiceCardPaymentInfo: userServiceCardPaymentInfo): response
  }
`;


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], appointment]);
let supportedApi = [
  {api:'bookUserServiceCard', actionName:'CREATE', moduleName:"OFFICE"},
  {api:'userServiceCardPayment', actionName:'CREATE', moduleName:"OFFICE"},
];
MlResolver.MlModuleResolver.push(supportedApi);
