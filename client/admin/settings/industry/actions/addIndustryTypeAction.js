import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addIndustryActionHandler(IndustryDetails) {
  const industryName = IndustryDetails.industryName;
  const industryDisplayName = IndustryDetails.industryDisplayName;
  const about = IndustryDetails.about;
  const isActive = IndustryDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($industryName: String, $industryDisplayName: String, $about: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        CreateIndustry(
          industryName: $industryName,
          industryDisplayName: $industryDisplayName,
          about: $about,
          isActive :$isActive,
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
      industryName,
      industryDisplayName,
      about,
      isActive,
      moduleName: 'INDUSTRY',
      actionName: 'CREATE'
    }
  })
  const id = result.data.CreateIndustry;
  return id
}
