/**
 * Created by birendra on 6/7/17.
 */


import gql from 'graphql-tag'
import {appClient} from '../../../../core/appConnection';

/**
 * updateCalendarVacationActionHandler() --> construct the query to save in db
 * @param vacation --> updated object
 * @returns {Promise.<*>} --> succeed response send to component
 */
export async function updateCalendarVacationActionHandler(vacation) {
  const result = await appClient.mutate({
    mutation: gql`
    mutation($vacation: calendarSettingVacation) {
      updateMyCalendarVacation(vacation: $vacation) {
        success
        code
        result
      }
    }
    `,
    variables: {
      vacation,
    }
  });
  const response = result.data.updateMyCalendarVacation;
  return response;
}
