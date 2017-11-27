import gql from 'graphql-tag'

import { client } from '../../../../../client/admin/core/apolloConnection'
import _ from 'lodash'

export async function fetchFilterCatalogActionHandler(moduleName) {
  const result = await client.query({
    query: gql`
          query ($moduleName: String!) {
              findFilterCatalog(moduleName: $moduleName) {
                _id
                moduleName
                fields{
                  name
                  type
                  resolverName
                  isDynamic
                }
              }
          }
  
      `,
    variables: {
      moduleName
    },
    forceFetch: true
  })
  const response = result.data.findFilterCatalog;

  const data = _.omit(response, '__typename');
  let fieldsObject = {}
  fieldsObject = _.map(data.fields, row => _.omit(row, ['__typename']));

  return fieldsObject
}

