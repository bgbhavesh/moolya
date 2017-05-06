import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import {findModuleCustomFilterActionHandler} from './findCustomFilterAction';
import gql from 'graphql-tag'
import Moolyaselect from  '../../commons/components/select/MoolyaSelect'
import {graphql} from 'react-apollo';
import Datetime from "react-datetime";
import moment from "moment";
import {customFilterSearchQuery} from "./customFilterSearchQueryActionHandler"
export default class MlCustomFilter extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterFields : [],
      selectedOption : null,
      selectedFromDate : null,
      selectedToDate : null,
      filterQueries : []}

    this.fetchFilters.bind(this);
  }
  componentDidMount(){
    this.fetchFilters();
    $('.filter_btn').click(function(){
      $('.filter_table').toggleClass('filter_hide');
    });
  }
  async fetchFilters(){
    const response = await findModuleCustomFilterActionHandler(this.props.moduleName);
    this.setState({filterFields : response})

  }
  onFromDateSelection(fieldName,subType,event) {
    if (event._d) {
      let value = moment(event._d).format('DD-MM-YYYY');
      this.setState({selectedFromDate: value});
      this.setFilterData(fieldName,value,"Date",subType)
    }
  }
  onToDateSelection(fieldName,subType,event) {
    if (event._d) {
      let value = moment(event._d).format('DD-MM-YYYY');
      this.setState({selectedToDate: value});
      this.setFilterData(fieldName,value,"Date",subType)
    }
  }
  optionsSelected(selectedFieldName, selectedValue, callback,selObject){
    this.setState({selectedOption : selectedValue})
    this.setFilterData(selectedFieldName,selectedValue,"List",null)

  }
  onInputBlur(fieldName,event){
    let enteredValue = event.target.value
    this.setFilterData(fieldName,enteredValue,"String",null)
  }
  setFilterData(selectedFieldName,selectedValue,selectedType,selectedSubType){
    let queries = this.state.filterQueries;
    /*if(selectedValue){
      let selector = this.create_selector(selectedFieldName, selectedValue, selectedType,selectedSubType);
      //only for between operator
      if(selectedType==="Date"){
        let query=queries[selectedFieldName]||{};
        let updatedSelector=_.extend(query,selector);
        selector=updatedSelector;
      }
      queries[selectedFieldName] = selector;
      this.setState({"filterQueries" : queries})
    }else{
      if(selectedType!=="Date"){
        let queries=_.omit(queries,selectedFieldName);
        this.setState({"filterQueries" : queries})
      }
    }*/
    if(selectedValue){
      let selector = this.create_selector(selectedFieldName, selectedValue, selectedType,selectedSubType);
      //only for between operator
      queries.push(selector);
      this.setState({"filterQueries" : queries})

    }
  }
  create_selector(selectedFieldName, selectedValue, selectedType,selectedSubType){
    let select = {};
    switch(selectedType){
      case "String":
        /*select={$regex: selectedValue, $options: 'i'};*/
        select = {"fieldName" : selectedFieldName,"value" : selectedValue,"fieldType" : selectedType,"operator" : selectedSubType}
        return select;
        break;
      case "Number":
        /*selectedValue = Number(selectedValue);
        select =selectedValue;*/
        select = {"fieldName" : selectedFieldName,"value" :  Number(selectedValue),"fieldType" : selectedType,"operator" : selectedSubType}
        return select;
      case "Boolean":
        if(selectedValue&&selectedValue.toLowerCase()==="true"){
          selectedValue=true;
        }else if(selectedValue&&selectedValue.toLowerCase()==="false"){
          selectedValue=false;
        }else{
          selectedValue=false;
        }
        /*select= selectedValue;*/
        select = {"fieldName" : selectedFieldName,"value" :  selectedValue,"fieldType" : selectedType,"operator" : selectedSubType}
        return select;
      case "Date":
        let value= moment(new Date(selectedValue)).startOf("day").toDate();
        /*if(selectedSubType==="from"){
          select={$gte: selectedValue};
        }
        if(selectedSubType==="to"){
          select={$lt: selectedValue};
        }*/
        select = {"fieldName" : selectedFieldName,"value" :  value,"fieldType" : selectedType,"operator" : selectedSubType}

        return select;
      case "List":
        /*select={$in: selectedValue};*/
        select = {"fieldName" : selectedFieldName,"value" :  selectedValue,"fieldType" : selectedType,"operator" : selectedSubType}
        return select;
      default:
        return {};
    }

  }
  async onApplyFilter(){
    //const response = await customFilterSearchQuery(this.state.filterQueries,this.props.moduleName);

    this.props.onFilterChange(this.state.filterQueries);
    //this.setState({filterQueries : []});
  }
  render(){
    let that = this;
    let fieldsData = that.state.filterFields || [];
    let dateSelect = false;
    let stringSelect = false;
    let listSelect = false
    let listOptions = null;
    let selectedValue = that.state.selectedOption?that.state.selectedOption:""

    let filterListQuery=gql`query($moduleName:String!,$list:[String]){  
      data:fetchSelectedFilterListDropDown(moduleName:$moduleName,list:$list) {
       label
        value
      }  
    }`;

    return(
      <div className=" ">
        <div className="panel panel-default">
         <div className="">
            <div>
            <div className="">
              {fieldsData && fieldsData[0]&& fieldsData[0].filterFields&& fieldsData[0].filterFields.map(function(options,id){
                if(options && options.fieldList && options.fieldCollectionName){
                  listOptions={options: { variables: {moduleName:options.fieldCollectionName,list:options.fieldList}}}
                }
                if(options.fieldType == "Date"){
                  dateSelect = true
                }else{
                  dateSelect = false
                }
                if(options.fieldType == "List"){
                  listSelect = true
                }else{
                  listSelect = false
                }
                if(options.fieldType == "String"){
                  stringSelect = true
                }else{
                  stringSelect = false
                }
                if(options && options.fieldList && options.fieldCollectionName){
                  listOptions={options: { variables: {moduleName:options.fieldCollectionName,list:options.fieldList}}}
                }
                return(<span key={id}>
                  {dateSelect?<div><Datetime dateFormat="DD-MM-YYYY" timeFormat={false}  inputProps={{placeholder: "From"}}   closeOnSelect={true} onChange={that.onFromDateSelection.bind(that,options.fieldName,"$gte")}/></div>:""}
                  {dateSelect?<div><Datetime dateFormat="DD-MM-YYYY" timeFormat={false}  inputProps={{placeholder: "To"}}   closeOnSelect={true} onChange={that.onToDateSelection.bind(that,options.fieldName,"$lt")}/></div>:""}
                  {listSelect?<div><Moolyaselect multiSelect={false} placeholder={options.displayName} valueKey={'value'} labelKey={'label'}  queryType={"graphql"} query={filterListQuery} reExecuteQuery={true} queryOptions={listOptions} selectedValue={selectedValue} onSelect={that.optionsSelected.bind(that,options.fieldName)} isDynamic={true} id={'list'+id}/></div>:""}
                  {stringSelect?<div><input type="text"  ref="documentId" placeholder="Document Id" className="form-control float-label" id="" onBlur={that.onInputBlur.bind(that,options.fieldName)}/></div>:""}</span>)

                })}
              <div className="ml_icon_btn">
                <a href="#"  className="save_btn" onClick={this.onApplyFilter.bind(this)} ><span
                  className="ml ml-save"></span></a>
                <a href="#" id="cancel_contact" className="cancel_btn"><span className="ml ml-delete"></span></a>
              </div>

            </div>
            </div>
          </div>

        </div>
        <div className="filter_btn"><img src="/images/filter_icon.png"/></div>
      </div>
    )
  }
}
