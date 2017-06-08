/**
 * Created by venkatsrinag on 6/6/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'

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
        stageId:String
    }
    
    type Actions{
        actionId:String
    }
    
    type StageActions{
        actionId:String,
        actionType:String,
        isActive:Boolean
    }
    
    type ProcessSteps{
        stageId:String,
        stageActions:[StageActions]
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
    }
    
    
    
    type Mutation{
        createProcessTransaction(processTransactions:processTransactions):response
        createProcessSetup(processTransactionId:String, processSteps:[processSteps]):response
        updateProcessTransaction(processTransactionId:String, processTransactions:processTransactions):response
    }
    
    type Query{
        fetchProcessTransactions:[ProcessTransactions]
        fetchProcessStages:[Stages]
        fetchProcessActions:[Actions]
        fetchProcessTransactionCustomerDetails(processTransactionId:String):CustomerDetails
        fetchProcessSetup(processTransactionId:String):[ProcessSteps]
    }
`


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],investments]);
