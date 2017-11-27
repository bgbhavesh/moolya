import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findSpecificationActionHandler(SpecificationTypeId) {
  const did = SpecificationTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindSpecification(_id:$id){
         id:_id
        specificationName
        specificationDisplayName
        isActive
        about
      }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const id = result.data.FindSpecification;
  return id
}
