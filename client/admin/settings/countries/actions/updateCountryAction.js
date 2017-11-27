import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateCountryActionHandler(CountryDetails) {
  const countryId = CountryDetails.id;

  const result = await client.mutate({
    mutation: gql`
    mutation updateCountry($countryId:String, $country: countryObject, $moduleName:String, $actionName:String){
      updateCountry(
        countryId:$countryId,
        country: $country,
        moduleName:$moduleName,
        actionName:$actionName
      ){
            success,
            code,
            result
        } 
      }
    `,
    variables: {
      countryId,
      country: CountryDetails,
      moduleName: 'COUNTRIES',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.updateCountry;
  return id
}
