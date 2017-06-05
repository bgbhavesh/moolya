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
import _ from 'lodash';
import _underscore from 'underscore'
export default class MlCustomFilter extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterFields : [],
      selectedOption : '',
      selectedFromDate : null,
      selectedToDate : null,
      filterQueries : [],
      dateQuery : {},
      selectedDropdownValues : []
    }

    this.fetchFilters.bind(this);
  }
  componentDidMount(){
    this.fetchFilters();
    $('.filter_btn').click(function(){
      $('.filter_table').toggleClass('filter_hide');
    });
    setTimeout(function(){
      $('[data-toggle="tooltip"]').tooltip({
        container:'body',
        trigger:"hover"
      });
      $('[data-toggle="tooltip').on('click', function () {
        $(this).tooltip('hide');
      });
    },1000);
  }
  componentDidUpdate(){
    initalizeFloatLabel();
  }
  async fetchFilters(){
    const response = await findModuleCustomFilterActionHandler(this.props.moduleName);
    this.setState({filterFields : response})

  }
  onFromDateSelection(fieldName,subType,displayName,event) {
    if (event._d) {
      let value = moment(event._d).format(Meteor.settings.public.dateFormat);
      this.setState({selectedFromDate: value});
      this.setFilterData(fieldName,value,displayName,null,"Date",subType)
    }
  }
  onToDateSelection(fieldName,subType,displayName,event) {
    if (event._d) {
      let value = moment(event._d).format(Meteor.settings.public.dateFormat);
      this.setState({selectedToDate: value});
      this.setFilterData(fieldName,value,displayName,null,"Date",subType)
    }
  }
  optionsSelected(index,selectedFieldName,displayName,clearFields,selectedValue, callback,selObject){

    if(displayName == "Cluster"){
      let that = this
      var result = _.map(clearFields, function (currentObject) {
        let selectedOption = "selectedOption_"+currentObject;
        that.setState({[selectedOption] : null})
      });
    }

    let selectedOption = "selectedOption_"+selectedFieldName;
    let selectedValues = this.state.selectedDropdownValues;
    selectedValues.push({selectedOption})
    this.setState({selectedDropdownValues : selectedValues})
    this.setState({[selectedOption] : selectedValue})
    this.setFilterData(selectedFieldName,selectedValue,displayName,clearFields,"List",null)



  }
  onInputBlur(fieldName,displayName,event){
    let enteredValue = event.target.value
    this.setFilterData(fieldName,enteredValue,displayName,null,"String",null)
  }

  onSelectBoolean(value,fieldName,event){
    this.setFilterData(fieldName,value,"Boolean",null)
  }

  setFilterData(selectedFieldName,selectedValue,displayName,clearFields,selectedType,selectedSubType){
    let queries = this.state.filterQueries;


      let selector = this.create_selector(selectedFieldName, selectedValue, selectedType,selectedSubType);
      //only for between operator


        queries = $.grep(queries, function(e){
          return e.fieldName != selectedFieldName;
        });

        if(selectedType == "Date"){
          let dateSelect = {"fieldName" : selectedFieldName,"value" :  JSON.stringify(this.state.dateQuery),"fieldType" : selectedType,"operator" :'$and' }
          queries.push(dateSelect)
        }else{
          queries.push(selector);
          if(selectedType == "List"){
            if(displayName == "Cluster"){

              queries = queries || []


              _.map(clearFields, function (currentObject) {
                queries = _underscore.without(queries, _underscore.findWhere(queries, {
                  fieldName: currentObject
                }));
              });



           /*   queries = queries.filter(function( obj ) {
                return obj.fieldName == "registrationInfo.chapterId";
              });*/




            }
          }
        }



      this.setState({"filterQueries" : queries})




  }
  create_selector(selectedFieldName, selectedValue, selectedType,selectedSubType){
    let select = {};
    switch(selectedType){
      case "String":
        /*select={$regex: selectedValue, $options: 'i'};*/
        select = {"fieldName" : selectedFieldName,"value" : selectedValue,"fieldType" : selectedType,"operator" : "$and"}
        return select;
        break;
      case "Number":
        /*selectedValue = Number(selectedValue);
        select =selectedValue;*/
        select = {"fieldName" : selectedFieldName,"value" :  Number(selectedValue),"fieldType" : selectedType,"operator" : "$and"}
        return select;
      case "Boolean":
      /*  if(selectedValue&&selectedValue.toLowerCase()==="true"){
          selectedValue=true;
        }else if(selectedValue&&selectedValue.toLowerCase()==="false"){
          selectedValue=false;
        }else{
          selectedValue=false;
        }*/
        /*select= selectedValue;*/
        select = {"fieldName" : selectedFieldName,"value" :  selectedValue,"fieldType" : selectedType,"operator" : "$and"}
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
        select = {"fieldName" : selectedFieldName,"value" :  selectedValue,"fieldType" : selectedType,"operator" : "$and"}
        return select;
      default:
        return {};
    }

  }
  async onApplyFilter(){
      this.props.onFilterChange( this.state.filterQueries);
      $('.filter_table').addClass('filter_hide');
  }

  async onCancelFilter(){
    this.setState({filterQueries : []});
    this.props.onFilterChange(null);
    let selectedValues = this.state.selectedDropdownValues
    let that = this;
    var result = _.map(selectedValues, function (currentObject) {
      let selectedOption = currentObject["selectedOption"];
      that.setState({[selectedOption] : ""})
    });
    $('.filter_table').addClass('filter_hide');

    this.refs.fromDateInput.state.inputValue = "";
    this.refs.toDateInput.state.inputValue = "";
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
    let booleanFieldName = null;

      let restrictedFilterStatus = false


    return(
      <div className="filter_table filter_hide">
        <div className="panel panel-default">



              {fieldsData &&  fieldsData.filterFields&& fieldsData.filterFields.map(function(options,id){



                let filterListQuery = null
                let select = '';
                let selectedValue = '';
                let zz =  options.fieldList|| [];
                var fieldListDataArray=_.map(zz, function (row) {
                  let val= _.omit(row, ['__typename']);
                  return val;
                });


             //   console.log(fieldListDataArray)

                if(options.fieldType == "Date"){
                  dateSelect = true
                  restrictedFilterStatus = options.isRestrictedFilter;
                }else{
                  dateSelect = false
                }
                if(options.fieldType == "List"){

                  listSelect = true
                  select =  "selectedOption_"+options.fieldName;
                  selectedValue = that.state[select];
                  filterListQuery=gql`query fetchSelectedFilterListDropDown($moduleName:String!,$list:[fieldListSpecifics],$filteredListId : [GenericFilter]){
                    data:fetchSelectedFilterListDropDown(moduleName:$moduleName,list:$list,filteredListId:$filteredListId) {
                     label
                      value
                    }
                  }`;

                    listOptions={options: { variables: {moduleName:options.fieldResolverName,list:fieldListDataArray,filteredListId:that.state.filterQueries}}}



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
                  booleanFieldName = options.fieldName
                }else{
                  booleanSelect = false
                }
                let fieldListData = options.fieldList && options.fieldList ? options.fieldList[0].listValueId : []


                return(<span key={id}>
                  {options.isActive&&dateSelect?<div className="form-group col-lg-3"><Datetime ref="fromDateInput" dateFormat="DD-MM-YYYY" timeFormat={false}  inputProps={{placeholder: "From Date",className:"float-label form-control",disabled:restrictedFilterStatus}}   closeOnSelect={true} onChange={that.onFromDateSelection.bind(that,options.fieldName,"from",options.displayName)}/></div>:""}
                  {options.isActive&&dateSelect?<div className="form-group col-lg-3"><Datetime ref="toDateInput" dateFormat="DD-MM-YYYY" timeFormat={false}  inputProps={{placeholder: "To Date",className:"float-label form-control",disabled:restrictedFilterStatus}}   closeOnSelect={true} onChange={that.onToDateSelection.bind(that,options.fieldName,"to",options.displayName)}/></div>:""}
                  {options.isActive&&listSelect?<div className="col-lg-3"><Moolyaselect multiSelect={false} ref="listSelect" placeholder={options.displayName} valueKey={'value'} labelKey={'label'}  queryType={"graphql"} query={filterListQuery} reExecuteQuery={true} queryOptions={listOptions} selectedValue={selectedValue} onSelect={that.optionsSelected.bind(that,id,options.fieldName,options.displayName,options.clearFields)} isDynamic={true} id={'list'+id}/></div>:""}
                  {options.isActive&&stringSelect?<div className="form-group col-lg-3"><input type="text"  ref="input" placeholder={options.displayName} className="form-control float-label" id="" onBlur={that.onInputBlur.bind(that,options.fieldName,options.displayName)} disabled={options.isRestrictedFilter}/></div>:""}
                  {/*{booleanSelect?<div className="col-lg-3">
                    <div className="input_types label_name">
                      <label>{options.displayName} : </label>
                    </div>
                    {fieldListData.map(function(data,id) {


                        return(<div className="input_types">
                          <input id="radio1" type="radio" name="radio"
                                 onChange={that.onSelectBoolean.bind(that, data,booleanFieldName)}/><label htmlFor="radio1"><span><span></span></span>{data}</label>
                        </div>)


                    })}

                  </div>:""}*/}
                  {booleanSelect?<div className="col-lg-3">
                    <div className="input_types label_name">
                      <label>{options.displayName} : </label>
                    </div>
                    <div className="input_types">
                      <input id="radio1" type="radio" name="radio" onChange={that.onSelectBoolean.bind(that, "true",booleanFieldName)}/><label htmlFor="radio1"><span><span></span></span>true</label>
                    </div>
                    <div className="input_types">
                      <input id="radio1" type="radio" name="radio" onChange={that.onSelectBoolean.bind(that, "false",booleanFieldName)}/><label htmlFor="radio1"><span><span></span></span>false</label>
                    </div>
                  </div>:""}
                  </span>)
                })}
{/*                <div className="col-lg-3">
                    <div className="input_types label_name">
                      <label>label : </label>
                    </div>
                    <div className="input_types">
                    <input id="radio1" type="radio" name="radio" value="1"/><label htmlFor="radio1"><span><span></span></span>option1</label>
                    </div>
                    <div className="input_types">
                    <input id="radio1" type="radio" name="radio" value="1"/><label htmlFor="radio1"><span><span></span></span>option2</label>
                    </div>
                </div>*/}

             {/*   <div className="col-lg-3">
                  <div className="input_types label_name">
                    <label>label : </label>
                  </div>
                  <div className="input_types">
                  <input id="check1" type="checkbox" name="" value=""/><label htmlFor="check1"><span><span></span></span>option1</label>
                  </div>
                  <div className="input_types">
                  <input id="check2" type="checkbox" name="" value=""/><label htmlFor="check2"><span><span></span></span>option2</label>
                  </div>
                </div>*/}

                <br className="brclear"/>
              <div className="ml_icon_btn">
                <a href="#"  className="save_btn" onClick={this.onApplyFilter.bind(this)} ><span
                  className="ml ml-save"></span></a>
                <a href="#" id="cancel_contact" className="cancel_btn" onClick={this.onCancelFilter.bind(this)}><span className="ml ml-delete"></span></a>


            </div>



        </div>
        <div className="filter_btn"  data-toggle="tooltip" title="Filter"><img src="/images/filter_icon.png"/></div>
      </div>
    )
  }
}
