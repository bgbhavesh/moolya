/**
 * Created by pankaj on 28/6/17.
 */
import gql from 'graphql-tag'
import {appClient} from '../../../../core/appConnection';

export async function fetchCalendarSettingsActionHandler (profileId) {
  const result = await appClient.query({
    query: gql`
    query($profileId:String) {
      fetchMyCalendarSetting(profileId: $profileId) {
        _id
        slotDuration{
          hours
          minutes
        }
        appointmentCountPerSlots
        slotBreakTime
        isOverlappingSchedule
        workingDays{
          isActive
          dayName
          lunch{
            isActive
            start
            end
          }
          slot{
            isActive
            start
            startTimestamp
            end
            endTimestamp
          }
        }
        vacations{
          isActive
          start
          end
          type
          note
        }
      }
    }
    `,
    variables: {
      profileId:profileId
    },
    forceFetch: true
  });
  const settings = result.data.fetchMyCalendarSetting;
  return settings;
}
