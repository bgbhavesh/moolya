
import gql from 'graphql-tag'
import { client } from '../../core/apolloConnection';


export async function findUserDepartmentypeActionHandler(userId, ClusterId, ChapterId, subChapterId) {
  const clusterId = ClusterId;
  const chapterId = ChapterId;
  const did = userId;
  const scid = subChapterId;
  const result = await client.query({
    query: gql`
      query ($id: String, $subChapterId:String, $clusterId:String, $chapterId:String) {
        data: fetchsubChapterUserDepSubDep(userId: $id, clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId) 
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
      clusterId,
      chapterId,
      id: did,
      subChapterId: scid
    },
    forceFetch: true
  })
  const id = result.data.data;
  return id
}
