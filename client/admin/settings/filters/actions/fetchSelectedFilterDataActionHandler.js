import gql from 'graphql-tag'

import {client} from '../../../../../client/admin/core/apolloConnection'
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
              filterFields{
                fieldName
                fieldType
                fieldList
                isRestrictedFilter
                fieldResolverName
                isDynamic
                isActive
              }
              clusterFields{
                cluster
                chapter
                subChapter
                department
                subDepartment
                role
              }
              }
        }

    `,
    variables: {
      id: id,
    },
    forceFetch: true
  })
  const data = result.data.fetchSelectedFilterData;
  return data
}
