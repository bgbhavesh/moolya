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
    
    input processTranscations{
        status:String,
        action:String,
        progress:Int
        paymentDetails:paymentDetails
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
        transcationId:String,
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
    
    type ProcessTranscations{
        _id:String,
        status:String,
        action:String,
        progress:Int,
        paymentDetails:PaymentDetails
    }
    
    
    
    type Mutation{
        createProcessTranscation:response
        createProcessSetup(processTranscationId:String, processSteps:[processSteps]):response
        updateProcessTranscation(processTranscationId:String, processTranscations:processTranscations):response
    }
    
    type Query{
        fetchProcessTranscations:[ProcessTranscations]
        fetchProcessStages:[Stages]
        fetchProcessActions:[Actions]
        fetchProcessTranscationCustomerDetails(processTranscationId:String):CustomerDetails
        fetchProcessSetup(processTranscationId:String):[ProcessSteps]
    }
`


MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],investments]);
