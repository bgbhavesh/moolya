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
      transactionId :String
      totalAmountPaid: Int
      paymentMode: String
      promotionCode : String
      codeAmount : String
      promoCodeStatus : String
      voucherCode : String
      paymentStatus : String
      isPaid :Boolean
    }
    
    input orderSubscriptionDetail { 
      orderId : String
      SubscriptionName : String 
      SubscriptionCode : String
      cost : Int
      isTaxInclusive : Boolean
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
      dateTime       : Date
      userId         : String
      name           : String
      transactionId  : String
      clusterName    : String
      chapterName    : String
      subChapterName : String
      communityName  : String
      paymentDetails  : PaymentDetail
      status         : String
      action         : String
      userName       : String
      transactionType : String
      profileId      : String
      orderSubscriptionDetails : OrderSubscriptionDetail
    }
    
    type PaymentDetail {
      datetime : Date
      transactionId :String
      totalAmountPaid: Int
      paymentMode: String
      promotionCode : String
      codeAmount : String
      promoCodeStatus : String
      voucherCode : String
      paymentStatus : String
      isPaid :Boolean
    }
    
     type OrderSubscriptionDetail { 
      orderId : String
      SubscriptionName : String 
      SubscriptionCode : String
      cost : Int
      isTaxInclusive : Boolean
      about : String
    }
    
    type myTransaction {
      userId: String
      createdAt: String
      transactionId: String
      username: String
      firstName: String
      lastName: String
      transactionType: String
    }

    
    type Query {
      findOfficeTransaction(officeTransactionId:String, clusterId: String, chapterId: String, subChapterId: String, communityId: String):response
      findAllTransaction : [myTransaction]
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
  {api: 'officeTransactionPayment', actionName: 'UPDATE', moduleName: "OFFICE"},
  {api: 'findAllTransaction', actionName: 'READ', moduleName: "OFFICE"},
]
MlResolver.MlModuleResolver.push(supportedApi)
// findOfficeTransaction(officeTransactionId:String):response    /* updated with all admin data context*/
