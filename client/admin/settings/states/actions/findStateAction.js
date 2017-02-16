import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findStateActionHandler(CountryId) {
  let did = CountryId;

  const result = await client.query({
    query: gql`
    query ($id: String){
      fetchStates(countryId:$id) {
        _id
        name
        countryCode
        displayName
        about
        isActive
      }
    }  
    `,
    variables: {
      id:did
    }
  })
  console.log(result)
  const id = result.data;
  return id
}
