import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findSubDepartmentActionHandler(SubDepartmentId) {
  let did = SubDepartmentId;

  const result = await client.query({
    query: gql`
    query ($id: String){
      FindSubDepartment(_id: $id,) {
        id:_id
        subDepartmentName
        displayName
        isActive
        aboutSubDepartment
      }
    }  
    `,
    variables: {
      id:did
    }
  })
  console.log(result)
  const id = result.data.FindSubDepartment;
  return id
}
