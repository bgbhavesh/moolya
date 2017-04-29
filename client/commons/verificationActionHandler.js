import {client} from "../admin/core/apolloConnection";
import gql from 'graphql-tag';

export async function verifyEmailHandler(token){
  const result = await client.mutate({
    mutation: gql`
    mutation  ($token:String){
        verifyEmail(
          token : $token
        ){
            success,
            code,
            result
         } 
      }
    `,
    variables: {
      token:token
    }
  });
  //console.log(result);
  return result&&result.data&&result.data.verifyEmail?result.data.verifyEmail:{};
}
