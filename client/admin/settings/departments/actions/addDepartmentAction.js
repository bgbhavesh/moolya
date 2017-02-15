import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addDepartmentActionHandler(DepartmentDetails) {
  let departmentName = DepartmentDetails.departmentName;
  let displayName = DepartmentDetails.displayName;
  let departmentDesc = DepartmentDetails.aboutDepartment;
  let isActive = DepartmentDetails.departmentStatus;
  let isMoolya = DepartmentDetails.appType;
  let departmentAvailable = DepartmentDetails.departmentAvailablity;

  const result = await client.mutate({
    mutation: gql`
    mutation  ($departmentName: String, $displayName: String, $departmentDesc: String, $isMoolya: Boolean, $depatmentAvailable: [DepatmentAvailable], $isActive: Boolean){
        createDepartment(
          department :{
          departmentName: $departmentName,
          displayName: $displayName,
          departmentDesc: $departmentDesc,
          isMoolya :$isMoolya,
          depatmentAvailable: $depatmentAvailable,
          isActive :$isActive
          }
        ) 
      }
    `,
    variables: {
      departmentName,
      displayName,
      departmentDesc,
      isMoolya,
      departmentAvailable,
      isActive
    }
  })
  const id = result.data.CreateDepartment;
  return id
}
