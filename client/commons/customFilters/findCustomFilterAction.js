import gql from 'graphql-tag'
/* import {client} from '../../../client/admin/core/apolloConnection'; */

export async function findModuleCustomFilterActionHandler(moduleName, connObj) {
  const connection = connObj || {};
  const result = await connection.query({
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
              clearFields
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
      moduleName
    },
    forceFetch: true
  });

  const data = result.data.fetchModuleFilters;
  const resultData = _.omit(data, '__typename');


  let fieldsArray = [];

  fieldsArray = _.map(resultData.filterFields, row => _.omit(row, ['__typename']));


  resultData.filterFields = fieldsArray

  return resultData
}
