import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addEntityActionHandler(EntityDetails) {
  let entityName = EntityDetails.entityName;
  let entityDisplayName = EntityDetails.entityDisplayName;
  let about = EntityDetails.about;
  let isActive = EntityDetails.isActive;

  const result = await client.mutate({
    mutation: gql`
    mutation  ($entityName: String, $entityDisplayName: String, $about:String,$isActive: Boolean){
        CreateEntity(
          entityName: $entityName,
          entityDisplayName: $entityDisplayName,
          about:$about,
          isActive :$isActive
        )
      }
    `,
    variables: {
      entityName,
      entityDisplayName,
      about,
      isActive
    }
  })
  const id = result.data.CreateEntity;
  return id
}
