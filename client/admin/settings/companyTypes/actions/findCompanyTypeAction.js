import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findCompanyTypeActionHandler(CompanyTypeId) {
  const did = CompanyTypeId

  const result = await client.query({
    query: gql`
    query  ($id: String){
        findMasterSetting(_id:$id){
         id:_id
        isActive
        companyTypeInfo{
             companyName
             aboutCompany
             companyDisplayName
        }
      }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  });
  const masterSetting = result.data.findMasterSetting || {};
  const { companyName, aboutCompany, companyDisplayName } = masterSetting.companyTypeInfo || {};
  if (result) {
    return {
      isActive: masterSetting.isActive, companyName, aboutCompany, companyDisplayName
    };
  }
  return {};
}
