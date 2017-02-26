
import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';


export async function findUserDepartmentypeActionHandler(userId, subChapterId) {
  let did=userId;
  let scid = subChapterId;
  const result = await client.query({
    query: gql`
      query ($id: String, $subChapterId:String) {
        data: fetchsubChapterUserDepSubDep(userId: $id, subChapterId:$subChapterId) 
        {
            department
            subDepartment
        }
      }
    `,
    variables: {
      id:did,
      subChapterId:scid
    },
    forceFetch:true
  })
  const id = result.data.data;
  return id
}
