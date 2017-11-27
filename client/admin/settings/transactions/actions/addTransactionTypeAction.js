import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addTransactionActionHandler(TransactionDetails) {
  const transactionName = TransactionDetails.transactionName;
  const transactionDisplayName = TransactionDetails.transactionDisplayName;
  const transactionDescription = TransactionDetails.transactionDescription;
  const createdDateTime = TransactionDetails.createdDateTime;
  const isActive = TransactionDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($transactionName: String, $transactionDisplayName: String, $transactionDescription: String, $createdDateTime: String, $isActive: Boolean, $moduleName:String, $actionName:String){
        CreateTransaction(
          transactionName: $transactionName,
          transactionDisplayName: $transactionDisplayName,
          transactionDescription: $transactionDescription,
          createdDateTime: $createdDateTime,
          isActive :$isActive,
          moduleName:$moduleName,
          actionName:$actionName
        ){
            success,
            code,
            result
        }  
      }
    `,
    variables: {
      transactionName,
      transactionDisplayName,
      transactionDescription,
      createdDateTime,
      isActive,
      moduleName: 'TRANSACTION',
      actionName: 'CREATE'
    }
  })
  const id = result.data.CreateTransaction;
  return id
}
