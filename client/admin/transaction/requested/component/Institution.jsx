import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import {updateRegistrationActionHandler} from '../actions/updateRegistration'

export default class institution extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedUserType:null,
      selectedHeadquarter:null,
      selectedBranches:null,
      selectedInstitutionType:null
    };
    return this;
  }

  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
  }
  optionsBySelectUserType(value){
    this.setState({selectedUserType:value})
  }
  optionsBySelectHeadquarter(value){
    this.setState({selectedHeadquarter:value})
  }
  optionsBySelectBranch(value){
    this.setState({selectedBranches:value})
  }
  optionsBySelectInstitutionType(val){
    this.setState({selectedInstitutionType:val.value})
  }

  async  updateregistrationInfo() {
    let Details = {
      registrationId      : this.state.registrationId,
      userCategory        : this.state.selectedUserType,
      institutionType     : this.refs.institutionType.value,
      instituteName       : this.refs.instituteName.value,
      instituteGroupName  : this.refs.instituteGroupName.value,
      foundationYear      : this.refs.foundationYear.value,
      website             : this.refs.website.value,
      registrationNumber  : this.refs.registrationNumber.value,
      isoAccrediationNumber: this.refs.isoAccrediationNumber.value,
      curriculamProvider  : this.refs.curriculamProvider.value,
      associatedUniversity: this.refs.associatedUniversity.value,
      studentCount        : this.refs.studentCount.value,
      staffCount          : this.refs.staffCount.value,
      chairman            : this.refs.chairman.value,
      dean                : this.refs.dean.value,
      headQuarterLocation:  this.state.selectedHeadquarter,
      branchLocations:  this.state.selectedBranches
    }
    this.props.getRegistrationDetails(Details);
    const response = await updateRegistrationActionHandler(Details);
    return response;
  }
  render(){
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateregistrationInfo.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      }
    ]
    let that=this;

    let subsidary = [
      {value: 'Yes', label: 'Yes' , clearableValue: true},
      {value: 'No', label: 'No',clearableValue: true}
    ];

    let institutionTypes = [
      {value: 'SubChapter', label: 'SubChapter' , clearableValue: true},
      {value: 'Institution', label: 'Institution',clearableValue: true}
    ];

    let businesstypesquery=gql` query{
    data:fetchBusinessTypes{label:businessTypeName,value:_id}
    }
    `;
    let companytypesquery=gql` query{
    data:fetchCompanyTypes{label:companyName,value:_id}
    }
    `;

    let userTypequery = gql`query{
    data:FetchUserType {label:userTypeName,value:_id}
    }
    `;
    let citiesquery = gql`query{
      data:fetchCities {label:name,value:_id }
    }
    `;
    let entitiesquery = gql`query{
    data:fetchEntities {label:entityName,value:_id  }
    }
    `;
    let industriesquery=gql` query{
    data:fetchIndustries{label:industryName,value:_id}
    }
    `;
    let lookinforquery=gql` query{
    data:fetchStageOfCompany{label:lookingForName,value:_id}
    }
    `;
    let stageofcompquery=gql` query{
    data:fetchStageOfCompany{label:stageOfCompanyName,value:_id}
    }
    `;
    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(
      <div className="step_form_wrap step2">

      <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
      <div className="col-md-6 nopadding-left">
          <div className="form_bg">
              <form>

                <div className="form-group">
                  <Moolyaselect multiSelect={false} placeholder="select user category" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedUserType} queryType={"graphql"} query={userTypequery} onSelect={that.optionsBySelectUserType.bind(this)} isDynamic={true}/>
                </div>
                <div className="form-group">
                  <Select name="form-field-name" placeholder="Select institution Type" options={institutionTypes} selectedValue={this.state.selectedInstitutionType} onSelect={that.optionsBySelectInstitutionType.bind(this)}  className="float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" ref="instituteName" placeholder="Institute Name " className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="instituteGroupName" placeholder="Institute Group Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="foundationYear" placeholder="Foundation year" className="form-control float-label" id=""/>
                  <FontAwesome name="calendar" className="password_icon"/>
                </div>
                <div className="form-group">
                  <input type="text" ref="website" placeholder="Website" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="registrationNumber" placeholder="Registration Number" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text"  ref="isoAccrediationNumber" placeholder="ISO Accrediation Number" className="form-control float-label" id=""/>
                </div>

          </form>
          </div>
    </div>
    <div className="col-md-6 nopadding-right">
    <div className="form_bg">
    <form>
            <div className="form-group">
              <input type="text" ref="curriculamProvider" placeholder="Curriculam provider" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" ref="associatedUniversity" placeholder="Associated university" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" ref="studentCount" placeholder="Toatal number of students" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" ref="staffCount" placeholder="Total number of staff" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" ref="chairman" placeholder="Chairman name" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" ref="dean" placeholder="Dean name" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={false} placeholder="Headquarter Location" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedHeadquarter} queryType={"graphql"} query={citiesquery} onSelect={that.optionsBySelectHeadquarter.bind(this)} isDynamic={true}/>
            </div>
            <div className="form-group">
              <Moolyaselect multiSelect={true} placeholder="Branch Location" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedBranches} queryType={"graphql"} query={citiesquery} onSelect={that.optionsBySelectBranch.bind(this)} isDynamic={true}/>
            </div>

    </form>
    </div>
    </div>
    </ScrollArea>
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
      </div> )}
      </div>
    )
  }
};
