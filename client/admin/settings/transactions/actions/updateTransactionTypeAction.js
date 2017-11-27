import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateTransactionTypeActionHandler(TransactionType) {
  const _id = TransactionType.id;
  const transactionName = TransactionType.transactionName;
  const transactionDisplayName = TransactionType.transactionDisplayName;
  const transactionDescription = TransactionType.transactionDescription;
  const isActive = TransactionType.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$transactionName: String, $transactionDisplayName: String, $transactionDescription: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        UpdateTransaction(
          _id:$_id
          transactionName: $transactionName,
          transactionDisplayName: $transactionDisplayName,
          transactionDescription: $transactionDescription,
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
      _id,
      transactionName,
      transactionDisplayName,
      transactionDescription,
      isActive,
      moduleName: 'TRANSACTION',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.UpdateTransaction;
  return id
}
