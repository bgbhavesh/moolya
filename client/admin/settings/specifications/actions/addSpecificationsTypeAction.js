import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addSpecificationActionHandler(SpecificationDetails) {
  const specificationName = SpecificationDetails.specificationName;
  const specificationDisplayName = SpecificationDetails.specificationDisplayName;
  const about = SpecificationDetails.about;
  const isActive = SpecificationDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($specificationName: String, $specificationDisplayName: String, $about: String,$isActive: Boolean, $moduleName:String, $actionName:String){
        CreateSpecification(
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
      specificationName,
      specificationDisplayName,
      about,
      isActive,
      moduleName: 'SPECIFICATION',
      actionName: 'CREATE'
    }
  })
  const id = result.data.CreateSpecification;
  return id
}
