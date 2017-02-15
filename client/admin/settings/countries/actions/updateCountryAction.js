import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateCountryActionHandler(CountryDetails) {
  let countryId = CountryDetails.id;
  let country = CountryDetails.country;
  let countryCode = CountryDetails.countryCode;
  let displayName = CountryDetails.displayName;
  let url = CountryDetails.url;
  let isActive = CountryDetails.isActive;

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
  const id = result.data.UpdateCountry;
  return id
}
