import gql from 'graphql-tag'
import {appClient} from '../../../core/appConnection';


export async function fetchAllProfileAppointmentCountsHandler () {
  const result = await appClient.query({
    query: gql`
    query{ 
      fetchAllProfileAppointmentCounts{
        events{
          date
          userId
          profileId
          count
        }
        days{
          isActive
          start
          end
          type
        }
      }
    }
    `,
    forceFetch:true
  });
  const appointmentCounts = result.data.fetchAllProfileAppointmentCounts;
  return appointmentCounts;
}


export async function fetchProfileAppointmentCountsHandler (profileId) {
  const result = await appClient.query({
    query: gql`
    query($profileId: String){ 
      fetchProfileAppointmentCounts(profileId: $profileId){
        events{
          date
          userId
          profileId
          count
        }
        days{
          isActive
          start
          end
          type
        }
      }
    }
    `,
    variables:{
      profileId
    },
    forceFetch:true
  });
  const profileAppointmentCounts = result.data.fetchProfileAppointmentCounts;
  return profileAppointmentCounts;
}

export async function fetchServiceSeekerHandler (profileId, day, month) {
  const result = await appClient.query({
    query: gql`
    query($profileId: String!, $serviceId: String){ 
      fetchServiceSeekerList(profileId: $profileId, serviceId: $serviceId){
        name
        userId
        profileId
        transId
        orderId
        serviceId
      }
    }
    `,
    variables:{
      profileId,
      day,
      month
    },
    forceFetch:true
  });
  const serviceSeekers = result.data.fetchServiceSeekerList;
  return serviceSeekers;
}

export async function fetchSlotDetailsHandler (appointmentId) {
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
          }
          taskName
          userMobileNumber
          userEmail
          userImage
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









