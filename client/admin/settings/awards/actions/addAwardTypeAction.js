import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addAwardActionHandler(AwardDetails) {
  const awardName = AwardDetails.awardName;
  const awardDisplayName = AwardDetails.awardDisplayName;
  const about = AwardDetails.about;
  const isActive = AwardDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($awardName: String, $awardDisplayName: String, $about: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        CreateAward(
          awardName: $awardName,
          awardDisplayName: $awardDisplayName,
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
      awardName,
      awardDisplayName,
      about,
      isActive,
      moduleName: 'AWARDS',
      actionName: 'CREATE'
    }
  })
  const id = result.data.CreateAward;
  return id
}
