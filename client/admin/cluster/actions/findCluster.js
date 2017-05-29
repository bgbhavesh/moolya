import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function findClusterTypeActionHandler(clusterId) {
  let did = clusterId
  const result = await client.query({
    query: gql`
        query  ($docId: String, $moduleName:String!, $actionName:String!){
        fetchCluster(docId:$docId, moduleName:$moduleName, actionName:$actionName){
        countryName
        about
        email
        isEmailNotified
        countryFlag
        displayName
        showOnMap
        isActive
        }
      }
    `,
    variables: {
      docId: did,
      moduleName:"CLUSTER",
      actionName:"READ"
    },
    forceFetch: true
  })
  const id = result.data.fetchCluster;
  return id
}
