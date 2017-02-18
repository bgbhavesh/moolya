import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addSpecificationActionHandler(SpecificationDetails) {
  let specificationName = SpecificationDetails.specificationName;
  let specificationDisplayName = SpecificationDetails.specificationDisplayName;
  let about = SpecificationDetails.about;
  let isActive = SpecificationDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($specificationName: String, $specificationDisplayName: String, $about: String,$isActive: Boolean){
        CreateSpecification(
          specificationName: $specificationName,
          specificationDisplayName: $specificationDisplayName,
          about: $about,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      specificationName,
      specificationDisplayName,
      about,
      isActive
    }
  })
  const id = result.data.CreateSpecification;
  return id
}
