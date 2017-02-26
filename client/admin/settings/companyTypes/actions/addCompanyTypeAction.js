import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addCompanyTypeActionHandler(CompanyTypeDetails) {
  let companyName = CompanyTypeDetails.companyName;
  let companyDisplayName = CompanyTypeDetails.companyDisplayName;
  let aboutCompany = CompanyTypeDetails.aboutCompany;
  let isActive = CompanyTypeDetails.isActive;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($companyName: String, $companyDisplayName: String, $aboutCompany: String,$isActive: Boolean){
        CreateCompanyType(
          companyName: $companyName,
          companyDisplayName: $companyDisplayName,
          aboutCompany: $aboutCompany,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      companyName,
      companyDisplayName,
      aboutCompany,
      isActive
    }
  })
  const id = result.data.CreateCompanyType;
  return id
}
