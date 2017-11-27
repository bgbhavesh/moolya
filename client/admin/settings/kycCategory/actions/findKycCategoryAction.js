import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findKycCategoryActionHandler(Id) {
  const did = Id
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findKycCategory(_id:$id){
         _id
        docCategoryName
        docCategoryDisplayName
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
  const id = result.data.findKycCategory;
  console.log(`DAta ${id}`);
  return id
}
