import gql from 'graphql-tag'

import { client } from '../../../../../client/admin/core/apolloConnection'
import _ from 'lodash'

export async function fetchSelectedFilterDataActionHandler(id) {
  const result = await client.query({
    query: gql`
        query ($id: String!) {
            fetchSelectedFilterData(id: $id) {
              _id
              filterName
              filterDescription
              isActive
              moduleName
              filterFields{
                fieldName
                displayName
                fieldType
                fieldResolverName
                isDynamic
                isActive
                isCustom
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
      id
    },
    forceFetch: true
  })
  const data = result.data.fetchSelectedFilterData;
  const resultData = _.omit(data, '__typename');


  let fieldsArray = [];

  fieldsArray = _.map(resultData.filterFields, row => _.omit(row, ['__typename']));


  resultData.filterFields = fieldsArray
  return resultData
}
