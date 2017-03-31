import gql from 'graphql-tag'
import {client} from '../../../admin/core/apolloConnection';

export async function findMapDetailsTypeActionHandler(ModuleTypeDetails) {
  let did=ModuleTypeDetails
  const result = await client.query({
    query: gql`
        query ($moduleName: String, $id: String) {
         data: FetchMapData(moduleName: $moduleName, id: $id){
          key
          count
          icon
      }
    }
    `,
    variables: {
      id:did.id,
      moduleName:did.moduleName
    },
    fetchPolicy: 'cache-first'
  })
  const totalResult = result.data.data;
  return totalResult
}
