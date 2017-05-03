import gql from 'graphql-tag'
import {appClient} from '../../core/appConnection';

export async function updateContactNumber(details) {

  const result = await appClient.mutate({
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

