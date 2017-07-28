/**
 * Created by birendra on 4/7/17.
 */

import gql from 'graphql-tag'
import {appClient} from '../../../../core/appConnection';

/**
 * updateCalendarWorkingDayActionHandler() --> construct the query to save in db
 * @param workingDay --> updated object
 * @returns {Promise.<*>} --> succeed response send to component
 */
export async function updateCalendarWorkingDayActionHandler(workingDay) {
  const result = await appClient.mutate({
    mutation: gql`
    mutation($workingDay: calendarSettingWorkingDays) {
      updateMyCalendarWorkingDay(workingDay: $workingDay) {
        success
        code
        result
      }
    }
    `,
    variables: {
      workingDay: workingDay,
    }
  });
  const response = result.data.updateMyCalendarWorkingDay;
  return response;
}

/**
 * updateCalendarWorkingDaysActionHandler() --> construct the query to save in db
 * @param workingDays --> updated array of objects
 * @returns {Promise.<*>} --> succeed response send to component
 */
export async function updateCalendarWorkingDaysActionHandler(workingDays) {
  const result = await appClient.mutate({
    mutation: gql`
    mutation($workingDays: [calendarSettingWorkingDays]) {
      updateMyCalendarWorkingDays(workingDays: $workingDays) {
        success
        code
        result
      }
    }
    `,
    variables: {
      workingDays: workingDays
    }
  });
  const response = result.data.updateMyCalendarWorkingDays;
  return response;
}
