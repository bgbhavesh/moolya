import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findCountryActionHandler(CountryId) {
  const did = CountryId;

  const result = await client.query({
    query: gql`
    query ($id: String){
      fetchCountry(countryId:$id) {
        _id
        country
        countryCode
        displayName
        about
        capital
        url
        isActive
      }
    }  
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const id = result.data.fetchCountry;
  return id
}
