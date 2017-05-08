import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';
import {createLead} from '../actions/createLead'
import {createleadsquaredActivity} from '../../../../commons/leadsquared/createleadsquaredActivity'

export async function createRegistrationInfo(registrationDetails) {
  let registration = {}
  registration = registrationDetails;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($registration: registrationInfoInput!, $moduleName:String!, $actionName:String!){
        createRegistration(
          registration : $registration,
          moduleName:$moduleName,
          actionName:$actionName,
        ) {
          success
          code
          result
        }
      }
    `,
    variables: {
      registration,
      moduleName:"REGISTRATION",
      actionName:"CREATE",
    }
  })
  const id = result.data.createRegistration;
  //trigger leadsquared lead and activity
  if(id.success) {
    const lead = await createLead(registrationDetails, Meteor.settings.public.LEADSQUARED_URL)
    const activity = await createleadsquaredActivity(registrationDetails.email, Meteor.settings.public.createNewUser.code, Meteor.settings.public.createNewUser.message, Meteor.settings.public.LEADSQUARED_ACTIVITY_URL)
  }
  return id
}
