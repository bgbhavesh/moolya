import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addStageOfCompanyActionHandler(StageOfCompanyDetails) {
  const stageOfCompanyName = StageOfCompanyDetails.stageOfCompanyName;
  const stageOfCompanyDisplayName = StageOfCompanyDetails.stageOfCompanyDisplayName;
  const about = StageOfCompanyDetails.about;
  const isActive = StageOfCompanyDetails.isActive;

  const result = await client.mutate({
    mutation: gql`
    mutation  ($stageOfCompanyName: String, $stageOfCompanyDisplayName: String, $about:String, $isActive: Boolean, $moduleName:String, $actionName:String){
        CreateStageOfCompany(
          stageOfCompanyName: $stageOfCompanyName,
          stageOfCompanyDisplayName: $stageOfCompanyDisplayName,
          about:$about,
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
      stageOfCompanyName,
      stageOfCompanyDisplayName,
      about,
      isActive,
      moduleName: 'STAGEOFCOMPANY',
      actionName: 'CREATE'
    }
  })
  const id = result.data.CreateStageOfCompany;
  return id
}
