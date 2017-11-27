import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findProcessActionHandler(processId) {
  const result = await client.query({
    query: gql`
     query  ($id: String){
         findProcess(id:$id)  {
         documents{
             type,
          category,
          categoryName,
          isActive
        }
  }
}
    `,
    variables: {
      id: processId
    },
    forceFetch: true
  })
  const id = result.data.findProcess;
  return id
}
