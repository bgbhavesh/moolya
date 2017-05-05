import gql from 'graphql-tag'
import {client} from '../../../client/admin/core/apolloConnection'
import _ from 'lodash'


export async function customFilterSearchQuery(fieldQueries,module) {
  let fieldsData = fieldQueries
  let sortData = []
  console.log(fieldQueries);
  console.log(module);
  const result = await client.query({
    query: gql`
           query SearchQuery($module: String!,$offset: Int, $limit: Int, $fieldsData: [GenericFilter], $sortData: [SortFilter]) {
               data:SearchQuery(module:$module,offset: $offset, limit: $limit, fieldsData: $fieldsData, sortData: $sortData){
                totalRecords

              }
          }

      `,
    variables: {
      module: module,
      offset:1,
      limit : 3,
      fieldsData:fieldsData,
      sortData:sortData

    },
    forceFetch: true
  })

}

