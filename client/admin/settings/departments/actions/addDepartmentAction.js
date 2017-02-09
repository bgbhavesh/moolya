import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addDepartmentActionHandler(DepartmentDetails) {
  let departmentName = DepartmentDetails.departmentName;
  let displayName = DepartmentDetails.displayName;
  let departmentDesc = DepartmentDetails.about;
  let selectCluster = DepartmentDetails.selectCluster;
  let email = DepartmentDetails.email;
  let isActive = DepartmentDetails.status
  let depatmentAvailable = []
  let isMoolya = true
  const result = await client.mutate({
    mutation: gql`
    mutation  ($departmentName: String, $displayName: String, $departmentDesc: String, $isMoolya: Boolean, $depatmentAvailable: [DepatmentAvailable], $isActive: Boolean){
        CreateDepartment(
          departmentName: $departmentName,
          displayName: $displayName,
          departmentDesc: $departmentDesc,
          isMoolya :$isMoolya,
          depatmentAvailable: $depatmentAvailable,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      departmentName,
      displayName,
      departmentDesc,
      depatmentAvailable,
      isActive,
      isMoolya
    }
  })
  const id = result.data.CreateDepartment;
  return id
}
