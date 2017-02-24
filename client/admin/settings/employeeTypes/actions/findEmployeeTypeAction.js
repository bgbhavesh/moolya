import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findEmployeeTypeActionHandler(EmpTypeId) {
  let did=EmpTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindEmployeeType(_id:$id){
         id:_id
        employmentName
        employmentDisplayName
        isActive
        aboutEmployment
      }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.FindEmployeeType;
  return id
}
