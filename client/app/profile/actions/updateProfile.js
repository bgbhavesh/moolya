import gql from 'graphql-tag'
import {appClient} from '../../core/appConnection';

export async function updateDataEntry(Details) {
  const result = await appClient.mutate({
    mutation: gql`
    mutation ($Details: attributesObject) {
    updateDataEntry(Details: $Details) {
    success
    code
    result
  }
}
`,
    variables: {
      Details
    }
  })
  const id = result.data.updateDataEntry;
  return id;
}
