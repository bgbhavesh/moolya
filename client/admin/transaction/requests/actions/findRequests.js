import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findRequestssActionHandler(requestTypeDetails) {
  let userId = requestTypeDetails
  let status=["WIP","Pending"]
  const result = await client.query({
    query: gql`
 query ($userId: String) {
  fetchRequestss(userId: $userId ) {
    _id
    userId
    status
    requestId
    requestTypeName
    requestsCreatedDate
    requestTypeId
    requestDescription
  }
}

    `,
    variables: {
      userId,
  status
    },
    forceFetch: true
  })
  const id = result.data.fetchRequestss;
  return id
}

