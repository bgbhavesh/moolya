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
  
  type Query {   
     
  }
  
  type Mutation {
     bookUserServiceCard(serviceId: String!):response
     userServiceCardPayment(userServiceCardPaymentInfo: userServiceCardPaymentInfo): response
  }
`;


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], appointment]);
let supportedApi = [
  // {api:'fetchMyCalendarSetting', actionName:'READ', moduleName:"OFFICE"}
];
MlResolver.MlModuleResolver.push(supportedApi);
