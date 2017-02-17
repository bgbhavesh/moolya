import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function findClusterTypeActionHandler(clusterId) {
  let did = clusterId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        fetchCluster(_id:$id){
        id:_id
        countryName
        about
        email
        displayName
        showOnMap
        isActive
        }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const id = result.data.fetchCluster;
  return id
}
