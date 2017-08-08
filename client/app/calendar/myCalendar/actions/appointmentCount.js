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
    query($profileId: String, $day: Int, $month: Int){ 
      fetchServiceSeekerList(profileId: $profileId, day: $day, month: $month){
        name
        userId
        profileId
        transId
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








