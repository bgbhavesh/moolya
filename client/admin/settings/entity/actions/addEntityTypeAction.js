import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addEntityActionHandler(EntityDetails) {
  const entityName = EntityDetails.entityName;
  const entityDisplayName = EntityDetails.entityDisplayName;
  const about = EntityDetails.about;
  const isActive = EntityDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($entityName: String, $entityDisplayName: String, $about:String,$isActive: Boolean, $moduleName:String, $actionName:String){
        CreateEntity(
          entityName: $entityName,
          entityDisplayName: $entityDisplayName,
          about:$about,
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
      entityName,
      entityDisplayName,
      about,
      isActive,
      moduleName: 'ENTITY',
      actionName: 'CREATE'
    }
  })
  const id = result.data.CreateEntity;
  return id
}
