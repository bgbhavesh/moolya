import gql from 'graphql-tag'
import {client} from '../../admin/core/apolloConnection';

export async function findStepTemplatesInfoActionHandler(subProcessId,code) {
  let sid       = subProcessId
  const result  = await client.query({
    query: gql`
   query  ($id: String,$stepCode:String){
        findStepAssignedTemplates(id:$id,stepCode:$stepCode){
            process           
            subProcess  
            createdBy        
            createdDate       
            clusterId        
            chapterId        
            subChapterId 
            communityId 
            userType         
            identityType   
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
      id:sid,
      stepCode:code
    },
    forceFetch:true
  })
  const id = result.data.findStepAssignedTemplates;
  return id
}
