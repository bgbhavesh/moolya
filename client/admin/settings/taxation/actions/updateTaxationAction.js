import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';
import { getAdminUserContext } from '../../../../commons/getAdminUserContext';

export async function updateTaxationActionHandler(TaxationDetails) {
  const id = TaxationDetails.id;
  const clusterId = getAdminUserContext().clusterId;
  const taxation = TaxationDetails.taxation;
  const result = await client.mutate({
    mutation: gql`
    mutation  ($clusterId:String, $id: String, $taxation: taxationInput){
        updateTaxation(
          clusterId:$clusterId,
          id:$id,
          taxation: $taxation
          ) 
      }
    `,
    variables: {
      clusterId,
      id,
      taxation
    }
  })
  const tid = result;
  return tid
}
