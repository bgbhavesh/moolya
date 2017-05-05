import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function createFilterActionHandler(filterObject) {
    const result = await client.mutate({
      mutation: gql`
      mutation  ($filterObject:filter){
          CreateFilter(
              filterObject:$filterObject,
            ) {
            success
            code
            result
          }
        }
      `,
      variables: {
        filterObject : filterObject
      }
    })
  const id = result.data.CreateFilter;
  return id
}
