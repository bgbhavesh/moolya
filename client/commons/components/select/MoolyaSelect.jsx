import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Select from 'react-select';
import  $ from 'jquery'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {client} from '../../../admin/core/apolloConnection';
/*import 'react-select/dist/react-select.css';*/
import _ from 'lodash';
export default class MoolyaSelect extends Component {
  constructor(props){
    super(props);

    this.state = {
      selectedValue:'',
      options:null,
      executeQuery:true,
      searchQuery:'',

    }
    this.fetchSelectOptions.bind(this);
    this.onChangeCallBackHandler=this.onChangeCallBackHandler.bind(this);
    this.onchangeOption=this.onchangeOption.bind(this);
    this.onInputSearch=this.onInputSearch.bind(this);
    this.compareQueryOptions=this.compareQueryOptions.bind(this);
    return this;
  }

  /*componentWillUpdate(nextProps, nextState) {
    if((this.props.queryOptions!==nextProps.queryOptions)) {
      this.setState({"executeQuery":true});
    }
  }*/

  /*componentWillReceiveProps(nextProps){
    if((this.props.queryOptions !== nextProps.queryOptions)) {
      const resp=this.fetchSelectOptions(nextProps,this.onChangeCallBackHandler.bind(this));
      return resp;
    }
  }*/

  compareQueryOptions(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  componentDidMount(){
    this._isMounted=true;
    this.fetchSelectOptions(this.props,this.onChangeCallBackHandler);
  }
  componentWillUnmount(){
    this._isMounted=false;
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.searchTerm!==nextState.searchTerm){
      const resp=this.fetchSelectOptions(nextProps,this.onChangeCallBackHandler);
    }else if(!this.compareQueryOptions(this.props.queryOptions,nextProps.queryOptions)){
      const resp=this.fetchSelectOptions(nextProps,this.onChangeCallBackHandler);
    }
  }

  fetchSelectOptions(props,queryCallbackHandler){
    let queryOptions=props.queryOptions&&props.queryOptions.options&&props.queryOptions.options.variables?props.queryOptions:{options:{variables:{}}};
    if(this.state.searchTerm&&this.state.searchTerm!==""){
      queryOptions.options.variables.searchQuery=this.state.searchTerm;
    }
    if(props.queryOptions&&props.queryOptions.options&&props.queryOptions.options.variables){
    //  queryOptions.options.forceFetch=true;
    }

    const selectionOptionsPromise =  client.query({
      query: props.query,
      forceFetch:true,
      variables:queryOptions.options.variables
    })
    selectionOptionsPromise.then(data =>{
      if(queryCallbackHandler){
        queryCallbackHandler(data.data.data);
        console.log(data.data.data);
      }
    })
  };

  onChangeCallBackHandler(items)
  {
    if(this._isMounted) {
      if (items && _.isArray(items)) {
        this.setState({options: items, executeQuery: false});
      } else {
        this.setState({options: [], executeQuery: false});
      }
    }
  };

  onchangeOption(val){
    if(this.props.multiSelect){
      let refSelected=[]
      for(let i=0;i<val.length;i++){
        refSelected.push(val[i].value)
      }
      this.props.onSelect(refSelected,this.onChangeCallBackHandler);
      // this.setState({ selectedValue: refSelected });
    }
    else{
      if(val!= null){
        let selectValue=val.value
        this.props.onSelect(selectValue,this.onChangeCallBackHandler);
      }
      else{
        this.props.onSelect('',this.onChangeCallBackHandler);
      }
      // this.setState({ selectedValue: selectValue});
    }
  }

  onInputSearch(value){
    this.setState({"searchTerm": value,executeQuery:true});
  }

  render(){

// You can also use `graphql` for GraphQL mutations
    const options=this.state.options?this.state.options:[];
    const placeholder=this.props.placeholder||"Select...";
    //const executeQuery=this.state.executeQuery;
    const isDynamic=this.props.isDynamic;
    const query=this.props.query;
    const labelKey=this.props.labelKey||'label';
    const valueKey=this.props.valueKey||'value';

    // let queryOptions=this.props.queryOptions&&this.props.queryOptions.options&&this.props.queryOptions.options.variables?this.props.queryOptions:{options:{variables:{},forceFetch:true}};
    //  queryOptions.options.variables.searchQuery=this.state.searchTerm;
    //  if(this.props.queryOptions&&this.props.queryOptions.options&&this.props.queryOptions.options.variables){
    //    queryOptions.options.forceFetch=true;
    //  }

    // let QueryExecutor=null;
    // if(isDynamic&&query&&executeQuery){
    //   queryOptions['options']['variables']['callBackHandler']=this.onChangeCallBackHandler;
    //   QueryExecutor= graphql(query,queryOptions)(QueryHandler);
    // }
    return(
      <div>
        {/*{executeQuery&&<QueryExecutor />}*/}
        {<Select  multi={this.props.multiSelect} disabled={this.props.disabled} placeholder={placeholder} labelKey={labelKey} valueKey={valueKey} options={options} value={this.props.selectedValue}  onInputChange={this.onInputSearch} onChange={this.onchangeOption}/>}
      </div>
    )
  }
}
