import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findStateActionHandler(Id) {
  const did = Id;

  const result = await client.query({
    query: gql`
    query ($id: String){
      fetchState(stateId:$id) {
        _id
        name
        countryId
        countryCode
        countryName
        displayName
        about
        isActive
      }
    }  
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const id = result.data.fetchState;
  return id
}
