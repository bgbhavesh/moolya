import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function updateCompanyTypeActionHandler(CmpType) {
  const _id = CmpType.id;
  const companyName = CmpType.companyName;
  const companyDisplayName = CmpType.companyDisplayName;
  const aboutCompany = CmpType.aboutCompany;
  const isActive = CmpType.isActive;
  const companyTypeInfo = { companyName, companyDisplayName, aboutCompany };
  const result = await client.mutate({
    mutation: gql`
    mutation ($masterData:MasterSettingsRequest){
        updateMasterSetting(moduleName:"MASTER_SETTINGS",actionName:"UPDATE",type:COMPANYTYPE,masterData:$masterData) 
      }
    `,
    variables: {
      masterData: { companyTypeInfo, isActive, _id }
    }
  })
  const id = result.data.updateMasterSetting;
  return id
}
