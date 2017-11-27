import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findAccountTypeActionHandler(AccountTypeId) {
  const did = AccountTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindAccount(_id:$id){
         id:_id
        accountName
        accountDisplayName
        isActive
        accountDescription
      }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const id = result.data.FindAccount;
  return id
}
