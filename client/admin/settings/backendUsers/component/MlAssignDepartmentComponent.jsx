import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'

export default class MlAssignDepartmentComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      assignDepartmentForm:[{department: null,subDepartment:null}]
    }
    return this;
  }
  componentDidMount() {
    let assignDepartmentForm = this.props.departments
    if(assignDepartmentForm){
      this.setState({assignDepartmentForm: assignDepartmentForm});
      //this.props.getAssignedDepartments(this.state.assignDepartmentForm);
    }

  }
  /*componentWillUpdate(){
    this.props.getAssignedDepartments(this.state.assignDepartmentForm);
  }*/
  AssignDepartment(idx){
    this.setState({
      assignDepartmentForm: this.state.assignDepartmentForm.concat([{ department:null,subDepartment:null}])
    });
  }
 RemoveAssignDepartmentForm(idx,event){
     let assignDepartmentForm;
     assignDepartmentForm= this.state.assignDepartmentForm.filter(function(object,index){
       return idx !== index;
     });
     this.setState({
       assignDepartmentForm: assignDepartmentForm
     })
 }
  optionsBySelectDepartment(index, selectedValue){
    let assignDepartmentDetails=this.state.assignDepartmentForm
    assignDepartmentDetails[index]['department']=selectedValue
    this.setState({assignDepartmentForm:assignDepartmentDetails})
    this.props.getAssignedDepartments(this.state.assignDepartmentForm);
  }
  optionsBySelectSubDepartment(index, selectedValue){
    let assignDepartmentDetails=this.state.assignDepartmentForm
    assignDepartmentDetails[index]['subDepartment']=selectedValue
    this.setState({assignDepartmentForm:assignDepartmentDetails})
    this.props.getAssignedDepartments(this.state.assignDepartmentForm);
  }
  render() {
    let that=this;
  //  let queryOptions={options: { variables: {searchQuery:null}}};
    let query=gql` query{
  data:fetchActiveDepartment{label:departmentName,value:_id}
}
`;
    let subdepartmentquery=gql`query($id:String){data:fetchActiveSubDepartments(departmentId:$id){label:subDepartmentName, value:_id}}`

   return(
     <div>
   <div className="form-group"> <a onClick={that.AssignDepartment.bind(this)} className="mlUpload_btn">Assign  Department</a></div>
       {that.state.assignDepartmentForm.map(function(assignDepartmentForm, idx){
         let subDepartmentOptions = {options: { variables: {id:assignDepartmentForm.department}}};
         return(
         <div className="panel panel-default" key={idx}>
           <div className="panel-heading"> Assign Departments
             <div className="pull-right block_action" onClick={that.RemoveAssignDepartmentForm.bind(that,idx)}><img src="/images/remove.png"/></div>
           </div>
           <div className="panel-body">
             <div className="form-group">
              {/* <Select name="form-field-name" value={assignDepartmentForm.department} options={options2} className="float-label"  onSelect={that.optionsBySelect.bind(that,idx)}/>*/}
               <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Select Department"  selectedValue={assignDepartmentForm.department} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={that.optionsBySelectDepartment.bind(that,idx)} />

             </div>
             <div className="form-group">
              {/* <Select name="form-field-name" value={assignDepartmentForm.subdepartment} options={options3} className="float-label"  onSelect={that.optionsBySelect.bind(that,idx)}/>*/}
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Select Sub-Department" selectedValue={assignDepartmentForm.subDepartment} queryType={"graphql"} query={subdepartmentquery} reExecuteQuery={true} queryOptions={subDepartmentOptions} isDynamic={true}  onSelect={that.optionsBySelectSubDepartment.bind(that,idx)} />
              </div>
           </div>
         </div>
         )}
       )}
     </div>
    )
  }
};

