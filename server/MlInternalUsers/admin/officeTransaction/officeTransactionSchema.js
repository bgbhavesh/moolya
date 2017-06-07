/**
 * Created by vishwadeep on 6/6/17.
 */
import {mergeStrings} from "gql-merge";
import MlSchemaDef from "../../../commons/mlSchemaDef";
import MlResolver from "../../../commons/mlResolverDef";

let officeTransaction = ` 
  
    input officeTransaction {
      officeId:String
      userId:String
      dateTime: Date
      transactionId :String
      status :String
      action :String
      transactionType :String
      paymentDetails: paymentDetail
      orderSubscriptionDetails : orderSubscriptionDetail
      deviceDetails : deviceDetail
    }
    
    input paymentDetail {
      datetime : Date
      transactionId :Date
      totalAmountPaid: String
      paymentMode: String
      promotionCode : String
      codeAmount : String
      promoCodeStatus : String
      voucherCode : String
      paymentStatus : Boolean
    }
    
    input orderSubscriptionDetail { 
      orderId : String
      SubscriptionName : String 
      SubscriptionCode : String
      cost : String
      isTaxInclusive : String
      about : String
    }
    
    input deviceDetail { 
      deviceName : String
      deviceId : String
      ipAddress : String
      location : String
    }
    
    type officeTransactionType {
      _id            : String
      dataAndTime    : Date
      userId         : String
      name           : String
      transactionId  : String
      clusterName    : String
      chapterName    : String
      subChapterName : String
      communityName  : String
      payment        : String
      status         : String
      action         : String
    }
    
    type Query {
      findOfficeTransaction(officeTransactionId:String):response
      findOfficeDetail(officeId:String):officeTransactionType
    }
    type Mutation {
      createOfficeTransaction(officeTransaction:officeTransaction):response
      updateOfficeTransactionOrderSubscriptionDetail(id: String, orderSubscriptionDetail:orderSubscriptionDetail):response
      officeTransactionPayment(officeId:String):response
    }
`;


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], officeTransaction]);
let supportedApi = [
  {api: 'createOfficeTransaction', actionName: 'CREATE', moduleName: "OFFICE"},
  {api: 'findOfficeTransaction', actionName: 'READ', moduleName: "OFFICE"},
  {api: 'updateOfficeTransactionOrderSubscriptionDetail', actionName: 'UPDATE', moduleName: "OFFICE"},
  {api: 'findOfficeDetail', actionName: 'READ', moduleName: "OFFICE"},
  {api: 'officeTransactionPayment', actionName: 'UPDATE', moduleName: "OFFICE"}
]
MlResolver.MlModuleResolver.push(supportedApi)
