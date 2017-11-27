import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateIndustryTypeActionHandler(IndustryType) {
  const _id = IndustryType.id;
  const industryName = IndustryType.industryName;
  const industryDisplayName = IndustryType.industryDisplayName;
  const about = IndustryType.about;
  const isActive = IndustryType.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$industryName: String, $industryDisplayName: String, $about: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        UpdateIndustry(
          _id:$_id
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
      _id,
      industryName,
      industryDisplayName,
      about,
      isActive,
      moduleName: 'INDUSTRY',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.UpdateIndustry;
  return id
}
