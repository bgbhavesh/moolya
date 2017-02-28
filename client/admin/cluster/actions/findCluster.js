import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function findClusterTypeActionHandler(clusterId) {
  let did = clusterId
  const result = await client.query({
    query: gql`
    query  ($id: String, $moduleName:String!, $actionName:String!){
        fetchCluster(_id:$id, moduleName:$moduleName, actionName:$actionName){
        id:_id
        countryName
        about
        email
        countryFlag
        displayName
        showOnMap
        isActive
        }
      }
    `,
    variables: {
      id: did,
      moduleName:"CLUSTER",
      actionName:"READ"
    },
    forceFetch: true
  })
  const id = result.data.fetchCluster;
  return id
}
