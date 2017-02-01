import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function createClusterActionHandler({clusterName, displayName, about, uploadImage, email, ismapShow, status}) {
  const result = await client.mutate({
    mutation: gql`
    mutation createCluster ($displayName: String, $about: String, $email: String) {
      createCluster (displayName: $displayName, about: $about, email: $email)
    }
    `,
    variables: {
      displayName,
      about,
      email
    }
  })
  const id = result.data.createCluster;
  return id
}
