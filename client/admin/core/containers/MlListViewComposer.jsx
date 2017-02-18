import React, { Component } from 'react'
import { graphql,compose } from 'react-apollo';
import MlListView from "../components/MlListView"
import _ from 'lodash';
const DataComposerType='graphQl';
export default class  MlListViewComposer extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    let config=this.props;
    let queryOptions={
      forceFetch: true,
      variables: {
        offset: 0,
        limit: config.sizePerPage||5,
      }
    };
    if(DataComposerType==='graphQl'){
      let hasQueryOptions=config.queryOptions?true:false;
      if(hasQueryOptions){
        let extendedQueryVar=_.extend(queryOptions.variables,config.queryOptions);
        queryOptions["variables"]=extendedQueryVar;
      }

      const Composer = graphql(config.graphQlQuery, {
        options: props => (queryOptions),
        props: ({data: {loading, data, fetchMore}}) => ({
          loading,
          data,
          fetchMore: () => fetchMore({
            variables: {
              offset: data,
            },
           updateQuery: (prev, {fetchMoreResult}) => {
              if (!fetchMoreResult.data) {
                return prev;
              }
              return {
                data: fetchMoreResult.data.data
              };
            },
          }),
        })
      })(MlListView);
      return (<Composer {...config}/>);
    }
    return null;

  }
}

