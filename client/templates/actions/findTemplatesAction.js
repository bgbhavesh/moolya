import gql from 'graphql-tag'
import {client} from '../../admin/core/apolloConnection';

export async function findTemplatesActionHandler(templateId,code) {
  let tid       = templateId
  const result  = await client.query({
    query: gql`   
   query  ($id: String,$stepCode:String){
      findTemplates(id:$id,stepCode:$stepCode){
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
      id:tid,
      stepCode:code
    },
    forceFetch:true
  })
  const id = result.data.findTemplates;
  return id
}
