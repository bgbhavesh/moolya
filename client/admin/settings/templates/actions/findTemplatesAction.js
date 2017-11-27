import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findStepTemplatesActionHandler(templateId, code) {
  const tid = templateId
  const result = await client.query({
    query: gql`
   query  ($id: String,$stepCode:String){
        findStepAssignedTemplates(id:$id,stepCode:$stepCode){
        procesId
        subProcessId
        templates {
          stepCode
          stepName
          templateCode
          templateName
          isActive
          createdDate
          templateImage
        } 
      }
      }
    `,
    variables: {
      id: tid,
      stepCode: code
    },
    forceFetch: true
  })
  const id = result.data.findStepAssignedTemplates;
  return id
}
