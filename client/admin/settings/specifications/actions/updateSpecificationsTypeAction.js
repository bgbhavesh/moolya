import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateSpecificationTypeActionHandler(SpecificationType) {
  let _id=SpecificationType.id;
  let specificationName = SpecificationType.specificationName;
  let specificationDisplayName = SpecificationType.specificationDisplayName;
  let about = SpecificationType.about;
  let isActive = SpecificationType.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$specificationName: String, $specificationDisplayName: String, $about: String,$isActive: Boolean){
        UpdateSpecification(
          _id:$_id
          specificationName: $specificationName,
          specificationDisplayName: $specificationDisplayName,
          about: $about,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      _id,
      specificationName,
      specificationDisplayName,
      about,
      isActive
    }
  })
  const id = result;
  return id
}
