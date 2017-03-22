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
      selectedInstitutionType:null,
      registrationDetails:null
    };
    return this;
  }

  componentWillMount() {
    let details=this.props.registrationDetails;
    this.setState({loading:false,
      registrationDetails:details,
      registrationId:this.props.registrationId,
      selectedUserType :details.userCategory,
      selectedHeadquarter : details.headQuarterLocation,
      selectedBranches : details.branchLocations,
      selectedInstitutionType: details.institutionType
    })
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

  async  updateregistration() {
    let Details = {
      registrationId      : this.props.registrationId,
      details:{
              userCategory        : this.state.selectedUserType,
              institutionType     : this.state.selectedInstitutionType,
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
    }
    this.props.getRegistrationDetails();
    const response = await updateRegistrationActionHandler(Details);
    return response;
  }
  updateRegistration(){
    const resp=this.updateregistration();
    return resp;
  }

  render(){
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: this.updateRegistration.bind(this)
      }
    ]
    let that=this;

    let institutionTypes = [
      {value: 'SubChapter', label: 'SubChapter'},
      {value: 'Institution', label: 'Institution'}
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
                  <Select name="form-field-name" placeholder="Select institution Type" options={institutionTypes} selectedValue={this.state.selectedInstitutionType} onSelect={this.optionsBySelectInstitutionType.bind(this)}  className="float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" ref="instituteName" placeholder="Institute Name " defaultValue={that.state.registrationDetails&&that.state.registrationDetails.instituteName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="instituteGroupName" placeholder="Institute Group Name" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.instituteGroupName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="foundationYear" placeholder="Foundation year"  defaultValue={that.state.registrationDetails&&that.state.registrationDetails.foundationYear} className="form-control float-label" id=""/>
                  <FontAwesome name="calendar" className="password_icon"/>
                </div>
                <div className="form-group">
                  <input type="text" ref="website" placeholder="Website" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.website} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="registrationNumber" placeholder="Registration Number" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.registrationNumber} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text"  ref="isoAccrediationNumber" placeholder="ISO Accrediation Number" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.isoAccrediationNumber} className="form-control float-label" id=""/>
                </div>

          </form>
          </div>
    </div>
    <div className="col-md-6 nopadding-right">
    <div className="form_bg">
    <form>
            <div className="form-group">
              <input type="text" ref="curriculamProvider" placeholder="Curriculam provider" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.curriculamProvider} className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" ref="associatedUniversity" placeholder="Associated university" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.associatedUniversity} className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" ref="studentCount" placeholder="Toatal number of students" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.studentCount} className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" ref="staffCount" placeholder="Total number of staff" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.staffCount} className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" ref="chairman" placeholder="Chairman name" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.chairman} className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" ref="dean" placeholder="Dean name" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.dean} className="form-control float-label" id=""/>
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
