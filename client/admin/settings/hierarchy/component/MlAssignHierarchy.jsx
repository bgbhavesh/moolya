import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');

var options = [
  {
    value: 'select',
    label: 'Select Tax Name'
  },
  {
    value: 'one',
    label: 'One'
  },
  {
    value: 'two',
    label: 'Two'
  }
];

export default class MlAssignHierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      department:null,
      subDepartment:null,
      assignedRoles:[]
    }
    return this;
  }
  optionsBySelectDepartment(val){
    this.setState({department:val})
  }
  optionsBySelectSubDepartment(val){
    this.setState({subDepartment:val});
  }

  async findRoles(type) {
    //get deptId
    let departmnetId = '';
    const response = await findAssignedRolesActionHandler(departmnetId,type);
    console.log(response);
    let roles=[];
    if(response){
      roles = response||[];
    }
    return roles;
  }

  getAssignedRoles(type){
    console.log("context : "+type);
    const roles=this.findRoles(type);
    this.setState({assignedRoles:roles||[]})
    console.log(this.state.assignedRoles);
  }

  render() {
    let departmentInfo=this.props.departmentInfo
    let isMoolya=departmentInfo.isMoolya
    let departmentqueryOptions = {options: {variables: {isMoolya:isMoolya }}};
    let departmentQuery = gql` query($isMoolya:Boolean){
            data:fetchMoolyaBasedDepartment(isMoolya:$isMoolya){label:departmentName,value:_id}
          }
          `;
    let subDepartmentOptions = {options: { variables: {id:this.state.department}}};
    let subDepartmentquery=gql`query($id:String){
      data:fetchSubDepartments(id:$id) {
        value:_id
        label:subDepartmentName
      }
    }`
    return (
      <div>
        <div className="row table_row_class">
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Final Approval</div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4">
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Department"  selectedValue={this.state.department} queryType={"graphql"} query={departmentQuery} queryOptions={departmentqueryOptions} isDynamic={true}  onSelect={this.optionsBySelectDepartment.bind(this)} />
              </div>
              <div className="col-md-4">
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Sub-Department" selectedValue={this.state.subDepartment} queryType={"graphql"} query={subDepartmentquery} reExecuteQuery={true} queryOptions={subDepartmentOptions} isDynamic={true}  onSelect={this.optionsBySelectSubDepartment.bind(this)} />
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Un Assigned Role</div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="panel-group" id="accordion">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" onClick={this.getAssignedRoles.bind(this,'cluster')}>
                  Cluster
                </a>
              </h4>
            </div>
            <div id="collapseOne" className="panel-collapse collapse">
              <div className="panel-body">            <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>

              </div>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" onClick={this.getAssignedRoles.bind(this,'chapter')}>
                  Chapter
                </a>
              </h4>
            </div>
            <div id="collapseTwo" className="panel-collapse collapse">
              <div className="panel-body">            <div className="row">

                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseThree"  onClick={this.getAssignedRoles.bind(this,'community')}>
                  Community
                </a>
              </h4>
            </div>
            <div id="collapseThree" className="panel-collapse collapse">
              <div className="panel-body">            <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={options}  className="float-label" />
                  </div>
                </div>

              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
