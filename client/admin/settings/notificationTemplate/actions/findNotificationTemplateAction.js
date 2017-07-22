/**
 * Created by mohammed.mohasin on 22/07/17.
 */
import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findNotificationTemplateActionHandler(fid) {
  let did = fid
  const result = await client.query({
    query: gql`
          query  ($notificationTemplateId: String!){
              fetchNotificationTemplate(notificationTemplateId:$notificationTemplateId){
                  type,
                  tempCode,
                  tempDesc,
                  title,
                  isHtmlContent,
                  content,
                  isActive
              }
          }
      `,
    variables: {
      notificationTemplateId:did
    },
    forceFetch:true
  })
  const id = result.data.fetchNotificationTemplate;
  return id
}
