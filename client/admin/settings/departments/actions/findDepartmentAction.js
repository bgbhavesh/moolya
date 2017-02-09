import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findDepartmentActionHandler(DepartmentId) {
  console.log(DepartmentId)
 let did=DepartmentId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindDepartment(_id:$id) {
        id:_id
        departmentName
        displayName
        isActive
        departmentDesc
       
        }
      }
    `,
    variables: {
      id:did
    }
  })
  const id = result.data.FindDepartment;
  return id
}
