/**
 * Created by pankaj on 4/8/17.
 */
export async function fetchServiceCalendarActionHandler (portfolioId,month, year) {
  const result = await appClient.query({
    query: gql`
    query($portfolioId: String, $month:Int, $year: Int) { 
      getServiceProviderCalendar(portfolioId: $portfolioId,month: $month, year: $year) {
        days {
          date
          status
        }
      }
    }
    `,
    variables: {
      portfolioId: portfolioId,
      month: month?month:0,
      year: year?year:0
    },
    forceFetch:true
  });
  const myCalendar = result.data.getServiceProviderCalendar;
  return myCalendar;
}
