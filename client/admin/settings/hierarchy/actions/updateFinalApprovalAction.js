import gql from 'graphql-tag'
import {client} from '../../../core/apolloConnection';

export async function updateFinalApprovalActionHandler(approvalDetails)
{
  const result = await client.mutate({
    mutation: gql`
   mutation  ($finalRole:FinalApprovalInput){
        updateFinalApprovalRoles(
          finalRole:$finalRole         
        ){
            success,
            code,
            result
        }  
      }
    `,
    variables: {
      finalRole:approvalDetails
    }
  })
  const id = result.data.updateFinalApprovalRoles;
  return id
}
