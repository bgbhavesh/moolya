import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findRequestssActionHandler() {
  const status = ['WIP', 'Pending']
  const result = await client.query({
    query: gql`
 query ($userId: String, $status: [String]) {
  fetchRequestss(status : $status) {
    _id
    userId
    status
    requestId
    requestTypeName
    transactionCreatedDate
    requestTypeId
    requestDescription
    clusterName
    chapterName
    subChapterName
    communityName
  }
}

    `,
    variables: {
      status
    },
    forceFetch: true
  })
  const id = result.data.fetchRequestss;
  return id
}

