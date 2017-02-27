import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function updateClusterActionHandler(clusterDetails) {
  let clusterId = clusterDetails._id;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($clusterId:String,$clusterDetails:clusterUpdateObject){
        updateCluster(
          clusterId:$clusterId,
          clusterDetails:$clusterDetails
        )
      }
    `,
    variables: {
      clusterId:clusterId,
      clusterDetails:clusterDetails
    }
  })
  const id = result;
  return id
}
