import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findDeptAndsubDeptActionHandler(clusterId) {
  let cid=clusterId
  const result = await client.query({
    query: gql`
       query  ($clusterId: String){
         fetchMoolyaBasedDepartmentAndSubDepartment(clusterId:$clusterId) {
            departmentId
            departmentName
            subDepartmentId
      			subDepartmentName      
         }  
        }
    `,
    variables: {
      $clusterId:cid
    },
    forceFetch:true
  })
  const id = result.data.fetchMoolyaBasedDepartmentAndSubDepartment;
  return id
}
