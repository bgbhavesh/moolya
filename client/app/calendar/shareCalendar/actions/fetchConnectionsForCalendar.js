import gql from 'graphql-tag';
import { appClient } from '../../../../app/core/appConnection';

export async function getSharedConnectionsActionHandler() {
  const result = await appClient.query({
    query: gql`
    query{
      getMySharedCalendarConnections {
        userId
        displayName
        profilePic
    }
  }`,
    forceFetch: true
  })
  const id = result.data.getMySharedCalendarConnections;
  return id
}


export async function getSharedCalendarHandler(userId, month, year, date) {
  const result = await appClient.query({
    query: gql`
    query($userId: String, $month:Int, $year: Int, $date: Int){ 
      getSharedCalendar(userId:$userId, month:$month, year: $year, date: $date) {
          days{
            date
            status
          }
          expiryDate
      }
    }
    `,
    forceFetch: true,
    variables: {
      userId,
      month,
      year,
      date
    }
  });
  const sharedCalendar = result.data.getSharedCalendar;
  return sharedCalendar;
}

export async function fetchConnections() {
  const result = await appClient.query({
    query: gql`
    query{
      fetchConnections {
        userId
        profileId
        displayName
        profileImage
      }
    }`,
    forceFetch: true
  })
  const id = result.data.fetchConnections;
  return id
}
