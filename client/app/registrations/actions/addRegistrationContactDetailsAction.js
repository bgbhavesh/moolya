import gql from "graphql-tag";
import {appClient} from "../../core/appConnection";

export async function addRegistrationContactDetails(contactDetails) {


  let contactInfo = {}
  contactInfo = contactDetails;
  let registrationObject = {
    contactInfo: [contactDetails]
  }

  const result = await appClient.mutate({
    mutation: gql`
    mutation  ($registration: registrationObject!, $moduleName:String, $actionName:String){
        createRegistration(
          registration : $registration,
          moduleName:$moduleName,
          actionName:$actionName
        ){
            success,
            code,
            result
         } 
      }
    `,
    variables: {
      registrationObject,
      moduleName: "REGISTRATION",
      actionName: "CREATE"
    }
  })

  const id = result.data.createRegistration;
  console.log(result.data.createRegistration);
  return id
}
