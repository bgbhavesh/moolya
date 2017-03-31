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
          stepAvailability{
             step
             template
          }
      }
    }
    `,
    variables: {
      id:tid
    },
    fetchPolicy: 'cache-first'
  })
  const id = result.data.findAssignedTemplates;
  return id
}
