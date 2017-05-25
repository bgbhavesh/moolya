import React from "react";
import {render} from "react-dom";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Moolyaselect from "../../../../commons/components/select/MoolyaSelect";

export default class MlAssignDepartmentComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      assignDepartmentForm:[{department: null,subDepartment:null}]
    }
    return this;
  }
  componentDidMount() {
    this.props.getAssignedDepartments(this.state.assignDepartmentForm);
  }
  componentWillMount(){
    let assignDepartmentForm = this.props.departments
    if(assignDepartmentForm){
      let assgnDepartmentDetails=[]
      for(let i=0;i<assignDepartmentForm.length;i++){
        let json={
          department:assignDepartmentForm[i].department,
          subDepartment:assignDepartmentForm[i].subDepartment
        }
        assgnDepartmentDetails.push(json)
      }
      this.setState({assignDepartmentForm: assgnDepartmentDetails})
    }

  }

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
   this.props.getAssignedDepartments(assignDepartmentForm);
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
    let departmentqueryOptions=''
    let departmentQuery=gql` query($isMoolya:Boolean){
            data:fetchMoolyaBasedDepartment(isMoolya:$isMoolya){label:departmentName,value:_id}
          }
          `;
    let selectedUserType=that.props.selectedBackendUserType
    let selectedSubChapter=that.props.selectedSubChapter
    if (selectedUserType == 'moolya') {
      // departmentqueryOptions = {options: {variables: {isMoolya: false}}};
      departmentqueryOptions = {options: {variables: {isMoolya: true}}};
      departmentQuery = gql` query($isMoolya:Boolean){
            data:fetchMoolyaBasedDepartment(isMoolya:$isMoolya){label:departmentName,value:_id}
          }
          `;
    }
    if (selectedUserType == 'non-moolya' && selectedSubChapter != '') {
      // departmentqueryOptions={options: { variables: {isMoolya:true,subChapter:selectedSubChapter}}};
      departmentqueryOptions = {options: {variables: {isMoolya: false, subChapter: selectedSubChapter}}};
      departmentQuery = gql` query($isMoolya:Boolean,$subChapter:String){
        data:fetchNonMoolyaBasedDepartment(isMoolya:$isMoolya,subChapter:$subChapter){label:departmentName,value:_id}
      }
      `;
    }


   let subDepartmentquery=gql`query($id:String){
      data:fetchSubDepartments(id:$id) {
        value:_id
        label:subDepartmentName
      }
    }`

    let userDepartments = that.state.assignDepartmentForm || [];
   return(
     <div>
         {userDepartments.map(function(assignDepartmentForm, idx){
           let subDepartmentOptions = {options: { variables: {id:assignDepartmentForm.department}}};
         return(
         <div className="panel panel-default" key={idx}>
           <div className="panel-heading"> Assign Departments{idx==0&&(<div className="pull-right block_action" onClick={that.AssignDepartment.bind(that)}><img src="/images/add.png"/></div>)}
             {idx>0&&(<div className="pull-right block_action" onClick={that.RemoveAssignDepartmentForm.bind(that,idx)}><img src="/images/remove.png"/></div>)}
           </div>
           <div className="panel-body">
               <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Select Department"  selectedValue={assignDepartmentForm.department} queryType={"graphql"} query={departmentQuery} queryOptions={departmentqueryOptions} isDynamic={true}  onSelect={that.optionsBySelectDepartment.bind(that,idx)} />

                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Select Sub-Department" selectedValue={assignDepartmentForm.subDepartment} queryType={"graphql"} query={subDepartmentquery} reExecuteQuery={true} queryOptions={subDepartmentOptions} isDynamic={true}  onSelect={that.optionsBySelectSubDepartment.bind(that,idx)} />
           </div>
         </div>
         )}
       )}
     </div>
    )
  }
};

