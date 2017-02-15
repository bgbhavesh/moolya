import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addTemplateActionHandler(TemplateDetails) {
  let templateName = TemplateDetails.templateName;
  let templateDisplayName = TemplateDetails.templateDisplayName;
  let templateDescription = TemplateDetails.templateDescription;
  let isActive = TemplateDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($templateName: String, $templateDisplayName: String, $templateDescription: String,$isActive: Boolean){
        CreateTemplate(
          templateName: $templateName,
          templateDisplayName: $templateDisplayName,
          templateDescription: $templateDescription,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      templateName,
      templateDisplayName,
      templateDescription,
      isActive
    }
  })
  const id = result.data.CreateTemplate;
  return id
}
