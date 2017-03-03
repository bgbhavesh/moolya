/**
 * Created by venkatasrinag on 20/2/17.
 */
import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';


export async function findUserDepartmentypeActionHandler(userId, clusterId) {
  let did=userId;
  let clusterid = clusterId;
  const result = await client.query({
    query: gql`
      query ($id: String, $clusterId:String) {
        data: fetchUserDepSubDep(userId: $id, clusterId:$clusterId) 
        {
            department
            departmentName
            subDepartment
            subDepartmentName
        }
      }
    `,
    variables: {
      id:did,
      clusterId:clusterid
    },
    forceFetch:true
  })
  const id = result.data.data;
  return id
}
