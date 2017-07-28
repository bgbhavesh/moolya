import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findDateAndTimeActionHandler(Id)
{
  let did=Id;
  const result = await client.query({
    query: gql`
           query{
          fetchGlobalSettings(type:DATEANDTIME){
            dateAndTimeInfo{
              timeFormat
              amSymbol
              pmSymbol
              dateFormat
              numberOfDaysInWeek
              firstDayOfWeek
              hoursFormat
              timeZone
            }
          }
            
          
        }
    `,
    forceFetch:true
  })
  const id = result.data.fetchGlobalSettings;
  return id
}
