/**
 * Created by pankaj on 20/8/17.
 */

import gql from 'graphql-tag'
import {appClient} from '../../../core/appConnection';

export async function fetctOfficeDayAppointmentActionHandler (userId, profile, day, month, year) {
  const result = await appClient.query({
    query: gql`
    query($userId: String, $profileId: String!, $day: Int, $month: Int, $year: Int) { 
      fetchMyAppointment(userId: $userId, profileId: $profileId, day: $day, month: $month, year: $year) {
        slot
        shift
        appointments {
          id
          type
          name
        }
      }
    }
    `,
    variables: {
      userId: userId,
      profileId: profile,
      day: day,
      month: month,
      year: year
    },
    forceFetch:true
  });
  const myCalendar = result.data.fetchMyAppointment;
  return myCalendar;
}
