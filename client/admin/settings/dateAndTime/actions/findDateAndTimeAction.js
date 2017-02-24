import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findDateAndTimeActionHandler(Id)
{
  let did=Id;
  const result = await client.query({
    query: gql`
    query  ($id: String){
        findDateAndTime(_id:$id){
        _id
        timeFormat
        amSymbol
        pmSymbol
        dateFormat
        numberOfDaysInWeek
        firstDayOfWeek
        }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.findDateAndTime;
  return id
}
