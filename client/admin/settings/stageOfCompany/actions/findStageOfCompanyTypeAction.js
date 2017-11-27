import gql from 'graphql-tag'
import { client } from '../../../core/apolloConnection';

export async function findStageOfCompanyTypeActionHandler(StageOfCompanyTypeId) {
  const did = StageOfCompanyTypeId
  const result = await client.query({
    query: gql`
    query  ($id: String){
        FindStageOfCompany(_id:$id){
         id:_id
        stageOfCompanyName
        stageOfCompanyDisplayName
        isActive
        about
      }
      }
    `,
    variables: {
      id: did
    },
    forceFetch: true
  })
  const id = result.data.FindStageOfCompany;
  return id
}
