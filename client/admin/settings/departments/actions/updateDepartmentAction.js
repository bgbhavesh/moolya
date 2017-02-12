import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateDepartmentActionHandler(DepartmentDetails) {
  let _id=DepartmentDetails.id;
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
    mutation  ($_id:String,$departmentName: String, $displayName: String, $departmentDesc: String, $isMoolya: Boolean, $depatmentAvailable: [DepatmentAvailable], $isActive: Boolean){
        UpdateDepartment(
          _id:$_id,
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
      _id,
      departmentName,
      displayName,
      departmentDesc,
      depatmentAvailable,
      isActive,
      isMoolya
    }
  })
  console.log(result)
  const id = result;
  return id
}
