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
export async function updateCalendarVacationActionHandler(profileId, vacation) {
  const result = await appClient.mutate({
    mutation: gql`
    mutation($profileId: String, $vacation: calendarSettingVacation) {
      updateMyCalendarVacation(profileId: $profileId, vacation: $vacation) {
        success
        code
        result
      }
    }
    `,
    variables: {
      profileId,
      vacation
    }
  });
  const response = result.data.updateMyCalendarVacation;
  return response;
}

/**
 * updateCalendarVacationByIdActionHandler() --> construct the query to save in db
 * @param vacation --> updated object
 * @returns {Promise.<*>} --> succeed response send to component
 */
export async function updateCalendarVacationByIdActionHandler(profileId, vacation, vacationId) {
  const result = await appClient.mutate({
    mutation: gql`
    mutation($profileId:String, $vacation: calendarSettingVacation, $vacationId: String) {
      updateCalendarVacationByVacationId(profileId: $profileId, vacation: $vacation, vacationId: $vacationId) {
        success
        code
        result
      }
    }
    `,
    variables: {
      profileId,
      vacation,
      vacationId
    }
  });
  const response = result.data.updateCalendarVacationByVacationId;
  return response;
}
