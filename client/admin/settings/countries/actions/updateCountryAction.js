import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateCountryActionHandler(CountryDetails) {
  let _id = CountryDetails.id;
  let country = CountryDetails.country;
  let countryCode = CountryDetails.countryCode;
  let url = CountryDetails.url;
  let isActive = CountryDetails.isActive;

  const result = await client.mutate({
    mutation: gql`
    mutation ($_id:String, $country: String, $countryCode: String, $url: String, $isActive: Boolean){
      updateCountry(
      _id:$_id,
      country: $country,
      countryCode: $countryCode,
      url: $url,
      isActive :$isActive,
      ) 
      }
    `,
    variables: {
      _id,
      country,
      countryCode,
      url,
      isActive
    }
  })
  console.log(result)
  const id = result.data.UpdateCountry;
  return id
}
