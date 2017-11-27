import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findCityActionHandler(Id) {
  const did = Id;

  const result = await client.query({
    query: gql`
    query ($id: String){
      fetchCity(cityId:$id) {
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
      id: did
    },
    forceFetch: true
  })
  const id = result.data.fetchCity;
  return id
}
