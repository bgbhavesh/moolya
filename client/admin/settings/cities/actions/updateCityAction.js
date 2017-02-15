import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateCityActionHandler(CityDetails) {
  let cityId = CityDetails.id;
  let cityName = CityDetails.name;
  let countryCode = CityDetails.countryCode;
  let stateId = CityDetails.stateId;
  // let displayName = CityDetails.displayName;
  let isActive = CityDetails.isActive;

  let cityDetails = {
    _id: CityDetails.id,
    name: CityDetails.name,
    countryId:CityDetails.countryId,
    countryCode:CityDetails.countryCode,
    stateId : CityDetails.stateId,
    isActive:CityDetails.isActive
  }

  const result = await client.mutate({
    mutation: gql`
    mutation updateCity($cityId:String, $city: cityObject){
      updateCity(
        cityId:$cityId,
        city: $city
      ) 
      }
    `,
    variables: {
      cityId:cityId,
      city:cityDetails
    }
  })
  console.log(result)
  const id = result.data.updateCity;
  return id
}
