/**
 * Created by vishwadeep on 19/6/17.
 */
import gql from 'graphql-tag'

import {appClient} from '../../../../core/appConnection'

export async function createTaskActionHandler(details) {
  const result = await appClient.mutate({
    mutation: gql`
          mutation  ($taskDetails:task){
              createTask(taskDetails:$taskDetails){
                  success,
                  code,
                  result
              }  
          }
      `,
    variables: {
      taskDetails : details
    }
  })
  const resp = result.data.createTask;
  return resp;
}

