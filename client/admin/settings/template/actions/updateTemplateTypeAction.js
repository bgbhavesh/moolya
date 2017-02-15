import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateTemplateTypeActionHandler(TemplateType) {
  let _id=TemplateType.id;
  let templateName = TemplateType.templateName;
  let templateDisplayName = TemplateType.templateDisplayName;
  let templateDescription = TemplateType.templateDescription;
  let isActive = TemplateType.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$templateName: String, $templateDisplayName: String, $templateDescription: String,$isActive: Boolean){
        UpdateTemplate(
          _id:$_id
          templateName: $templateName,
          templateDisplayName: $templateDisplayName,
          templateDescription: $templateDescription,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      _id,
      templateName,
      templateDisplayName,
      templateDescription,
      isActive
    }
  })
  const id = result;
  return id
}
