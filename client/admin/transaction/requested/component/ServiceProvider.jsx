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

export default class ServiceProvider extends React.Component{
  constructor(props){
    super(props);
    this.state={
      selectedUserType:null,
      selectedHeadquarter:null,
      selectedBranches:null,
      selectedLookingFor:null,
      selectedTypeOfCompany:null,
      selectedTypeOfEntity:null,
      selectedTypeOfBusiness:null,
      selectedTypeOfIndustry:null,
      selectedSubDomain:null,
      selectedStageOfCompany:null,
      selectedSubsidaryComapny:null,
      registrationId:'',
      registrationDetails:'',
      identity:''

    };
    return this;
  }

  componentWillMount() {
    let details=this.props.registrationDetails;
    this.setState({loading:false,
      registrationDetails:details,
      registrationId:this.props.registrationId,
      selectedUserType:details.userType,
      selectedHeadquarter:details.headQuarterLocation,
      selectedBranches:details.branchLocations,
      selectedLookingFor:details.lookingFor,
      selectedTypeOfCompany:details.companytyp,
      selectedTypeOfEntity:details.entityType,
      selectedTypeOfBusiness:details.businessType,
      selectedTypeOfIndustry:details.industry,
      selectedSubDomain:details.subDomain,
      selectedStageOfCompany:details.stageOfCompany,
      selectedSubsidaryComapny:details.subsidaryCompany
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
  optionsBySelectLookingFor(value){
    this.setState({selectedLookingFor:value})
  }
  optionsBySelectTypeOfCompany(value){
    this.setState({selectedTypeOfCompany:value})
  }
  optionsBySelectTypeOfEntity(value){
    this.setState({selectedTypeOfEntity:value})
  }
  optionsBySelectTypeOfBusiness(value){
    this.setState({selectedTypeOfBusiness:value})
  }
  optionsBySelectTypeOfIndustry(value){
    this.setState({selectedTypeOfIndustry:value})
  }
  optionsBySelectSubDomain(value){
    this.setState({selectedSubDomain:value})
  }
  optionsBySelectStageOfCompany(value){
    this.setState({selectedStageOfCompany:value})
  }
  optionsBySelectSubsidaryComapny(val){
    this.setState({selectedSubsidaryComapny:val.value})
  }
  checkIdentity(event){
    console.log(event.target.name)
    this.setState({identity:event.target.name})
  }

  async  updateregistration() {
    let Details=null;
    if(this.state.identity=='Company'){
       Details = {
        registrationId      : this.props.registrationId,
        details:{
          userType              :   this.state.selectedUserType,
          companyName           :   this.refs.companyName.value,
          groupName             :   this.refs.groupName.value,
          companyWebsite        :   this.refs.companyWebsite.value,
          companyEmail          :   this.refs.companyEmail.value,
          foundationDate        :   this.refs.foundationDate.value,
          headQuarterLocation   :   this.state.selectedHeadquarter,
          branchLocations       :   this.state.selectedBranches,
          companytyp            :   this.state.selectedTypeOfCompany,
          entityType            :   this.state.selectedTypeOfEntity,
          businessType          :   this.state.selectedTypeOfBusiness,
          industry              :   this.state.selectedTypeOfIndustry,
          subDomain             :   this.state.selectedSubDomain,
          stageOfCompany        :   this.state.selectedStageOfCompany,
          subsidaryCompany      :   this.state.selectedSubsidaryComapny,
          parentCompany         :   this.refs.parentCompany.value,
          registrationNumber    :   this.refs.registrationNumber.value,
          isoAccrediationNumber :   this.refs.isoAccrediationNumber.value,
          companyTurnOver       :   this.refs.companyTurnOver.value,
          partnerCompanies      :   this.refs.partnerCompanies.value,
          investors             :   this.refs.investors.value,
          lookingFor            :   this.state.selectedLookingFor,
          companyCEOName        :   this.refs.companyCEOName.value,
          companyManagement     :   this.refs.companyManagement.value,
          toatalEmployeeCount   :   this.refs.toatalEmployeeCount.value,
          associatedCompanies   :   this.refs.associatedCompanies.value
        }
      }
    }else{
       Details = {
        registrationId      : this.props.registrationId,
        details:{
          identityType      : this.state.identity,
          userType          : this.state.selectedUserType,
          title             : '',
          firstName         : this.refs.companyName.value,
          middleName        : this.refs.companyName.value,
          lastName          : this.refs.companyName.value,
          displayName       : this.refs.companyName.value,
          dateOfBirth       : this.refs.companyName.value,
          gender            : '',
          citizenships      : '',
          qualification     : this.refs.companyName.value,
          employmentStatus  : '',
          professionalTag   : this.refs.companyName.value,
          industry          : this.state.selectedTypeOfIndustry,
          profession        : '',
          employerName      : this.refs.companyName.value,
          employerWebsite   : this.refs.companyName.value,
          employmentDate    : this.refs.employmentDate.value
        }
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

    let subsidary = [
      {value: 'Yes', label: 'Yes'},
      {value: 'No', label: 'No'}
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
    let that=this;
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
                <input type="text" placeholder="Date & Time" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Request id" className="form-control float-label" id=""/>
              </div>
              <div className="ml_tabs">
                <ul  className="nav nav-pills">
                  <li className="active">
                    <a  href="#3a" data-toggle="tab" name="Individual" onClick={this.checkIdentity.bind(this)}>Individual&nbsp;</a>
                  </li>
                  <li>
                    <a href="#4a" data-toggle="tab" name="Company" onClick={this.checkIdentity.bind(this)}>Company&nbsp;</a>
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <Moolyaselect multiSelect={false} placeholder="select user category" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedUserType} queryType={"graphql"} query={userTypequery} onSelect={that.optionsBySelectUserType.bind(this)} isDynamic={true}/>
              </div>
              {(this.state.identity=='Company'||this.state.identity=='')?
                <div>
              <div className="form-group">
                <input type="text" ref="companyName" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.companyName} placeholder="Company name" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref="groupName" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.groupName} placeholder="Group name" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref="companyWebsite" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.companyWebsite} placeholder="Company website" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref="companyEmail" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.companyEmail} placeholder="Comapany email" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref="foundationDate" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.foundationDate} placeholder="Foundation date" className="form-control float-label" id=""/>
                <FontAwesome name="calendar" className="password_icon"/>
              </div>
              <div className="form-group">
                <Moolyaselect multiSelect={false} placeholder="Headquarter Location" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedHeadquarter} queryType={"graphql"} query={citiesquery} onSelect={that.optionsBySelectHeadquarter.bind(this)} isDynamic={true}/>
              </div>
              <div className="form-group">
                <Moolyaselect multiSelect={true} placeholder="Branch Location" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedBranches} queryType={"graphql"} query={citiesquery} onSelect={that.optionsBySelectBranch.bind(this)} isDynamic={true}/>
              </div>
              <div className="form-group">
                <input type="text" ref="isoAccrediationNumber" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.isoAccrediationNumber} placeholder="ISO certification number" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref="companyTurnOver" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.companyTurnOver} placeholder="Comapany turnover" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref="partnerCompanies" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.partnerCompanies} placeholder="Partners" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref="investors" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.investors} placeholder="Investors" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <Moolyaselect multiSelect={false} placeholder="Looking For" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedLookingFor} queryType={"graphql"} query={lookinforquery} onSelect={that.optionsBySelectLookingFor.bind(this)} isDynamic={true}/>
              </div>
                </div>
              :
              <div>
                <div className="form-group">
                  <Select name="form-field-name" placeholder="Title" options={subsidary} selectedValue={this.state.selectedSubsidaryComapny} onSelect={this.optionsBySelectSubsidaryComapny.bind(this)}  className="float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" ref="firstName" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.firstName} placeholder="FirstName" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="middleName" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.middleName} placeholder="Middle Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="lastName" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.lastName} placeholder="Last Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="displayName" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.displayName} placeholder="Display Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="dateOfBirth" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.dateOfBirth} placeholder="Date Of Birth" className="form-control float-label" id=""/>
                  <FontAwesome name="calendar" className="password_icon"/>
                </div>
                <div className="form-group">
                  <Select name="form-field-name" placeholder="Gender" options={subsidary} selectedValue={this.state.selectedSubsidaryComapny} onSelect={this.optionsBySelectSubsidaryComapny.bind(this)}  className="float-label"/>
                </div>
              </div>
              }
            </form>
          </div>
        </div>
        <div className="col-md-6 nopadding-right">
          <div className="form_bg">
            <form>
              {(this.state.identity=='Company'||this.state.identity=='')?
                <div>
              <div className="form-group">
                <Moolyaselect multiSelect={false} placeholder="Select Type of Company" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedTypeOfCompany} queryType={"graphql"} query={companytypesquery} onSelect={that.optionsBySelectTypeOfCompany.bind(this)} isDynamic={true}/>
              </div>
              <div className="form-group">
                <Moolyaselect multiSelect={false} placeholder="Select Type of Entity" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedTypeOfEntity} queryType={"graphql"} query={entitiesquery} onSelect={that.optionsBySelectTypeOfEntity.bind(this)} isDynamic={true}/>
              </div>
              <div className="form-group">
                <Moolyaselect multiSelect={false} placeholder="Select Type of Business" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedTypeOfBusiness} queryType={"graphql"} query={businesstypesquery} onSelect={that.optionsBySelectTypeOfBusiness.bind(this)} isDynamic={true}/>
              </div>
              <div className="form-group">
                <Moolyaselect multiSelect={false} placeholder="Select Type Of Industry" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedTypeOfIndustry} queryType={"graphql"} query={industriesquery} onSelect={that.optionsBySelectTypeOfIndustry.bind(this)} isDynamic={true}/>
              </div>
              <div className="form-group">
                <Moolyaselect multiSelect={false} placeholder="Select Subdomain" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedSubDomain} queryType={"graphql"} query={industriesquery} onSelect={that.optionsBySelectStageOfCompany.bind(this)} isDynamic={true}/>
              </div>
              <div className="form-group">
                <Moolyaselect multiSelect={false} placeholder="Select Stage Of Company" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedStageOfCompany} queryType={"graphql"} query={stageofcompquery} onSelect={that.optionsBySelectStageOfCompany.bind(this)} isDynamic={true}/>
              </div>
              <div className="form-group">
                <Select name="form-field-name" placeholder="Select Subsidary Company" options={subsidary} selectedValue={this.state.selectedSubsidaryComapny} onSelect={this.optionsBySelectSubsidaryComapny.bind(this)}  className="float-label"/>
              </div>
              {this.state.selectedSubsidaryComapny=='Yes'?
              <div className="form-group">
                <input type="text" ref="parentCompany" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.parentCompany} placeholder="Enter Holding/Group/Owner Company Name" className="form-control float-label" id=""/>
              </div>:<div></div>}
              <div className="form-group">
                <input type="text" ref="registrationNumber" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.registrationNumber} placeholder="Registration number" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref="companyCEOName" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.companyCEOName} placeholder="CEO name" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref="companyManagement" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.companyManagement} placeholder="Total number of management people" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref="toatalEmployeeCount" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.toatalEmployeeCount} placeholder="Total number of employee" className="form-control float-label" id=""/>
              </div>
              <div className="form-group">
                <input type="text" ref="associatedCompanies" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.associatedCompanies} placeholder="Associate company" className="form-control float-label" id=""/>
              </div>
              </div> :<div>

                  <div className="form-group">
                    <input type="text" ref="qualification" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.qualification}  placeholder="Qualification" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <Select name="form-field-name" placeholder="Employment Status" options={subsidary} selectedValue={this.state.selectedSubsidaryComapny} onSelect={this.optionsBySelectSubsidaryComapny.bind(this)}  className="float-label"/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="professionalTag" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.professionalTag}  placeholder="Professional Tag" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <Moolyaselect multiSelect={false} placeholder="Select Type Of Industry" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedTypeOfIndustry} queryType={"graphql"} query={industriesquery} onSelect={that.optionsBySelectTypeOfIndustry.bind(this)} isDynamic={true}/>
                  </div>
                  <div className="form-group">
                    <Select name="form-field-name" placeholder="Profession" options={subsidary} selectedValue={this.state.selectedSubsidaryComapny} onSelect={this.optionsBySelectSubsidaryComapny.bind(this)}  className="float-label"/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="employerName" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.employerName}  placeholder="Employer Name" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="employerWebsite" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.employerWebsite}  placeholder="Employer Website" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="employmentDate" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.employmentDate} placeholder="Date Of Birth" className="form-control float-label" id=""/>
                    <FontAwesome name="calendar" className="password_icon"/>
                  </div>

                </div>}

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
