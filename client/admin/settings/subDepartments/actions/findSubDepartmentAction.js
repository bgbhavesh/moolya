import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findSubDepartmentActionHandler(SubDepartmentId) {
  let did = SubDepartmentId;

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
      cluster{
        clusterId
      }
    }
   
  }
}

    `,
    variables: {
      _id:did
    }
  })
  console.log(result)
  const id = result.data.findSubDepartment;
  return id
}
