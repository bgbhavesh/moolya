import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function findTaxationActionHandler(TaxationId) {
  let did=TaxationId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        fetchTaxation(id:$id) {
          _id
          taxationName
          taxationValidityFrom
          taxationValidityTo
          aboutTaxation
          isActive
    			taxInformation{
            taxId,
            taxName,
            taxPercentage,
            aboutTax,
            applicableStates
            statesInfo{
              taxId,
              stateName,
              taxPercentage,
              isChecked
            }
          }
        }
      }
    `,
    variables: {
      id:did
    },
    forceFetch:true
  })
  const id = result.data.fetchTaxation;
  return id
}
