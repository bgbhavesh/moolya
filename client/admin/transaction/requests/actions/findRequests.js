import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findRequestssActionHandler(requestTypeDetails) {
  let userId = requestTypeDetails
  let status=["WIP","Pending"]
  const result = await client.query({
    query: gql`
 query ($userId: String, $status: [String]) {
  fetchRequestss(userId: $userId , status : $status) {
    _id
    userId
    status
    requestId
    requestTypeName
    transactionCreatedDate
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

