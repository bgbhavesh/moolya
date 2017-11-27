import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findBusinessTypeActionHandler(BusinessTypeId) {
  const did = BusinessTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindBusinessType(_id:$id){
         id:_id
        businessTypeName
        businessTypeDisplayName
        isActive
        about
      }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const id = result.data.FindBusinessType;
  return id
}
