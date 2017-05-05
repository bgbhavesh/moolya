import gql from 'graphql-tag'
import {appClient} from '../../core/appConnection';

export async function updateContactNumber(details) {

  const result = await appClient.mutate({
    mutation: gql`
          mutation($contactObj: String){
              updateContactNumber(contactDetails:$contactObj){
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

