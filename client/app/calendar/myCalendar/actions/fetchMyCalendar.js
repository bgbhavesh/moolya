/**
 * Created by pankaj on 21/7/17.
 */

import gql from 'graphql-tag'
import {appClient} from '../../../core/appConnection';

export async function fetchMyCalendarActionHandler (month, year) {
  const result = await appClient.query({
    query: gql`
    query($month:Int, $year: Int) { 
      getMyCalendar(month: $month, year: $year) {
        days {
          date
          status
        }
      }
    }
    `,
    variables: {
      month: month,
      year: year
    },
    forceFetch:true
  });
  const myCalendar = result.data.getMyCalendar;
  return myCalendar;
}
