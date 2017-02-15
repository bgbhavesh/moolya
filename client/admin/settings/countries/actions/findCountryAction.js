import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findCountryActionHandler(CountryId) {
  let did = CountryId;

  const result = await client.query({
    query: gql`
    query ($id: String){
      fetchCountry(_id: $id,) {
        id:_id
        country
        countryCode
        isActive
      }
    }  
    `,
    variables: {
      id:did
    }
  })
  console.log(result)
  const id = result.data.fetchCountry;
  return id
}
