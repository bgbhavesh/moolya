import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findClusterBasedStatesDeatilsActionHandler() {
  const result = await client.query({
    query: gql`
      query{
  FetchActiveStates {
            _id
            name
          }
        }
    `,
    forceFetch:true
  })
  const id = result.data.FetchActiveStates;
  return id
}
