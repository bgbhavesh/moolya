/*import {client} from "../admin/core/apolloConnection";*/
import gql from 'graphql-tag';
/*import {appClient} from '../app/core/appConnection';*/

export async function verifyEmailHandler(token,connection){
  var connection=connection||{};
  const result = await connection.mutate({
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

export async function verifyMobileNumberHandler(mobileNumber,otp,connection){
  var connection=connection||{};
  const result = await connection.mutate({
    mutation: gql`
    mutation($mobileNumber:String,$otp:Int){
        verifyMobileNumber(
          mobileNumber :$mobileNumber,
          otp:$otp
        ){
            success,
            code,
            result
         } 
      }
    `,
    variables: {
      mobileNumber:mobileNumber,
      otp:otp
    }
  });
  //console.log(result);
  return result&&result.data&&result.data.verifyMobileNumber?result.data.verifyMobileNumber:{};
}

export async function resendSmsOtpHandler(mobileNumber,connection){
  var connection=connection||{};
  const result = await connection.mutate({
    mutation: gql`
    mutation($mobileNumber:String){
        resendSmsVerification(
          mobileNumber :$mobileNumber
        ){
            success,
            code,
            result
         } 
      }
    `,
    variables: {
      mobileNumber:mobileNumber
    }
  });
  //console.log(result);
  return result&&result.data&&result.data.resendSmsVerification?result.data.resendSmsVerification:{};
}
