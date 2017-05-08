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
import {initalizeFloatLabel} from '../../admin/utils/formElemUtil';
import {customFilterSearchQuery} from "./customFilterSearchQueryActionHandler"
export default class MlCustomFilter extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterFields : [],
      selectedOption : null,
      selectedFromDate : null,
      selectedToDate : null,
      filterQueries : [],
      dateQuery : {}}

    this.fetchFilters.bind(this);
  }
  componentDidMount(){
    this.fetchFilters();
    $('.filter_btn').click(function(){
      $('.filter_table').toggleClass('filter_hide');
    });
  }
  componentDidUpdate(){
    initalizeFloatLabel();
  }
  async fetchFilters(){
    const response = await findModuleCustomFilterActionHandler(this.props.moduleName);
    this.setState({filterFields : response})

  }
  onFromDateSelection(fieldName,subType,event) {
    if (event._d) {
      let value = moment(event._d).format('MM-DD-YYYY');
      this.setState({selectedFromDate: value});
      this.setFilterData(fieldName,value,"Date",subType)
    }
  }
  onToDateSelection(fieldName,subType,event) {
    if (event._d) {
      let value = moment(event._d).format('MM-DD-YYYY');
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
  /*  if(queries.length>1){
      queries = queries[queries.length-1];
    }*/
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


        queries = $.grep(queries, function(e){
          return e.fieldName != selectedFieldName;
        });

        if(selectedType == "Date"){
          let dateSelect = {"fieldName" : selectedFieldName,"value" :  JSON.stringify(this.state.dateQuery),"fieldType" : selectedType,"operator" : selectedSubType}
          queries.push(dateSelect)
        }else{
          queries.push(selector);
        }



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
        let value= moment(selectedValue).startOf("day").toDate();
        if(selectedSubType==="from"){
          select= this.state.dateQuery
          select["$gte"] = value;
        }
        if(selectedSubType==="to"){
          select= this.state.dateQuery
          select["$lt"] = value;
        }

        //select = {"fieldName" : selectedFieldName,"value" :  value,"fieldType" : selectedType,"operator" : selectedSubType}

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
      this.props.onFilterChange( this.state.filterQueries);
    $('.filter_table').removeClass('filter_hide');
  }

  async onCancelFilter(){
    this.setState({filterQueries : []});
    this.props.onFilterChange(this.state.filterQueries);
    this.setState({selectedOption : ""})
    this.refs.input.value = "";
  }
  render(){
    let that = this;
    let fieldsData = that.state.filterFields || [];
    let dateSelect = false;
    let stringSelect = false;
    let listSelect = false;
    let booleanSelect = false;
    let listOptions = null;
    let selectedValue = that.state.selectedOption?that.state.selectedOption:""
    let restrictedFilterStatus = false

    let filterListQuery=gql`query($moduleName:String!,$list:[String]){  
      data:fetchSelectedFilterListDropDown(moduleName:$moduleName,list:$list) {
       label
        value
      }  
    }`;

    return(
      <div className="filter_table filter_hide">
        <div className="panel panel-default">



              {fieldsData && fieldsData[0]&& fieldsData[0].filterFields&& fieldsData[0].filterFields.map(function(options,id){
                if(options && options.fieldList && options.fieldCollectionName){
                  listOptions={options: { variables: {moduleName:options.fieldCollectionName,list:options.fieldList}}}
                }
                if(options.fieldType == "Date"){
                  dateSelect = true
                  restrictedFilterStatus = options.isRestrictedFilter;
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

                if(options.fieldType == "Boolean"){
                  booleanSelect = true
                }else{
                  booleanSelect = false
                }
                if(options && options.fieldList && options.fieldCollectionName){
                  listOptions={options: { variables: {moduleName:options.fieldCollectionName,list:options.fieldList}}}
                }

                return(<span key={id}>
                  {dateSelect?<div className="form-group col-lg-3"><Datetime dateFormat="DD-MM-YYYY" timeFormat={false}  inputProps={{placeholder: "From",className:"float-label form-control",disabled:restrictedFilterStatus}}   closeOnSelect={true} onChange={that.onFromDateSelection.bind(that,options.fieldName,"from")}/></div>:""}
                  {dateSelect?<div className="form-group col-lg-3"><Datetime dateFormat="DD-MM-YYYY" timeFormat={false}  inputProps={{placeholder: "To",className:"float-label form-control",disabled:restrictedFilterStatus}}   closeOnSelect={true} onChange={that.onToDateSelection.bind(that,options.fieldName,"to")}/></div>:""}
                  {listSelect?<div className="col-lg-3"><Moolyaselect multiSelect={false} placeholder={options.displayName} valueKey={'value'} labelKey={'label'}  queryType={"graphql"} query={filterListQuery} reExecuteQuery={true} queryOptions={listOptions} selectedValue={selectedValue} onSelect={that.optionsSelected.bind(that,options.fieldName)} isDynamic={true} id={'list'+id} disabled={options.isRestrictedFilter}/></div>:""}
                  {stringSelect?<div className="form-group col-lg-3"><input type="text"  ref="input" placeholder={options.displayName} className="form-control float-label" id="" onBlur={that.onInputBlur.bind(that,options.fieldName)} disabled={options.isRestrictedFilter}/></div>:""}</span>)

                })}
              {/*  <div className="col-lg-3">
                    <div className="input_types label_name">
                      <label>label : </label>
                    </div>
                    <div className="input_types">
                    <input id="radio1" type="radio" name="radio" value="1"/><label htmlFor="radio1"><span><span></span></span>option1</label>
                    </div>
                    <div className="input_types">
                    <input id="radio1" type="radio" name="radio" value="1"/><label htmlFor="radio1"><span><span></span></span>option2</label>
                    </div>
                </div>

                <div className="col-lg-3">
                  <div className="input_types label_name">
                    <label>label : </label>
                  </div>
                  <div className="input_types">
                  <input id="check1" type="checkbox" name="" value=""/><label htmlFor="check1"><span><span></span></span>option1</label>
                  </div>
                  <div className="input_types">
                  <input id="check2" type="checkbox" name="" value=""/><label htmlFor="check2"><span><span></span></span>option2</label>
                  </div>
                </div>
*/}
                <br className="brclear"/>
              <div className="ml_icon_btn">
                <a href="#"  className="save_btn" onClick={this.onApplyFilter.bind(this)} ><span
                  className="ml ml-save"></span></a>
                <a href="#" id="cancel_contact" className="cancel_btn" onClick={this.onCancelFilter.bind(this)}><span className="ml ml-delete"></span></a>


            </div>



        </div>
        <div className="filter_btn"><img src="/images/filter_icon.png"/></div>
      </div>
    )
  }
}
