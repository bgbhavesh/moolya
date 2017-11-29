import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo';
import MlTableView from '../components/MlTableView'

const DataComposerType = 'graphQl';
export default class MlTableViewComposer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const config = this.props;
    // note: params are mandatory,if not data will not be fetched
    const queryOptions = {
      forceFetch: true,
      variables: {
        offset: 0,
        limit: 10, // config.sizePerPage||
        context: null,
        fieldsData: config.fieldsData || null,
        sortData: config.sort || null
      }
    };
    if (DataComposerType === 'graphQl') {
      const hasQueryOptions = !!config.queryOptions;
      if (hasQueryOptions) {
        const dynamicQueryOptions = config.buildQueryOptions ? config.buildQueryOptions(config) : {};

        const extendedQueryVar = _.extend(queryOptions.variables, dynamicQueryOptions);
        queryOptions.variables = extendedQueryVar;
      }
      const Composer = graphql(config.graphQlQuery, {
        options: props => (queryOptions),
        props: ({ data: { loading, data, fetchMore } }) => ({
          loading,
          data,
          fetchMore: (sizePerPage, pageNumber, searchFilter, sortData, context) => fetchMore({
            variables: {
              offset: sizePerPage * (pageNumber - 1) || 0,
              limit: sizePerPage || 10,
              fieldsData: searchFilter || null,
              sortData: sortData || null,
              context: context || null
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult.data) {
                return prev;
              }
              return {
                data: fetchMoreResult.data.data
              };
            }
          })
        })
      })(MlTableView);
      return (<Composer {...config}/>);
    }
    return null;
  }
}

