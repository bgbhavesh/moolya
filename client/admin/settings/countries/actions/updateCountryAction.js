import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateCountryActionHandler(CountryDetails) {
  let countryId = CountryDetails.id;
  let country = CountryDetails.country;
  let countryCode = CountryDetails.countryCode;
  let displayName = CountryDetails.displayName;
  let about = CountryDetails.about;
  let url = CountryDetails.url;
  let isActive = CountryDetails.isActive;
  let lat = CountryDetails.lat;
  let lng = CountryDetails.lng;

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
