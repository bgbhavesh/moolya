/**
 * Created by pankaj on 7/6/17.
 */
import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateOfficeStatus(officeId) {
  const result = await client.mutate({
    mutation: gql`
        mutation ($id:String) {
        updateOfficeStatus(id:$id) {
          success
          code
          result
        }
      }
    `,
    variables: {
      id: officeId
    },
    forceFetch:true
  });
  console.log(result);
  const id = result.data.updateOfficeStatus;
  return id
}
