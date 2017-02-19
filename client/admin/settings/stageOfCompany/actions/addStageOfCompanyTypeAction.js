import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addStageOfCompanyActionHandler(StageOfCompanyDetails) {
  let stageOfCompanyName = StageOfCompanyDetails.stageOfCompanyName;
  let stageOfCompanyDisplayName = StageOfCompanyDetails.stageOfCompanyDisplayName;
  let about = StageOfCompanyDetails.about;
  let isActive = StageOfCompanyDetails.isActive;

  const result = await client.mutate({
    mutation: gql`
    mutation  ($stageOfCompanyName: String, $stageOfCompanyDisplayName: String, $about:String, $isActive: Boolean){
        CreateStageOfCompany(
          stageOfCompanyName: $stageOfCompanyName,
          stageOfCompanyDisplayName: $stageOfCompanyDisplayName,
          about:$about,
          isActive :$isActive
        )
      }
    `,
    variables: {
      stageOfCompanyName,
      stageOfCompanyDisplayName,
      about,
      isActive
    }
  })
  const id = result.data.CreateStageOfCompany;
  return id
}
