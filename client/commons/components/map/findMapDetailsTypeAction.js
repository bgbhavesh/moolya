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
    forceFetch:true
  })
  const totalResult = result.data.data;
  return totalResult
}

export async function fetchDefaultCenterOfUser() {
  let result = await client.query({
    query: gql`
        query{
         data:fetchMapCenterCordsForUser{
          lat
          lng
      }
    }
    `,
    forceFetch:true
  });
  result=result&&result.data&&result.data.data?result.data.data:null;
  return result;
}
