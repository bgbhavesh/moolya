/**
 * Created by venkatsrinag on 1/5/17.
 */
import gql from 'graphql-tag'
import {appClient} from '../../../app/core/appConnection';

export async function fetchCommunitiesHandler() {
    const result = await appClient.query({
        query: gql`
           query {
            data: getOfficeUserTypes {
                _id,
                name,
                displayName,
                isActive,
            }
          }
        `,
        forceFetch:true
    })

    const communities = result.data.data;
    return communities;
}

export async function fetchAllCommunitiesHandler() {
  const result = await appClient.query({
    query: gql`
           query {
            data: fetchAllCommunitiesFromDef {
                name,
                communityName,
                displayName,
                code,
                communityImageLink,
                aboutCommunity,
                isActive,
            }
          }
        `,
    forceFetch:true
  })

  const communities = result.data.data;
  return communities;
}
