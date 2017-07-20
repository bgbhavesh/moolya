import gql from 'graphql-tag'

export async function createBugReport(details, connection) {
  var connection=connection||{};
  const result = await connection.mutate({
    mutation: gql`
      mutation($details:bugDetails){
        createBugReport(details:$details) {
          success
          code
          result
        }
      }
    `,
    variables: {
      details
    },
    forceFetch: true
  });
  const id = result.data.createBugReport;
  return id;
}
