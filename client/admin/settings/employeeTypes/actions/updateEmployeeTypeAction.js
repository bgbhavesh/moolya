import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateEmployeeTypeActionHandler(EmpType) {
  let _id=EmpType.id;
  let employmentName = EmpType.employmentName;
  let employmentDisplayName = EmpType.employmentDisplayName;
  let aboutEmployment = EmpType.aboutEmployment;
  let isActive = EmpType.isActive;
  let employmentTypeInfo={employmentName,employmentDisplayName,aboutEmployment};
  const result = await client.mutate({
   /* mutation: gql`
    mutation  ($_id:String,$employmentName: String, $employmentDisplayName: String, $aboutEmployment: String,$isActive: Boolean){
        UpdateEmployeeType(
          _id:$_id
          employmentName: $employmentName,
          employmentDisplayName: $employmentDisplayName,
          aboutEmployment: $aboutEmployment,
          isActive :$isActive
        )
      }
    `,
    variables: {
      _id,
      employmentName,
      employmentDisplayName,
      aboutEmployment,
      isActive
    }*/
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        updateMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"UPDATE",type:EMPLOYMENTTYPE,masterData:$masterData) 
      }
    `,
    variables: {
      masterData:{"employmentTypeInfo":employmentTypeInfo,"isActive":isActive,_id:_id}
    }
  })
  console.log(result)
  const id = result;
  return id
}
