import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateEntityTypeActionHandler(EntityType) {
  const _id = EntityType.id;
  const entityName = EntityType.entityName;
  const entityDisplayName = EntityType.entityDisplayName;
  const about = EntityType.about;
  const isActive = EntityType.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$entityName: String, $entityDisplayName: String, $about: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        UpdateEntity(
          _id:$_id
          entityName: $entityName,
          entityDisplayName: $entityDisplayName,
          about: $about,
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
      entityName,
      entityDisplayName,
      about,
      isActive,
      moduleName: 'ENTITY',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.UpdateEntity;
  return id
}
