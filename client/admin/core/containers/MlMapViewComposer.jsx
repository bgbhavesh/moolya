import React, { Component } from 'react'
import { graphql,compose } from 'react-apollo';
import MoolyaMapView from "../../../commons/components/map/MoolyaMapView"

const DataComposerType='graphQl';
export default class  MlMapViewComposer extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    let config=this.props;
    //note: params are mandatory,if not data will not be fetched
    let queryOptions={
      forceFetch: true,
      variables: {
        context:null,
        searchSpec:null
      }
    };
    if(DataComposerType==='graphQl'){
      let hasQueryOptions=config.queryOptions?true:false;
      if(hasQueryOptions){
        let dynamicQueryOptions=config.buildQueryOptions?config.buildQueryOptions(config):{};

        let extendedQueryVar=_.extend(queryOptions.variables,dynamicQueryOptions);
        queryOptions["variables"]=extendedQueryVar;
      }

      const Composer = graphql(config.graphQlQuery, {
        options: props => (queryOptions),
        props: ({data: {loading, data, fetchMore}}) => ({
          loading,
          data
        })
      })(MoolyaMapView);
      return (<Composer {...config}/>);
    }
    return null;

  }
}

