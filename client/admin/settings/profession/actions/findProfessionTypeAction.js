import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findProfessionActionHandler(ProfessionTypeId) {
  const did = ProfessionTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindProfession(_id:$id){
        id:_id
        professionName
        professionDisplayName
        industryName
        industryId
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
  const id = result.data.FindProfession;
  return id
}
