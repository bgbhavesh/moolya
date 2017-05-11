import gql from 'graphql-tag'
import {client} from '../../../client/admin/core/apolloConnection';

export async function findModuleCustomFilterActionHandler(moduleName){
    const result = await client.query({
    query: gql`
    query  ($moduleName: String){
        fetchModuleFilters(moduleName:$moduleName){
            moduleName
            filterName
            filterDescription
            isActive
            filterFields{
              fieldName
              displayName
              isActive
              isDynamic
              fieldType
              fieldResolverName
              fieldList{
                departmentId
                subDepartmentId
                roleId
                listValueId
              }
            }
        }
      }
    `,
    variables: {
      moduleName:moduleName
    },
    forceFetch:true
  });
  const id = result.data.fetchModuleFilters;
/*  let data = _.omit(id,'__typename');*/

  return id

}
