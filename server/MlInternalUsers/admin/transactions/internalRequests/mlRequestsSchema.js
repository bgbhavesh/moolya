import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef';


let requestsSchema = ` 
        type requests{
        _id                       : String
        status                    : String
        transactionTypeName       : String
        transactionTypeId         : String
        requestId                 : String
        userId                    : String
        requestTypeName           : String
        requestTypeId             : String
        requestDescription        : String
        transactionAssignedBy     : String
        transactionCompletedBy    : String
        transactionCreatedDate       : String
        transactionUpdatedDate    : String
        hierarchy                 : String
        cluster                   : String
        chapter                   : String
        subChapter                : String
        community                 : String
        }
        
        
        
        
      input byInput{
      type                      : String
      id                        : String
      }
    
    
      input trailInput{
      statusCode                : String
      statusDescription         : String
      at                        : String
      by                        : byInput
      }
      
      input statusInput{
      code                      : String
      description               : String
      trail                     : [trailInput]
      }

        input requestsInput{
        status                    : String
        transactionTypeName       : String
        transactionTypeId         : String
        requestId                 : String
        userId                    : String
        requestTypeName           : String
        requestTypeId             : String
        requestDescription        : String
        transactionAssignedBy     : String
        transactionCompletedBy    : String
        requestsStatus            : statusInput
        transactionCreatedDate       : String
        transactionUpdatedDate    : String
        hierarchy                 : String
        cluster                   : String
        chapter                   : String
        subChapter                : String
        community                 : String
      }
    type Mutation{
      createRequestss(requests:requestsInput):response
      updateRequestsStatus(requestsId:String,status:String):response

      }

    type Query{
      fetchRequestss(userId: String ): [requests]
      fetchRequestsForApproval(transactionType:String):[requests]

    }`;

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], requestsSchema]);
