import gql from 'graphql-tag'
import {client} from '../../core/appConnection';

export async function updateContactNumber(details) {

  const result = await client.mutate({
    mutation: gql`
          mutation($contactDetails: String){
              updateContactNumber(contactDetails:$contactDetails){
                  success,
                  code,
                  result
              }  
          }
      `,
    variables: {
      details
    }
  })
  const id = result.data.updateContactNumber;
  return id
}

