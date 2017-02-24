import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findRegionalActionHandler(Id)
{
  let did=Id;
  const result = await client.query({
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
  const id = result.data.fetchRegional;
  return id
}
