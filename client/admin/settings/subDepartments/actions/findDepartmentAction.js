import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findDepartmentActionHandler(DepartmentId) {
  const did = DepartmentId
  const result = await client.query({
    query: gql`
    query  ($id: String){
         findDepartment(departmentId:$id)  {
    departmentName
    displayName
    departmentDesc
    isActive
    isMoolya
    depatmentAvailable{
      cluster
      chapter
      subChapter
      email
      isActive
    }
  }
}

    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const id = result.data.findDepartment;
  return id
}
