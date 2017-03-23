import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findStepTemplatesActionHandler(subProcessId) {
  let sid=subProcessId
  const result = await client.query({
    query: gql`
   query  ($id: String){
        findStepAssignedTemplates(id:$id){
        process
        subProcess
        assignedTemplates {
          stepCode
          stepName
          templateCode
          templateName
          isActive
          createdDate
        } 
      }
      }
    `,
    variables: {
      id:sid
    },
    forceFetch:true
  })
  const id = result.data.findStepAssignedTemplates;
  return id
}
