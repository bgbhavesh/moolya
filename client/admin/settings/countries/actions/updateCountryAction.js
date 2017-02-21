import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateCountryActionHandler(CountryDetails) {
  let countryId = CountryDetails.id;

  const result = await client.mutate({
    mutation: gql`
    mutation updateCountry($countryId:String, $country: countryObject){
      updateCountry(
        countryId:$countryId,
        country: $country
      ) 
      }
    `,
    variables: {
      countryId:countryId,
      country:CountryDetails
    }
  })
  console.log(result)
  const id = result.data.updateCountry;
  return id
}
