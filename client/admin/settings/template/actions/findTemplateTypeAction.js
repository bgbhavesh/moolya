import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findTemplateTypeActionHandler(TemplateTypeId) {
  let did=TemplateTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindTemplate(_id:$id){
         id:_id
        templateName
        templateDisplayName
        isActive
        templateDescription
      }
      }
    `,
    variables: {
      id:did
    }
  })
  const id = result.data.FindTemplate;
  return id
}
