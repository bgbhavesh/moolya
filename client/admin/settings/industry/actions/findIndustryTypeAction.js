import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findIndustryActionHandler(IndustryTypeId) {
  const did = IndustryTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindIndustry(_id:$id){
         id:_id
        industryName
        industryDisplayName
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
  const id = result.data.FindIndustry;
  return id
}
