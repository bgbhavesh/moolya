/**
 * Created by pankaj on 18/6/17.
 */
import gql from "graphql-tag";
import {appClient} from "../../core/appConnection";

export async function updateStageActionHandler(stageId,stage) {
  const result = await appClient.mutate({
    mutation: gql`
      mutation($stageId:String,$stage:stage){
        updateStage(stageId:$stageId,stage:$stage){
          success
          result
        }
      }
    `,
    variables: {
      stageId:stageId,
      stage: stage
    },
    forceFetch: true
  })
  const id = result.data.updateStage;
  return id
}
