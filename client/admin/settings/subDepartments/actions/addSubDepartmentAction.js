import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addSubDepartmentActionHandler(SubDepartmentDetails) {
  let subDepartmentName = SubDepartmentDetails.subDepartmentName;
  let displayName = SubDepartmentDetails.displayName;
  let aboutSubDepartment = SubDepartmentDetails.about;
  let email = SubDepartmentDetails.email;
  let selectCluster = SubDepartmentDetails.selectCluster;
  let isActive = SubDepartmentDetails.status;
  let isMoolya = false;
  let departmentId = "Moolya DPT ID";
  let subDepatmentAvailable = [];

  const result = await client.mutate({
    mutation: gql`
    mutation ($subDepartmentName: String, $displayName: String, $aboutSubDepartment: String, $isMoolya: Boolean,$departmentId:String, $subDepatmentAvailable: [SubDepatmentAvailable], $isActive: Boolean){
      CreateSubDepartment(
      subDepartmentName: $subDepartmentName,
      displayName: $displayName,
      aboutSubDepartment: $aboutSubDepartment,
      isMoolya :$isMoolya,
      departmentId: $departmentId,
      subDepatmentAvailable: $subDepatmentAvailable,
      isActive :$isActive
      ) 
      }
    `,
    variables: {
      subDepartmentName,
      displayName,
      aboutSubDepartment,
      email,
      isActive,
      isMoolya,
      departmentId,
      subDepatmentAvailable
    }
  })
  console.log(result)
  const id = result.data.CreateSubDepartment;
  return id
}
