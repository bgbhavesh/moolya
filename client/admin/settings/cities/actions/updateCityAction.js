import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateCityActionHandler(CityDetails) {
  let cityId = CityDetails.id;

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
      city:CityDetails
    }
  })
  console.log(result)
  const id = result.data.updateCity;
  return id
}
