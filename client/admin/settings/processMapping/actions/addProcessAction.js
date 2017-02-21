import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addProcessActionHandler(ProcessInput) {
  const result = await client.mutate({
    mutation: gql`
     mutation ($ProcessInput :processInput){
        createProcess(
          process : $ProcessInput
        )
      } `,
    variables: {
     ProcessInput
    }
  })
  const id = result.data.createProcess;
  return id
}
