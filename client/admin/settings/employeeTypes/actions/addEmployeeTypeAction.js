import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function addEmployeeTypeActionHandler(EmpTypeDetails) {
  let employmentName = EmpTypeDetails.employmentName;
  let employmentDisplayName = EmpTypeDetails.employmentDisplayName;
  let aboutEmployment = EmpTypeDetails.aboutEmployment;
  let isActive = EmpTypeDetails.isActive;
  const result = await client.mutate({
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
  })
  const id = result.data.CreateEmployeeType;
  return id
}
