/**
 * Created by vishwadeep on 13/6/17.
 */
import gql from "graphql-tag";
import {appClient} from "../../core/appConnection";

export async function findProcessSetupActionHandler() {
  const result = await appClient.query({
    query: gql`
    query{
      fetchUserProcessSetup {
        processTransactionId
          processSteps{
            stageId
            stageName
            stageActions{
              actionId
              isActive
            }
          isActive
        }
      }
    }
    `,
    forceFetch: true
  })
  const id = result.data.fetchUserProcessSetup;
  return id
}
