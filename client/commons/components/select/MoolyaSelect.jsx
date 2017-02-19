import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Select from 'react-select';
import  $ from 'jquery'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
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
    this.onChangeCallBackHandler=this.onChangeCallBackHandler.bind(this);
    return this;
  }
  componentWillUpdate(nextProps, nextState) {
    if((this.props.queryOptions!==nextProps.queryOptions)) {
      this.setState({"executeQuery":true});
    }
  }


  onChangeCallBackHandler(items){
    if(items&&_.isArray(items)){
    this.setState({options:items,executeQuery:false});
    }else{
      this.setState({options:[],executeQuery:false});
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

 // this.props.onSearch(value,this.onChangeCallBackHandler);
  // this.props.searchTerm(value)
  }



  executeQuery(){
   function QueryHandler({data}) {
      let callbackHandler=data.variables&&data.variables.callBackHandler?data.variables.callBackHandler:null;
      if(data.loading===false&&callbackHandler){
        callbackHandler(data.data);
      }
      return null;
    }


  }

  render(){

    let QueryHandler=({data})=> {
      let callbackHandler=data.variables&&data.variables.callBackHandler?data.variables.callBackHandler:null;
      if(data.loading===false&&callbackHandler){
        callbackHandler(data.data);
      }
      return null;
    }

// You can also use `graphql` for GraphQL mutations
   const options=this.state.options?this.state.options:[];
   const executeQuery=this.state.executeQuery;
   const isDynamic=this.props.isDynamic;
   const query=this.props.query;
   const labelKey=this.props.labelKey||'label';
   const valueKey=this.props.valueKey||'value';
   let queryOptions=this.props.queryOptions&&this.props.queryOptions.options&&this.props.queryOptions.options.variables?this.props.queryOptions:{options:{variables:{}}};
    queryOptions.options.variables.searchQuery=this.state.searchTerm;
   let QueryExecutor=null;
   if(isDynamic&&query&&executeQuery){
     queryOptions['options']['variables']['callBackHandler']=this.onChangeCallBackHandler;
     QueryExecutor= graphql(query,queryOptions)(QueryHandler);
   }
    return(
      <div>
        {executeQuery&&<QueryExecutor />}
        {<Select  multi={this.props.multiSelect} labelKey={labelKey} valueKey={valueKey} options={options} value={this.props.selectedValue}  onInputChange={this.onInputSearch.bind(this)} onChange={this.onchangeOption.bind(this)}/>}
      </div>
    )
  }

}





