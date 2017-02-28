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
          variables: {
              offset: 0,
              limit: config.sizePerPage||5,
              fieldsData:config.fieldsData||null,
              sortData:config.sort||null
          },
          forceFetch: true
        }),
        props: ({data: {loading, data, fetchMore}}) => ({
          loading,
          data,
          fetchMore: (sizePerPage,pageNumber,searchFilter,sortData) => fetchMore({
            variables: {
              offset:sizePerPage*(pageNumber-1)||0,
              limit:sizePerPage||10,
              fieldsData:searchFilter||null,
              sortData:sortData||null
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

