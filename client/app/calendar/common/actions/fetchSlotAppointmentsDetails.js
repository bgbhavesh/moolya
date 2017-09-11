/**
 * Created by pankaj on 29/8/17.
 */
import gql from 'graphql-tag'
import {appClient} from '../../../core/appConnection';
export async function fetchSlotAppointmentsDetailsActionHandler (appointmentId) {
  const result = await appClient.query({
    query: gql`
    query($appointmentId: [String]){ 
      fetchSlotDetails(appointmentId: $appointmentId){
         _id
          appointmentType
          appointmentId
          startDate
          endDate
          status
          attendeeDetails{
            firstName
            lastName
            profileImage
            userId
            isProvider
            isClient
            isAttendee
          }
          taskName
          userMobileNumber
          userEmail
          userImage
          appointmentInfo {
            resourceType
            resourceId
            serviceCardId
            serviceName
            taskName
            sessionId
            serviceOrderId
          }
      }
    }
    `,
    variables:{
      appointmentId
    },
    forceFetch:true
  });
  const slotDetails = result.data.fetchSlotDetails;
  return slotDetails;
}
