import gql from 'graphql-tag'
import {client} from '../../admin/core/apolloConnection';

export async function findTemplatesActionHandler(templateId) {
  let tid       = templateId
  const result  = await client.query({
    query: gql`
   query  ($id: String){
        findTemplates(id:$id){
        procesId
        subProcessId
        templates {
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
      id:tid
    },
    forceFetch:true
  })
  const id = result.data.findTemplates;
  return id
}
