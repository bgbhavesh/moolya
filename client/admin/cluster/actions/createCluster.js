import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function createClusterActionHandler(clusterDetails) {
  let countryId = clusterDetails.clusterName;
  let displayName = clusterDetails.displayName;
  let about = clusterDetails.about;
  let link = clusterDetails.uploadImage
  let email = clusterDetails.email;
  let showOnMap = clusterDetails.ismapShow;
  let isActive = clusterDetails.status;
  const result = await client.mutate({
    mutation: gql`
    mutation createCluster ($countryId:String,$displayName:String,$about:String,$link:String,$email:String,$showOnMap:Boolean,$isActive:Boolean) {
      createCluster (countryId: $countryId,displayName: $displayName, about: $about,link:$link, email: $email,showOnMap: $showOnMap,isActive: $isActive)
          
    }
    `,
    variables: {
      countryId,
      displayName,
      about,
      link,
      email,
      showOnMap,
      isActive
    }
  })
  console.log(result)
  const id = result.data.createCluster;
  return id
}
