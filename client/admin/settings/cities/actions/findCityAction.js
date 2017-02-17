import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findCityActionHandler(CountryId) {
  let did = CountryId;

  const result = await client.query({
    query: gql`
    query ($id: String){
      fetchCities(countryId:$id) {
        _id
        name
        countryCode
        stateId
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
