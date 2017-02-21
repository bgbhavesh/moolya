import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateProcessActionHandler(pid,process) {

   const result = await client.mutate({
   mutation: gql`
   mutation  ($id:String, $process: processInput){
       updateProcess(
       id: $id,
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
