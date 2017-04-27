import {client} from "../../admin/core/apolloConnection";
import gql from 'graphql-tag';
async function verifyEmail(token){

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
  console.log(result);
}
FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {
    const resp= verifyEmail(params.token);
    console.log(resp);
  }
});
