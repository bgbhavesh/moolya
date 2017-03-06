import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findRegionalActionHandler()
{
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
            }
          }
            
          
        }
    `,
    forceFetch:true
  })
  const id = result.data.fetchGlobalSettings;
 // let did=Id;
  /*const result = await client.query({
    query: gql`
    query  ($id: String){
        fetchRegional(_id:$id){
          _id
          clusterName
          capitalName
          aboutRegion
          regionalPhoneNumber
          regionalFlag
          regionalZipFormat
          regionalCurrencyName
          regionalCurrencyValue
          regionalCurrencySymbol
          regionalCurrencyMarking
        }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.fetchRegional;*/
  return id
}
