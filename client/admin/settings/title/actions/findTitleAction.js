import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findTitleActionHandler(TitleId) {
  let did=TitleId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindTitle(_id:$id){
         id:_id
        titleName
        titleDisplayName
        isActive
        aboutTitle
      }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.FindTitle;
  return id
}
