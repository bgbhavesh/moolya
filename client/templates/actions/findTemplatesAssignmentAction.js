import gql from 'graphql-tag'
import {client} from '../../admin/core/apolloConnection';

export async function findStepTemplatesAssignmentActionHandler(templateId) {
  let tid       = templateId
  const result  = await client.query({
    query: gql`
   query  ($id: String){
        findAssignedTemplates(id:$id) {
          _id
          templateprocess
          templatesubProcess
          templateProcessName
          templateSubProcessName
          createdBy
          createdDate
          templateclusterId
          templateclusterName
          templatechapterId
          templatechapterName
          templatesubChapterId
          templatesubChapterName
          templatecommunityId
          templatecommunityName
          templateuserType
          templateidentity
          assignedTemplates{
             stepCode
             templateCode
             stepName
             templateName
          }
      }
    }
    `,
    variables: {
      id:tid
    },
    forceFetch:true
  })
  const id = result.data.findAssignedTemplates;
  return id
}
