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
    if(DataComposerType==='graphQl'){
      const Composer = graphql(config.graphQlQuery, {
        options: props => ({
          forceFetch: true,
        }),
        props: ({data: {loading, data, fetchMore}}) => ({
          loading,
          data,
          fetchMore: (sizePerPage,pageNumber) => fetchMore({
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
      })(MoolyaMapView);
      return (<Composer {...config}/>);
    }
    return null;

  }
}

