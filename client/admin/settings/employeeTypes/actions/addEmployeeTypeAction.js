import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addEmployeeTypeActionHandler(EmpTypeDetails) {
  const employmentName = EmpTypeDetails.employmentName;
  const employmentDisplayName = EmpTypeDetails.employmentDisplayName;
  const aboutEmployment = EmpTypeDetails.aboutEmployment;
  const isActive = EmpTypeDetails.isActive;
  const employmentTypeInfo = { employmentName, employmentDisplayName, aboutEmployment };
  /* const result = await client.mutate({
    mutation: gql`
    mutation  ($employmentName: String, $employmentDisplayName: String, $aboutEmployment: String,$isActive: Boolean){
        CreateEmployeeType(
          employmentName: $employmentName,
          employmentDisplayName: $employmentDisplayName,
          aboutEmployment: $aboutEmployment,
          isActive :$isActive
        )
      }
    `,
    variables: {
      employmentName,
      employmentDisplayName,
      aboutEmployment,
      isActive
    }
  }) */
  const result = await client.mutate({
    mutation: gql`
    mutation  ($masterData:MasterSettingsRequest){
        createMasterSetting(
          moduleName:"MASTER_SETTINGS",
          actionName:"CREATE",
          type:EMPLOYMENTTYPE,
          masterData:$masterData
        ) 
      }
    `,
    variables: {
      masterData: { employmentTypeInfo, isActive }
    }
  })
  const id = result.data.createMasterSetting;
  return id
}
