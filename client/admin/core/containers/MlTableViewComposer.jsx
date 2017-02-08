import React, { Component } from 'react'
import { graphql,compose } from 'react-apollo';
import MlTableView from "../components/MlTableView"

const DataComposerType='graphQl';
export default class  MlTableViewComposer extends Component {
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
      })(MlTableView);
      return (<Composer {...config}/>);
    }
    return null;

  }
}

