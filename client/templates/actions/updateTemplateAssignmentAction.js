import gql from 'graphql-tag'
import {client} from '../../admin/core/apolloConnection';

export async function updateTemplateAssignmentActionHandler(templateDetails) {
  let tid=templateDetails.id;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($id:String, $displayName: String, $template: templateInput){
        UpdateUserType(
          id: $_id,
          template: $template,
        ){
            success,
            code,
            result
        }  
      }
    `,
    variables: {
      id : tid,
      template :templateDetails
    }
  })
  const id = result.data.updateTemplate;
  return id
}
