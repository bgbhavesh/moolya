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
    mutation  ($_id:String,$templateName: String, $templateDisplayName: String, $templateDescription: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        UpdateTemplate(
          _id:$_id
          templateName: $templateName,
          templateDisplayName: $templateDisplayName,
          templateDescription: $templateDescription,
          isActive :$isActive,
          moduleName:$moduleName,
          actionName:$actionName
        ){
            success,
            code,
            result
        }  
      }
    `,
    variables: {
      _id,
      templateName,
      templateDisplayName,
      templateDescription,
      isActive,
      moduleName:"TEMPLATE",
      actionName:"UPDATE"
    }
  })
  const id = result.data.UpdateTemplate;
  return id
}
