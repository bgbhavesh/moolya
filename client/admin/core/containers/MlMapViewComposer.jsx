import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo';
import MoolyaMapView from '../../../commons/components/map/MoolyaMapView'
import _ from 'lodash';
const DataComposerType = 'graphQl';
export default class MlMapViewComposer extends Component {
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
        limit: config.sizePerPage || 50, // config.sizePerPage|| 10
        context: null,
        searchSpec: null,
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
          fetchMore: variables => fetchMore({
            variables: variables || {
              offset: data
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
      })(MoolyaMapView);
      return (<Composer {...config}/>);
    }
    return null;
  }
}

