import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findCompanyTypeActionHandler(CompanyTypeId) {
  let did=CompanyTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindCompanyType(_id:$id){
         id:_id
        companyName
        companyDisplayName
        isActive
        aboutCompany
      }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.FindCompanyType;
  return id
}
