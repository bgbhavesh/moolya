import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import {graphql} from 'react-apollo';
import ScrollArea from 'react-scrollbar';
let FontAwesome = require('react-fontawesome');
import gql from 'graphql-tag'
import Datetime from "react-datetime";
import moment from "moment";
export default class MlAssignModulesToFilters extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      listValues : [],
      assignModulesToFilters: []
    }
    this.optionsBySelectFieldName.bind(this);
    this.handleBlur.bind(this);

    return this;
  }


  componentDidMount() {
    let filters=this.props.filterCatalog;
    if(filters){
      let availabilityDetailsForm=[]
      for(let i=0;i<filters.length;i++){
        let json={
          fieldName:filters[i].name,
          fieldType:filters[i].type,
          fieldResolverName : filters[i].resolverName,
          isDynamic:filters[i].isDynamic,
        }
        availabilityDetailsForm.push(json)
      }
      this.setState({assignModulesToFilters:availabilityDetailsForm})
    }
  }

/*
  componentWillMount(){
    let assignFiltersForm = this.state.assignModulesToFilters
    if (assignFiltersForm) {
      let assignFiltersFormDetails=[]
      for(let i=0;i<assignFiltersForm.length;i++){
        let json={
          fieldName:assignFiltersForm[i].fieldName,
          displayName:assignFiltersForm[i].displayName,
          isRestrictedFilter:assignFiltersForm[i].isRestrictedFilter,
          isActive:assignFiltersForm[i].isActive,
          fieldType:assignFiltersForm[i].fieldType
        }
        assignFiltersFormDetails.push(json)
      }
      this.setState({assignModulesToFilters: assignFiltersFormDetails});
    }
  }
*/

  assignModuleToRoles(id) {
    this.setState({
      assignModulesToFilters: this.state.assignModulesToFilters.concat([{
        fieldName: '',
        displayName: '',
        isRestrictedFilter: '',
        isActive: '',
        fieldType:''
      }])
    });
  }

  RemoveModuleToRoles(id, event) {
    let assignModulesToFilters;
    assignModulesToFilters = this.state.assignModulesToFilters.filter(function (object, index) {
      return id !== index;
    });
    this.setState({
      assignModulesToFilters: assignModulesToFilters
    })
  }

  optionsBySelectFieldName(){

  }

  onStatusChange(index,event){
    let filterDetails=this.state.assignModulesToFilters
    if(event.currentTarget.checked){
      filterDetails[index]['isActive']=true
      this.setState({assignModulesToFilters:filterDetails})
      this.props.getFiltersData(this.state.assignModulesToFilters);
    }else {
      filterDetails[index]['isActive'] =false
      this.setState({assignModulesToFilters: filterDetails})
      this.props.getFiltersData(this.state.assignModulesToFilters);
    }
  }

