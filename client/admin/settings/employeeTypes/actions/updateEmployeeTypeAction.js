import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateEmployeeTypeActionHandler(EmpType) {
  const _id = EmpType.id;
  const employmentName = EmpType.employmentName;
  const employmentDisplayName = EmpType.employmentDisplayName;
  const aboutEmployment = EmpType.aboutEmployment;
  const isActive = EmpType.isActive;
  const employmentTypeInfo = { employmentName, employmentDisplayName, aboutEmployment };
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        updateMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"UPDATE",type:EMPLOYMENTTYPE,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { employmentTypeInfo, isActive, _id }
    }
  })
  const id = result.data.updateMasterSetting;
  return id
}
