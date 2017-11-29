import React from 'react';
import { render } from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from '../../../commons/components/MlAdminSelectWrapper';

export default class MlAssignDepartmentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignDepartmentForm: [{ department: null, subDepartment: null }],
      disableList: []
    }
    return this;
  }
  componentDidMount() {
    this.props.getAssignedDepartments(this.state.assignDepartmentForm);
  }
  componentWillMount() {
    const assignDepartmentForm = this.props.departments
    if (assignDepartmentForm) {
      const disabledArray = this.state.disableList;
      const assgnDepartmentDetails = []
      for (let i = 0; i < assignDepartmentForm.length; i++) {
        const json = {
          department: assignDepartmentForm[i].department,
          subDepartment: assignDepartmentForm[i].subDepartment
        }
        disabledArray[i] = true;
        assgnDepartmentDetails.push(json);
      }
      this.setState({ disableList: disabledArray, assignDepartmentForm: assgnDepartmentDetails })
    }
  }

  AssignDepartment(idx) {
    this.setState({
      assignDepartmentForm: this.state.assignDepartmentForm.concat([{ department: null, subDepartment: null }])
    });
  }
  RemoveAssignDepartmentForm(idx, event) {
    let assignDepartmentForm;
    const disabledArray = this.state.disableList;
    disabledArray[idx] = false;
    assignDepartmentForm = this.state.assignDepartmentForm.filter((object, index) => idx !== index);
    this.setState({
      assignDepartmentForm,
      disableList: disabledArray
    })
    this.props.getAssignedDepartments(assignDepartmentForm);
  }
  optionsBySelectDepartment(index, selectedValue) {
    const assignDepartmentDetails = this.state.assignDepartmentForm
    assignDepartmentDetails[index].department = selectedValue
    this.setState({ assignDepartmentForm: assignDepartmentDetails })
    this.props.getAssignedDepartments(this.state.assignDepartmentForm);
  }
  optionsBySelectSubDepartment(index, selectedValue) {
    const assignDepartmentDetails = this.state.assignDepartmentForm
    assignDepartmentDetails[index].subDepartment = selectedValue
    this.setState({ assignDepartmentForm: assignDepartmentDetails })
    this.props.getAssignedDepartments(this.state.assignDepartmentForm);
  }
  render() {
    const that = this;
    let departmentqueryOptions = ''
    let departmentQuery = gql` query($isMoolya:Boolean){
            data:fetchMoolyaBasedDepartment(isMoolya:$isMoolya){label:departmentName,value:_id}
          }
          `;
    const selectedUserType = that.props.selectedBackendUserType
    const selectedSubChapter = that.props.selectedSubChapter
    if (selectedUserType == 'moolya') {
      // departmentqueryOptions = {options: {variables: {isMoolya: false}}};
      departmentqueryOptions = { options: { variables: { isMoolya: true } } };
      departmentQuery = gql` query($isMoolya:Boolean){
            data:fetchMoolyaBasedDepartment(isMoolya:$isMoolya){label:departmentName,value:_id}
          }
          `;
    }
    if (selectedUserType == 'non-moolya' && selectedSubChapter != '') {
      // departmentqueryOptions={options: { variables: {isMoolya:true,subChapter:selectedSubChapter}}};
      departmentqueryOptions = { options: { variables: { isMoolya: false, subChapter: selectedSubChapter } } };
      departmentQuery = gql` query($isMoolya:Boolean,$subChapter:String){
        data:fetchNonMoolyaBasedDepartment(isMoolya:$isMoolya,subChapter:$subChapter){label:departmentName,value:_id}
      }
      `;
    }


    const subDepartmentquery = gql`query($id:String){
      data:fetchSubDepartments(id:$id) {
        value:_id
        label:subDepartmentName
      }
    }`

    const userDepartments = that.state.assignDepartmentForm || [];
    return (
      <div>
        {userDepartments.map((assignDepartmentForm, idx) => {
          const subDepartmentOptions = { options: { variables: { id: assignDepartmentForm.department } } };
          return (
            <div className="panel panel-default" key={idx}>
              <div className="panel-heading"> Assign Departments{idx == 0 && (<div className="pull-right block_action" onClick={that.AssignDepartment.bind(that)}><img src="/images/add.png"/></div>)}
                {idx > 0 && (<div className="pull-right block_action" onClick={that.RemoveAssignDepartmentForm.bind(that, idx)}><img src="/images/remove.png"/></div>)}
              </div>
              <div className="panel-body">
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Select Department" selectedValue={assignDepartmentForm.department} queryType={'graphql'} query={departmentQuery} queryOptions={departmentqueryOptions} isDynamic={true} onSelect={that.optionsBySelectDepartment.bind(that, idx)} disabled={that.state.disableList[idx]} />

                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Select Sub-Department" selectedValue={assignDepartmentForm.subDepartment} queryType={'graphql'} query={subDepartmentquery} reExecuteQuery={true} queryOptions={subDepartmentOptions} isDynamic={true} onSelect={that.optionsBySelectSubDepartment.bind(that, idx)} disabled={that.state.disableList[idx]} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

