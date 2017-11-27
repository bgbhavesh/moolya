import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findRegionalActionHandler() {
  const result = await client.query({
    query: gql`
           query{
          fetchGlobalSettings(type:REGIONAL){
            regionalInfo{
              clusterName
              capitalName
              aboutRegion
              regionalPhoneNumber
              regionalCurrencyName
              regionalCurrencySymbol
              regionalCurrencyMarking
              regionalCurrencyValue
              regionalZipFormat
              regionalFlag
              numberOfDigitsAfterDecimal
              metricnumberOfDigitsAfterDecimal
              firstDayOfWeek
              currencySymbol
              measurementSystem
              currencyFormat
              rounding
              valueSeparator
            }
          }
            
          
        }
    `,
    forceFetch: true
  })
  const id = result.data.fetchGlobalSettings;
  return id
}
