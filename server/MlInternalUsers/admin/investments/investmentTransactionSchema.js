/**
 * Created by venkatsrinag on 6/6/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'
import MlResolver from '../../../commons/mlResolverDef'

let investments = `

    input paymentDetails{
        subscriptionName:String,
        cost:Int,
        about:String,
        isTaxInclusive:Boolean,
        dateTime:Date,
        totalAmountPaid:Int,
        paymentMode:String,
        cardNumber:String,
        cardHolderName:String,
        promotionCode:String,
        codeAmount:String,
        promotionStatus:String,
        voucherCode:String,
        voucherAmount:String,
        voucherStatus:String,
        paymentStatus:String
        isPaid : Boolean
    }
    
    input stageActions{
        actionId:String,
        actionType:String,
        isActive:Boolean
    }
    
    input processSteps{
        stageId:String,
        stageActions:[stageActions]
        isActive:Boolean
    }
    
    input processSetup{
        userId:String,
        username:String,
        processTransactionId:String,
        processSteps:[processSteps],
        isActive:Boolean
    }
    
    input deviceDetails{
      deviceName:String,
      deviceId:String,
      ipAddress:String,
      location:String,
    }
    
    input processTransactions{
        status:String,
        action:String,
        progress:Int,
        paymentDetails:paymentDetails,
        deviceDetails:deviceDetails,
        transactionId:String,
        transactionType:String,
        userId:String,
        mobileNumber:String,
        communityType:String,
        communityCode:String,
        clusterId:String,
        chapterId:String,
        subChapterId:String,
        dateTime:Date,
        status:String,
        clusterName     : String,
        chapterName     : String,
        subChapterName  : String,
        communityName   : String
    }
    
    type PaymentDetails{
        subscriptionName:String,
        cost:Int,
        about:String,
        isTaxInclusive:Boolean,
        dateTime:Date,
        totalAmountPaid:Int,
        paymentMode:String,
        cardNumber:String,
        cardHolderName:String,
        promotionCode:String,
        codeAmount:String,
        promotionStatus:String,
        voucherCode:String,
        voucherAmount:String,
        voucherStatus:String,
        paymentStatus:String
        isPaid : Boolean
    }
    
    type CustomerDetails{
        userId:String,
        transactionId:String,
        datetime:Date,
        name:String,
        emailId:String,
        mobileNumber:Int,
        clusterName:String,
        chapterName:String,
        subChapterName:String,
        communityName:String
    }
    
    type Stages{
        _id:String
        name:String
        
    }
    
    type Actions{
        _id: String
        displayName :String
    }
    
    type StageActions{
        actionId:String,
        actionType:String,
        isActive:Boolean
    }
    
    type ProcessSteps{
        stageId:String,
        stateName : String
        stageActions:[StageActions]
        isActive:Boolean
    }
    
    type ProcessSetup{
        userId:String,
        username:String,
        processTransactionId:String,
        processSteps:[ProcessSteps],
        isActive:Boolean
    }
    
    type DeviceDetails{
      deviceName:String,
      deviceId:String,
      ipAddress:String,
      location:String,
    }
    
    type ProcessTransactions{
        _id:String,
        status:String,
        action:String,
        progress:Int,
        paymentDetails:PaymentDetails
        deviceDetails:DeviceDetails
        transactionType:String,
        transactionId:String,
        userId:String,
        mobileNumber:String,
        communityType:String,
        communityCode:String,
        clusterId:String,
        chapterId:String,
        subChapterId:String,
        dateTime:Date,
        status:String,
        clusterName     : String,
        chapterName     : String,
        subChapterName  : String,
        communityName   : String
        username:String,
        name:String
    }
    
    
    
    type Mutation{
        createProcessTransaction(processTransactions:processTransactions):response
        updateProcessSetup(processTransactionId:String, processSetup:processSetup):response
        updateProcessTransaction(processTransactionId:String, processTransactions:processTransactions):response
    }
    
    type Query{
        fetchProcessTransactions:[ProcessTransactions]
        fetchProcessStages:[Stages]
        fetchProcessActions:[Actions]
        fetchProcessTransactionCustomerDetails(processTransactionId:String):CustomerDetails
        fetchProcessSetup(processTransactionId:String):ProcessSetup
        fetchUserProcessSetup:ProcessSetup
    }
`


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],investments]);

let supportedApi = [
  {api:'updateProcessSetup', actionName:'UPDATE', moduleName:"PROCESSSETUP"},
  {api:'fetchProcessSetup', actionName:'READ', moduleName:"PROCESSSETUP"},
  {api:'fetchProcessActions', actionName:'READ', moduleName:"ACTIONS"},
  {api:'fetchProcessStages', actionName:'READ', moduleName:"PROCESSSETUP"},
  {api:'updateProcessTransaction', actionName:'UPDATE', moduleName:"PROCESSSETUP"},
  {api:'fetchUserProcessSetup', actionName:'READ', moduleName:"PROCESSSETUP"}
];
MlResolver.MlModuleResolver.push(supportedApi)
