import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function upsertRegionalActionHandler(regionalDetails)
{
let regionalInfo=regionalDetails
 /* const result = await client.mutate({
    mutation: gql`
        mutation ($regional: regionalObject){
            createRegional(
                regional: $regional
            )
         }
        `,
    variables: {
      regional: Details
    }
  })
  console.log(result)*/
  const result = await client.mutate({
   mutation: gql`
   mutation($regionalInfo:RegionalInfoRequest){
     updateGlobalSetting(type:REGIONAL,settingsData:{regionalInfo:$regionalInfo})
   }
   `,
   variables: {
   regionalInfo
   }
   })
   console.log(result)

  const id = result.data.updateGlobalSetting;
  return id
}
