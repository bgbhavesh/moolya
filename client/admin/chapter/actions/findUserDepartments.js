
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
            departmentName
            subDepartment
            subDepartmentName
            isAvailiable
        }
      }
    `,
    variables: {
      id:did,
      subChapterId:scid
    },
    fetchPolicy: 'cache-first'
  })
  const id = result.data.data;
  return id
}
