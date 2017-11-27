import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findTechnologyActionHandler(technologyId) {
  const did = technologyId
  const result = await client.query({
    query: gql`
          query  ($technologyId: String){
              findTechnology(technologyId:$technologyId){
                  technologyName,
                  displayName,
                  about,
                  icon,
                  isActive
              }
          }
      `,
    variables: {
      technologyId: did
    },
    forceFetch: true
  })
  const id = result.data.findTechnology;
  return id
}
