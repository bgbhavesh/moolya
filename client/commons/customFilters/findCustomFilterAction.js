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

  const data = result.data.fetchModuleFilters;
  let resultData = _.omit(data,'__typename');


  let fieldsArray = [];

  fieldsArray=_.map(resultData.filterFields, function (row) {
    return _.omit(row, ['__typename'])

  });



  resultData["filterFields"] = fieldsArray

  return resultData



}
