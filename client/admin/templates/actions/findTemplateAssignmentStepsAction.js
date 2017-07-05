import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function findTemplateStepsActionHandler(subProcessId) {
  console.log(subProcessId)
  const result = await client.query({
    query: gql`
    query  ($id: String){
         findTemplateSteps(id:$id)  {
         steps {
           stepId
           stepCode
           stepName
           isActive
         }
  }
}
    `,
    variables: {
      id:subProcessId
    },
    forceFetch:true
  })
  const id = result.data.findTemplateSteps;
  return id
}
