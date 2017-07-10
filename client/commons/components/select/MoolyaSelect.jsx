import React, { Component} from 'react';
import MlSelectComponent from './Select';
import {client} from '../../../admin/core/apolloConnection';
export default class MoolyaSelect extends Component {
  constructor(props){
    super(props);
    return this;
  }


  retrieveSelectOptions(options,queryCallbackHandler){
    let connection=this.props.connection||client;
    if(connection){
    const selectionOptionsPromise =  connection.query({
      query: this.props.query,
      forceFetch:typeof this.props.forceFetch !== 'undefined'?options.forceFetch:true,
      variables:options.queryOptions
    })
    selectionOptionsPromise.then(data =>{
      if(queryCallbackHandler){
        queryCallbackHandler(data.data.data);
      }
    })
    }
  };

  render(){
    return(
      <MlSelectComponent {...this.props} retrieveSelectOptions={this.retrieveSelectOptions.bind(this)}></MlSelectComponent>
    )
  }
}
