import gql from 'graphql-tag'
import {appClient} from '../../core/appConnection';

export async function fetchDefaultCenterOfUser(ModuleTypeDetails) {
  let did=ModuleTypeDetails
  let result = await appClient.query({
    query: gql`
        query($module: String, $id: String){
         data:fetchMapCenterCordsForExternalUser(module: $module, id: $id){
          lat
          lng
      }
    }
    `,
    variables: {
      id:did.id,
      module:did.moduleName
    },
    forceFetch:true
  });
  result=result&&result.data&&result.data.data?result.data.data:null;
  return result;
}
