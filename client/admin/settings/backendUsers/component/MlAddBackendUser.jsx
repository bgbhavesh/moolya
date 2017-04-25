import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import formHandler from '../../../../commons/containers/MlFormHandler'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import MlAssignDepartmentComponent from './MlAssignDepartmentComponent'
import MlContactFormComponent from './MlContactFormComponent'
import {addBackendUserActionHandler} from '../actions/addBackendUserAction'
import {OnToggleSwitch,initalizeFloatLabel,passwordVisibilityHandler} from '../../../utils/formElemUtil';
import {mlFieldValidations} from '../../../../commons/validations/mlfieldValidation';
let FontAwesome = require('react-fontawesome');
let Select = require('react-select');
import Datetime from "react-datetime";
import moment from "moment";

class MlAddBackendUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mlAssignDepartmentDetails: [],
      mlAssignContactDetails: [],
      password: '',
      confirmPassword: '',
      selectedBackendUserType: '',
      selectedBackendUser: 'Internal User',
      selectedSubChapter: '',
      pwdErrorMsg: '',
      foundationDate: " ",
      genderSelect: null
      /* selectedCluster:'',
       selectedChapter:'',
       selectedDepartment:'',
       selectedSubDepartment:'',
       selectedRole:''*/
    }
    this.addEventHandler.bind(this);
    this.createBackendUser.bind(this);
    this.onBackendUserTypeSelect.bind(this);
    this.onBackendUserSelect.bind(this);
    this.onFoundationDateSelection.bind(this);
    this.onGenderSelect.bind(this);
    // this.onGenderSelect.bind(this);
    // this.storeToBackend.bind(this);
    /* this.onClusterSelect.bind(this);
     this.onChapterSelect.bind(this);
     this.onDepartmentSelect.bind(this);
     this.onSubDepartmentSelect.bind(this);
     this.onROleSelect.bind(this);*/
    return this;
  }

  componentDidMount() {
    initalizeFloatLabel();
    OnToggleSwitch(false,true);
    passwordVisibilityHandler();
  }
  onFoundationDateSelection(event) {
    if (event._d) {
      let value = moment(event._d).format('DD-MM-YYYY');
      this.setState({loading: false, foundationDate: value});
    }
  }


  /*componentWillMount(){
    let response = mlFieldValidations();
    return response;
  }
*/

  async addEventHandler() {
    const resp = await this.createBackendUser();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {
    if (response) {
      if (response.success) {
        FlowRouter.go("/admin/settings/backendUserList");
      }

    }else {
      console.log(response)
    }
  };

 async onGenderSelect(e){
    this.setState({genderSelect:e.target.value})
  }
 //
 //  async DOBSelect(e){
 //    this.setState({foundationDate:e.target.value})
 //  }

 //
 // async  storeToBackend(){
 //   let Details = {
 //     genderSelect : this.state.genderSelect,
 //     foundationDate :this.state.foundationDate,
 //     userId : Meteor.userId()
 //   }
 //   const dataresponse = await addBackendUserActionHandler(Details);
 //   console.log(dataresponse);
 //   toastr.success("Update Successful")
 //   return dataresponse;
 // }



  async  createBackendUser() {
    let firstName= this.refs.firstName.value;
    let lastName= this.refs.lastName.value;
    let displayName= this.refs.displayName.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    let confirmPassword = this.refs.confirmPassword.value;
    let departments=this.state.mlAssignDepartmentDetails[0].department;
    let subdepartments=this.state.mlAssignDepartmentDetails[0].subDepartment;

    let ret = mlFieldValidations(this.refs)
    if(ret){
        toastr.error(ret);
    }
//
//     if(!firstName){
//       toastr.error("First Name is required");
//     }
//     else if(!lastName){
//       toastr.error("Last Name is required");
//     }
//     else if(!displayName){
//       toastr.error("Display Name is required");
//     }
//     else if (!email) {
//       toastr.error("Need to set a username or email");
//     }
//     else if(!password){
//       toastr.error("Password is required");
//     }
//     else if (confirmPassword != password) {
//
//       toastr.error("Confirm Password does not match with Password")
//
//     } else if(!departments){
//
//       toastr.error("Assign Department is required");
//
//     }
//    else if(!subdepartments){
//
//   toastr.error("Sub Department is required");
//
// }
    else {
      let moolyaProfile = {
        firstName: this.refs.firstName.value,
        middleName: this.refs.middleName.value,
        lastName: this.refs.lastName.value,
        userType: this.state.selectedBackendUserType,
        subChapter: this.state.selectedSubChapter,
        roleType: this.state.selectedBackendUser,
        assignedDepartment: this.state.mlAssignDepartmentDetails,
        displayName: this.refs.displayName.value,
        email: this.refs.email.value,
        contact: this.state.mlAssignContactDetails,
        globalAssignment: this.refs.globalAssignment.checked,
        isActive: this.refs.deActive.checked,
        userProfiles: []
      }
      let InternalUprofile = {
        moolyaProfile: moolyaProfile
      }
      let profile = {
        isInternaluser: true,
        isExternaluser: false,
        email: this.refs.email.value,
        isActive:this.refs.deActive.checked,
        InternalUprofile: InternalUprofile
      }
      let userObject = {
        username: moolyaProfile.email,
        password: this.refs.password.value,
        profile: profile
      }

      const response = await addBackendUserActionHandler(userObject)
      console.log(response);
      return response;
    }

   /* let userroles=[{
      roleId:this.refs.role.value,
      clusterId:this.refs.cluster.value,
      chapterId:this.refs.chapter.value,
      subChapterId:'',
      communityId:'',
      isActive: this.refs.isActive.checked,
      hierarchyLevel:''

    }]
    let userprofiles=[{
      isDefault: this.refs.isDefault.checked,
      clusterId: this.refs.cluster.value,
      userRoles:userroles
    }]*/



  }
  getAssignedDepartments(departments){
    this.setState({'mlAssignDepartmentDetails':departments})
  }
  getAssignedContacts(contacts){
    this.setState({'mlAssignContactDetails':contacts})
  }

  onBackendUserTypeSelect(val){
    if(val)
      this.setState({selectedBackendUserType:val.value})
    else
      this.setState({selectedBackendUserType:''})
  }
  onBackendUserSelect(val){
    this.setState({selectedBackendUser:val.value})
  }
  optionsBySelectSubChapter(val){
    this.setState({selectedSubChapter:val})
  }
  onCheckPassword(){
    let password=this.refs.password.value;
    let confirmPassword=this.refs.confirmPassword.value;
    if(confirmPassword!=password){
      this.setState({"pwdErrorMsg":'Confirm Password does not match with Password'})
      //alert("ur confirm pwd not match with pwd")
    }else{
      this.setState({"pwdErrorMsg":''})
    }
  }
  /*onClusterSelect(val){
    this.setState({selectedCluster:val})
  }
  onChapterSelect(val){
    this.setState({selectedChapter:val})
  }
  onDepartmentSelect(val){
    this.setState({selectedDepartment:val})
  }
  onSubDepartmentSelect(val){
    this.setState({selectedSubDepartment:val})
  }
  onROleSelect(val){
    this.setState({selectedRole:val})
  }*/

  render(){
    let MlActionConfig = [
      {
        showAction: true,
        actionName: 'save',
        handler: async(event) =>this.props.handler(this.createBackendUser.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          FlowRouter.go("/admin/settings/backendUserList")
        }
      }
    ]
    let UserTypeOptions = [
      {value: 'moolya', label: 'moolya' , clearableValue: true},
      {value: 'non-moolya', label: 'non-moolya',clearableValue: true}
    ];
    let BackendUserOptions=[
      {value: 'Internal User', label: 'Internal User'},
      {value: 'External User', label: 'External User'}
    ]
    let query=gql` query{
  data:fetchCountriesSearch{label:country,value:countryCode}
}
`;
  /*  let rolequery=gql` query{
    data:fetchActiveRoles{label:roleName,value:_id}
    }
`;*/
    let subChapterQuery=gql` query{
  data:fetchActiveSubChapters{label:subChapterName,value:_id}
}
`;
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Backend User</h2>
          <div className="col-md-6 nopadding-left">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
              >
                <form>
                <div className="form_bg">
                    <div className="form-group mandatory">
                      <input type="text" ref="firstName" placeholder="First Name" className="form-control float-label" id="" data-required={true} data-errMsg="First Name is Required"/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="middleName" placeholder="Middle Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group mandatory">
                      <input type="text" ref="lastName" placeholder="Last Name" className="form-control float-label" id="" data-required={true} data-errMsg="Last Name is Required"/>
                    </div>
                    <div className="form-group">
                      <Select name="form-field-name" placeholder="Backend User Type"  className="float-label"  options={UserTypeOptions}  value={this.state.selectedBackendUserType}  onChange={this.onBackendUserTypeSelect.bind(this)} />
                    </div>

                    {this.state.selectedBackendUserType=='non-moolya'&&(
                   <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Select Subchapter"  selectedValue={this.state.selectedSubChapter} queryType={"graphql"} query={subChapterQuery} isDynamic={true}  onSelect={this.optionsBySelectSubChapter.bind(this)} />
                   )}
                    <div className="form-group">
                      <Select name="form-field-name" placeholder="Select Role"  className="float-label"  options={BackendUserOptions}  value={this.state.selectedBackendUser}  onChange={this.onBackendUserSelect.bind(this)} disabled={true}
                      />
                    </div>
                    <div className="form-group">
                      <input type="Password" ref="password" defaultValue={this.state.password} placeholder="Create Password" className="form-control float-label" id="password"/>
                      <FontAwesome name='eye-slash' className="password_icon Password hide_p"/>
                    </div>
                    <div className="form-group">
                      <text style={{float:'right',color:'#ef4647',"fontSize":'12px',"marginTop":'-12px',"fontWeight":'bold'}}>{this.state.pwdErrorMsg}</text>
                      <input type="Password" ref="confirmPassword" defaultValue={this.state.confirmPassword} placeholder="Confirm Password" className="form-control float-label" onBlur={this.onCheckPassword.bind(this)} id="confirmPassword"/>
                      <FontAwesome name='eye-slash' className="password_icon ConfirmPassword hide_p"/>
                    </div>
                  {/*  <div className="form-group"> <a href="" className="mlUpload_btn">Reset Password</a> <a href="#" className="mlUpload_btn">Send Notification</a> </div>*/}
                    <MlAssignDepartmentComponent getAssignedDepartments={this.getAssignedDepartments.bind(this)} selectedBackendUserType={this.state.selectedBackendUserType} selectedSubChapter={this.state.selectedSubChapter} />
                </div>
                </form>
              </ScrollArea>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <div className="left_wrap">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                  smoothScrolling={true}
                >
                  <form>

                    <div className="form-group mandatory">
                      <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label" id="" data-required={true} data-errMsg="Display Name is Required"/>
                    </div>
                    <div className="form-group mandatory">
                      <input type="text" ref="email" placeholder="Email id" className="form-control float-label" id="" data-required={true} data-errMsg="Email  is Required"/>
                    </div>

                    <div className="form-group">
                      <Datetime dateFormat="DD-MM-YYYY" placeholder="Date Of Birth" timeFormat={false}  inputProps={{placeholder: "Date Of Birth"}}   closeOnSelect={true} value={this.state.foundationDate} onChange={this.onFoundationDateSelection.bind(this)}/>
                      <FontAwesome name="calendar" className="password_icon"/>
                    </div>

                    <div className="form-group">
                      <div className="input_types">
                        <label>Gender : </label>
                      </div>
                      <div className="input_types">
                        <input id="radio1" type="radio" name="radio" value="1" onChange={this.onGenderSelect.bind(this)}/><label htmlFor="radio1"><span><span></span></span>Male</label>
                      </div>
                      <div className="input_types">
                        <input id="radio2" type="radio" name="radio" value="2"  onChange={this.onGenderSelect.bind(this)}/><label htmlFor="radio2"><span><span></span></span>Female</label>
                      </div>
                      <div className="input_types">
                        <input id="radio3" type="radio" name="radio" value="3"  onChange={this.onGenderSelect.bind(this)}/><label htmlFor="radio3"><span><span></span></span>Others</label>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <MlContactFormComponent getAssignedContacts={this.getAssignedContacts.bind(this)}/>

                    <div className="form-group switch_wrap inline_switch">
                      <label>Global Assignment Availability</label>
                      <label className="switch">
                        <input type="checkbox" ref="globalAssignment"/>
                        <div className="slider"></div>
                      </label>
                    </div>
                    <br className="brclear"/>
                    <div className="form-group switch_wrap inline_switch">
                      <label>Status</label>
                      <label className="switch">
                        <input type="checkbox" ref="deActive"/>
                        <div className="slider"></div>
                      </label>
                    </div>
                    <br className="brclear"/>
                    {/*<div className="panel panel-default">
                      <div className="panel-heading">Assigned Cluster Details</div>
                      <div className="panel-body">

                        <div className="form-group">
                          <input type="text" ref="cluster" placeholder="Cluster" className="form-control float-label" id="" disabled="true"/>
                          /!*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedCluster} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onClusterSelect.bind(this)} />*!/
                         </div>
                        <div className="form-group">
                          <input type="text" ref="chapter" placeholder="Chapter" className="form-control float-label" id="" disabled="true"/>
                          /!*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedChapter} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onChapterSelect.bind(this)} />*!/
                        </div>
                        <div className="form-group">
                          <input type="text" ref="department" placeholder="Department" className="form-control float-label" id="" disabled="true"/>
                         /!* <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedDepartment} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onDepartmentSelect.bind(this)} />*!/
                         </div>
                        <div className="form-group">
                          <input type="text" ref="subDepartment" placeholder="Sub Department" className="form-control float-label" id="" disabled="true"/>
                          /!*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedSubDepartment} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onSubDepartmentSelect.bind(this)} />*!/
                         </div>
                        <div className="form-group">
                         <input type="text" ref="role" placeholder="Role" className="form-control float-label" id="" disabled="true"/>
                          /!*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedRole} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onROleSelect.bind(this)} />*!/
                        </div>
                        <div className="form-group">
                          <div className="input_types"><input  ref="isDefault" id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Make Default</label></div>
                        </div>
                      </div>
                    </div>*/}
                  </form>
                </ScrollArea>
              </div>
            </div>
          </div>

        </div>
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
        />
      </div>

    )
  }
};
export default MlAddBackendUser = formHandler()(MlAddBackendUser);
