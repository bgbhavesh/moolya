import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function addCompanyTypeActionHandler(CompanyTypeDetails) {
  const companyName = CompanyTypeDetails.companyName;
  const companyDisplayName = CompanyTypeDetails.companyDisplayName;
  const aboutCompany = CompanyTypeDetails.aboutCompany;
  const isActive = CompanyTypeDetails.isActive;
  const companyTypeInfo = { companyName, companyDisplayName, aboutCompany };
  const result = await client.mutate({
    mutation: gql`
    mutation  ($masterData:MasterSettingsRequest){
       createMasterSetting(
          moduleName:"MASTERSETTINGS",
          actionName:"CREATE",
          type:COMPANYTYPE,
          masterData:$masterData
        ) 
      }
    `,
    variables: {
      masterData: { companyTypeInfo, isActive }
    }
  })
  const id = result.data.createMasterSetting;
  return id
}
