import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateProcessActionHandler(pid,process) {
   pid = pid;
   const result = await client.mutate({
   mutation: gql`
   mutation  ($pid:String, $process: processInput){
       updateProcess(
       id: $pid,
       process: $process,
       )
   }
   `,
   variables: {
     pid,
     process
   }
   })
  console.log(result)
  const id = result;
  return id
}
