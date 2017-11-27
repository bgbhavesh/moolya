import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findCategoryProcessDocuments(Id) {
  const did = Id
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findCategoryProcessDocuments(_id:$id){
         _id
        isActive
        }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const id = result.data.findCategoryProcessDocuments;
  return id
}
