import gql from 'graphql-tag'
import {client} from '../../core/apolloConnection';

export async function createClusterActionHandler(clusterDetails) {
  let countryId       = clusterDetails.countryId;
  let displayName     = clusterDetails.displayName;
  let about           = clusterDetails.about;
  let link            = clusterDetails.countryFlag
  let email           = clusterDetails.email;
  let showOnMap       = clusterDetails.showOnMap;
  let isActive        = clusterDetails.isActive;
  let moduleName      = clusterDetails.moduleName;
  let actionName      = clusterDetails.actionName;
  const result        = await client.mutate({
    mutation: gql`
    mutation createCluster ($countryId:String,$displayName:String,$about:String,$link:String,$email:String,$showOnMap:Boolean,$isActive:Boolean, $moduleName:String, $actionName:String) {
      createCluster (countryId: $countryId,displayName: $displayName, about: $about,link:$link, email: $email,showOnMap: $showOnMap, isActive: $isActive, moduleName:$moduleName, actionName:$actionName)
          
    }
    `,
    variables: {
      countryId,
      displayName,
      about,
      link,
      email,
      showOnMap,
      isActive,
      moduleName,
      actionName
    }
  })
  console.log(result)
  const id = result.data.createCluster;
  return id
}
