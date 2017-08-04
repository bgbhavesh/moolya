/**
 * Created by pankaj on 4/8/17.
 */
export async function fetchSessionDayActionHandler (orderId,sessionId, day, month, year ) {
  const result = await appClient.query({
    query: gql`
    query($orderId:String!, $sessionId: String!, $day: Int, $month: Int, $year: Int) { 
      getSessionDayAvailable(orderId: $orderId,sessionId:$sessionId,day:$day,month: $month, year: $year) {
        isAvailable
        slotTime
        status
      }
    }
    `,
    variables: {
      orderId,
      sessionId,
      day,
      month,
      year
    },
    forceFetch:true
  });
  const myCalendar = result.data.getSessionDayAvailable;
  return myCalendar;
}
