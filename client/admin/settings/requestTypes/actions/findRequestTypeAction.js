import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findRequestTypeActionHandler(requestTypeId) {
 let did=requestTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindRequestType(_id:$id){
         id:_id
        requestName
        displayName
        isActive
        requestDesc
      }
      }
    `,
    variables: {
      id:did
    },
    fetchPolicy: 'cache-first'
  })
  const id = result.data.FindRequestType;
  return id
}
