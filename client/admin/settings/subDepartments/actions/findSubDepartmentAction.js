import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findSubDepartmentActionHandler(SubDepartmentId) {
  const did = SubDepartmentId;

  const result = await client.query({
    query: gql`
   query  ($_id: String){
         findSubDepartment(_id:$_id)  {
    subDepartmentName
    displayName
    aboutSubDepartment
    departmentId
    isActive
    isMoolya
    subDepatmentAvailable {
      chapter
      subChapter
      email
      isActive
      cluster
    }
   
  }
}

    `,
    variables: {
      _id: did
    },
    forceFetch: true
  })
  const id = result.data.findSubDepartment;
  return id
}
