/**
 * Created by venkatsrinag on 28/7/17.
 */
import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function fetchCommunitiesHandler() {
  const result = await client.query({
    query: gql`
           query {
            data: fetchCommunitiesDef {
                _id,
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