/*  componentWillReceiveProps(newProps){

    let filters=newProps.filterCatalog;
    if(filters){
      let availabilityDetailsForm=[]
      for(let i=0;i<filters.length;i++){
        let json={
          fieldName:filters[i].name,
          fieldType:filters[i].type,
          fieldList : filters[i].collectionName,
         }
        availabilityDetailsForm.push(json)
      }
      this.setState({assignModulesToFilters:availabilityDetailsForm})
    }
  }*/

  handleBlur(id,e){
    let details =this.state.assignModulesToFilters || [];
    let name  = e.target.name;
   /* details=_.extend(details[id],{[name]:e.target.value});*/
    if(details[id]){
      details[id][name] = e.target.value;
    }
    this.setState({assignModulesToFilters:details})
    this.props.getFiltersData(details);
  }

  optionsBySelect(id,resolverName,val){
    let details =this.state.assignModulesToFilters || [];
    if(details[id]){
      details[id]["fieldList"] = val;
    }
    this.setState({listValues:val,assignModulesToFilters:details})
    this.props.getFiltersData(details)

  }

  restrictionChange(index,event){
    let filterDetails=this.state.assignModulesToFilters

    if(event.currentTarget.checked){
      filterDetails[index]['isRestrictedFilter']=true

      this.setState({assignModulesToFilters:filterDetails})
      this.props.getFiltersData(this.state.assignModulesToFilters);
    }else {
      filterDetails[index]['isRestrictedFilter'] =false
      this.setState({assignModulesToFilters: filterDetails})
      this.props.getFiltersData(this.state.assignModulesToFilters);
    }
  }


  render() {
    let that = this;
    let listOptions = null;
    let listQuery=gql`query($moduleName:String!){  
      data:fetchFilterListDropDown(moduleName:$moduleName) {
       label
        value
      }  
    }`;
    let listSelect = false
    let listValues = that.state.listValues || []
    return (
      <div>

        {that.state.assignModulesToFilters.map(function (options, id) {

          if(options&&options.fieldType == "List"&&!options.isDynamic){
            listSelect = true
          }
          if(options&&options.fieldResolverName){
             listOptions={options: { variables: {moduleName:options.fieldResolverName}}}
          }else{
            listOptions={options: { variables: {moduleName:''}}}
          }


          return (

            <div className="panel panel-default" key={id}>
              <div className="panel-heading">Add Filter{id == 0 ? (
                <div className="pull-right block_action" onClick={that.assignModuleToRoles.bind(that, id)}><img
                  src="/images/add.png"/></div>) :
                <div className="pull-right block_action" onClick={that.RemoveModuleToRoles.bind(that, id)}><img
                  src="/images/remove.png"/></div>}
              </div>

              <div className="panel-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="form-group" >
                        <input type="text" placeholder="Field Type"
                               className="form-control float-label" defaultValue={options.fieldName}/>

                      </div>

                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input type="text" placeholder="Display Name" name={"displayName"}
                             className="form-control float-label" onBlur={that.handleBlur.bind(that,id)}/>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group switch_wrap inline_switch">
                      <label>Status</label>
                      <label className="switch">
                        <input type="checkbox"  checked={options.isActive} onChange={that.onStatusChange.bind(that,id)}/>
                        <div className="slider"></div>
                      </label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="email_notify">
                      <div className="input_types">
                        <input  type="checkbox" name="checkbox" checked={options.isRestrictedFilter} onChange={that.restrictionChange.bind(that,id)}/>
                        <label htmlFor="checkbox1"><span> </span>Is Restrictedfilter</label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <input type="text" placeholder="Field Type"
                             className="form-control float-label" defaultValue={options.fieldType}/>
                    </div>
                  </div>

                  <div className="col-md-12">
                    {listSelect?<div className="form-group">
                      <input type="text" placeholder="Field Collection" ref={"resolverName"}
                             className="form-control float-label" defaultValue={options.fieldResolverName} disabled={true}/>
                    </div>:""}
                  </div>

                  <div className="col-md-12">
                  {listSelect?<div className="form-group">

                    <Moolyaselect multiSelect={true} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={listValues} queryType={"graphql"} query={listQuery} reExecuteQuery={true} queryOptions={listOptions}  isDynamic={true} id={'list'+id}  onSelect={that.optionsBySelect.bind(that,id,options.fieldResolverName)} />
                  </div>:false}
                  </div>


                </div>
              </div>

            </div>
          )
        })}
      </div>
    )
  }
/*  render() {
    let that = this;
    let getModulesquery = gql` query{data:fetchModules{label:name,value:_id}}`;

    return (
      <div>

        {that.state.assignModulesToRoles.map(function (options, id) {
          let statusRead=false;
          let statusUpdate=false;
          let statusDelete=false;
          let statusCreate=false;
          let yesterday = Datetime.moment().subtract(1, 'day');
          let validDate = function (current) {
            return current.isAfter(yesterday);
          }
          _.each(options.actions,function (s,v) {
            if(s.actionId=='DELETE'){
              statusDelete=true;
            }
            if(s.actionId=='READ'){
              statusRead=true;
            }
            if(s.actionId=='UPDATE'){
              statusUpdate=true;
            }
            if(s.actionId=='CREATE'){
              statusCreate=true;
            }
          })
          return (

            <div className="panel panel-default" key={id}>


              <div className="panel-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input type="text" placeholder="Display Name"
                             className="form-control float-label"/>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input type="text" placeholder="Display Name"
                             className="form-control float-label"/>
                    </div>
                  </div>


                  <div className="col-md-6">
                    <div className="form-group switch_wrap inline_switch" style={{marginTop: '7px'}}>
                      <label className="">Status</label>
                      <label className="switch">
                        <input type="checkbox" checked={options.isActive}
                               onChange={that.onStatusChange.bind(that, id)}/>
                        <div className="slider"></div>
                      </label>
                    </div>
                  </div>


                </div>
              </div>

            </div>
          )
        })}
      </div>
    )
  }*/
};

