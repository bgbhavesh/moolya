/**
 * Created by viswadeep on 2/5/17.
 */
import gql from 'graphql-tag'
import {appClient} from '../../core/appConnection';

export async function findAddressBookActionHandler() {
  const result = await appClient.query({
    query: gql`
    query{
        FindAddressBook{
            success,
            code,
            result
       }
      }
    `,
    forceFetch:true
  })
  const id = result.data.FindAddressBook;
  return id
}
