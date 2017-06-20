/**
 * Created by vishwadeep on 19/6/17.
 */
import gql from "graphql-tag";
import {appClient} from "../../../../core/appConnection";

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
      taskDetails: details
    }
  })
  const resp = result.data.createTask;
  return resp;
}

export async function createSessionActionHandler(taskId, details) {
  const result = await appClient.mutate({
    mutation: gql`
          mutation  ($taskDetails:task, $taskId: String){
              updateTask(taskDetails:$taskDetails, taskId:$taskId){
                  success,
                  code,
                  result
              }  
          }
      `,
    variables: {
      taskId: taskId,
      taskDetails: details
    }
  })
  const resp = result.data.updateTask;
  return resp;
}

export async function findTaskActionHandler(taskId) {
  const result = await appClient.query({
    query: gql`
          query  ($taskId: String){
            fetchTask(taskId: $taskId) {
              noOfSession
              sessionFrequency
            }
          }
      `,
    variables: {
      taskId: taskId
    }
  })
  const resp = result.data.fetchTask;
  return resp;
}
