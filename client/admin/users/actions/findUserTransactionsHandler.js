/**
 * Created by RAJAT.
 */
/**
 * import of libs
 * */
import gql from "graphql-tag";
import {client} from "../../core/apolloConnection";

/**
 * @export of getting registration data with external user profile from users
 * this can be merged with the export of [registration action handler]
 * */
export async function findUserTransactions(registrationId, portfolioId) {
  const result = await client.query({
    query: gql`
   query($registrationId:String, $portfolioId:String){  
        findUserTransactionLogs(registrationId:$registrationId, portfolioId:$portfolioId){          
            _id
            status          
            transactionId          
            transactionType    
            createdAt
            cluster               
            chapter               
            subChapter            
            community
        }
      }
    `,
    variables: {
      registrationId: registrationId,
      portfolioId:portfolioId
    },
    forceFetch: true
  })
  const id = result.data.findUserTransactionLogs;
  return id
}
