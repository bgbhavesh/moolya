import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateSpecificationTypeActionHandler(SpecificationType) {
  const _id = SpecificationType.id;
  const specificationName = SpecificationType.specificationName;
  const specificationDisplayName = SpecificationType.specificationDisplayName;
  const about = SpecificationType.about;
  const isActive = SpecificationType.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$specificationName: String, $specificationDisplayName: String, $about: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        UpdateSpecification(
          _id:$_id
          specificationName: $specificationName,
          specificationDisplayName: $specificationDisplayName,
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
      specificationName,
      specificationDisplayName,
      about,
      isActive,
      moduleName: 'SPECIFICATION',
      actionName: 'UPDATE'
    }
  })
  const id = result.data.UpdateSpecification;
  return id
}
