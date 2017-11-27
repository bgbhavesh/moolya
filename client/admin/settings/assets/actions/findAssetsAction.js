import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findAssetActionHandler(assetId) {
  const did = assetId
  const result = await client.query({
    query: gql`
          query  ($assetId: String){
              findAsset(assetId:$assetId){
                  assetName,
                  displayName,
                  about,
                  icon,
                  isActive
              }
          }
      `,
    variables: {
      assetId: did
    },
    forceFetch: true
  })
  const id = result.data.findAsset;
  return id
}
