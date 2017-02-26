import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateCompanyTypeActionHandler(CmpType) {
  let _id=CmpType.id;
  let companyName = CmpType.companyName;
  let companyDisplayName = CmpType.companyDisplayName;
  let aboutCompany = CmpType.aboutCompany;
  let isActive = CmpType.isActive
  const result = await client.mutate({
    mutation: gql`
    mutation  ($_id:String,$companyName: String, $companyDisplayName: String, $aboutCompany: String,$isActive: Boolean){
        UpdateCompanyType(
          _id:$_id
          companyName: $companyName,
          companyDisplayName: $companyDisplayName,
          aboutCompany: $aboutCompany,
          isActive :$isActive
        ) 
      }
    `,
    variables: {
      _id,
      companyName,
      companyDisplayName,
      aboutCompany,
      isActive
    }
  })
  console.log(result)
  const id = result;
  return id
}
