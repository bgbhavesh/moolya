import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findTechnologyActionHandler(SubDomainId) {
  let did = SubDomainId
  const result = await client.query({
    query: gql`
          query  ($technologyId: String){
              findTechnology(SubDomainId:SubDomainId){
                  Name,
                  displayName,
                  about,
                  industry,
                  isActive
              }
          }
      `,
    variables: {
      SubDomainId:did
    },
    forceFetch:true
  })
  const id = result.data.findTechnology;
  return id
}
