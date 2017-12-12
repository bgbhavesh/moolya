import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import { Scrollbars } from 'react-custom-scrollbars';
import gql from "graphql-tag";
import Moolyaselect from "../../commons/components/MlAppSelectWrapper";
import {updateRegistrationActionHandler} from "../actions/updateRegistration";
import Datetime from "react-datetime";
import moment from "moment";
import {initalizeFloatLabel} from "../../../commons/utils/formElemUtil";
import {mlFieldValidations} from "../../../commons/validations/mlfieldValidation";
import MlAccordion from "../../../app/commons/components/MlAccordion";
import MlAppActionComponent from "../../../app/commons/components/MlAppActionComponent";
// import MlActionComponent from "../../../commons/components/actions/ActionComponent";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
var diff = require('deep-diff').diff;
import _underscore from 'underscore'

export default class MlAppServiceProviderIndividualComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedUserType:null,
      selectedHeadquarter: null,
      selectedBranches: null,
      selectedLookingFor: null,
      selectedTypeOfCompany: null,
      selectedTypeOfEntity: null,
      selectedTypeOfBusiness: null,
      selectedTypeOfIndustry: null,
      selectedSubDomain: null,
      selectedStageOfCompany: null,
      employmentStatus: null,
      registrationId: '',
      registrationDetails: '',
      foundationDate: '',
      dateOfBirth: '',
      employmentDate: '',
      //identity:'',
      title: '',
      gender: '',
      citizenships: ''
      // profession:''

    };
    return this;
  }

  componentWillMount() {
    let details = this.props.registrationDetails;
    if (details) {
      this.setState({
        loading: false,
        registrationDetails: details,
        registrationId: this.props.registrationId,
        //selectedUserType: details.userType,
        selectedHeadquarter: details.headQuarterLocation,
        selectedBranches: details.branchLocations,
        selectedLookingFor: details.lookingFor,
        selectedTypeOfCompany: details.companytyp,
        selectedTypeOfEntity: details.entityType,
        selectedTypeOfBusiness: details.businessType,
        selectedTypeOfIndustry: details.industry,
        selectedSubDomain: details.subDomain,
        selectedStageOfCompany: details.stageOfCompany,
        employmentStatus: details.employmentStatus,
        foundationDate: details.foundationDate,
        dateOfBirth: details.dateOfBirth,
        employmentDate: details.employmentDate,
        title: details.title,
        gender: details.gender,
        citizenships: details.citizenships,
        // profession:details.profession
      })
    } else {
      this.setState({
        loading: false
        // identity : 'Company'
      })
    }
  }

  componentDidMount() {
    initalizeFloatLabel();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (210 + $('.app_header').outerHeight(true)));
  }

  /* optionsBySelectUserType(value){
   this.setState({selectedUserType:value})
   }*/
  optionsBySelectTypeOfIndustry(value) {
    this.setState({selectedTypeOfIndustry: value})
  }

  optionsBySelectSubsidaryComapny(val) {
    this.setState({employmentStatus: val})
  }


  openDatePickerEmploymentDate() {
    $('#date-time').toggleClass('rdtOpen')
  }

  openDatePickerDateOfBirth() {
    $('#date-of-birth').toggleClass('rdtOpen')
  }


  checkIdentity(event) {
    console.log(event.target.name)
    // this.setState({identity:event.target.name})
  }

  optionsBySelectGender(val) {
    this.setState({gender: val.value})
  }

  optionsBySelectTitle(val) {
    this.setState({title: val})
  }

  /* optionsBySelectProfession(val){
   this.setState({profession:val})
   }
   */
  async  updateregistration() {
    let ret = mlFieldValidations(this.refs)
    if (ret) {
      toastr.error(ret);
    } else {

      let Details = null;
      Details = {
        registrationId: this.props.registrationId,
        details: {
          //identityType      : this.state.identity,
          // userType          : this.state.selectedUserType,
          title: this.state.title,
          firstName: this.refs.firstName.value,
          middleName: this.refs.middleName.value,
          lastName: this.refs.lastName.value,
          displayName: this.refs.displayName.value,
          dateOfBirth: this.state.dateOfBirth,
          gender: this.state.gender,
          citizenships: this.state.citizenships,
          qualification: this.refs.qualification.value,
          employmentStatus: this.state.employmentStatus,
          professionalTag: this.refs.professionalTag.value,
          industry: this.state.selectedTypeOfIndustry,
          profession: this.state.profession,
          employerName: this.refs.employerName.value,
          employerWebsite: this.refs.employerWebsite.value,
          employmentDate: this.state.employmentDate,
          experience: this.refs.experience.value
        }
      }
      //this.props.getRegistrationDetails();
      const response = await updateRegistrationActionHandler(Details);
      this.props.getRegistrationDetails();
      toastr.success("Saved successfully");
      return response;
    }
  }

  updateRegistration() {
    const resp = this.updateregistration();
    return resp;
  }

  onfoundationDateSelection(event) {
    if (event._d) {
      let value = moment(event._d).format('DD-MM-YYYY');
      this.setState({loading: false, foundationDate: value});
    }
  }

  ondateOfBirthSelection(event) {
    var ageDifMs = Date.now() - event._d.getTime();
    var ageDate = new Date(ageDifMs);
    if (event._d) {
      let value = moment(event._d).format('MM/DD/YYYY');
      this.setState({loading: false, dateOfBirth: value});
    }
    if ((Math.abs(ageDate.getUTCFullYear() - 1970) >= 18)) {
    }
    else {
      toastr.error("Minimum Age for Registration is 18 years")
    }
  }

  onemploymentDateSelection(event) {
    if (event._d) {
      let value = moment(event._d).format('DD-MM-YYYY');
      this.setState({loading: false, employmentDate: value});
    }
  }

  optionsBySelectCitizenships(val) {
    this.setState({citizenships: val})
  }

  isValidated(){
    let ret = mlFieldValidations(this.refs)
    if (ret) {
      return false
    }else{
      return true
    }
  }

  isUpdated(){
    let existingObject = this.props.registrationDetails || {}
    let oldObject = {
      title: existingObject.title ? existingObject.title:null,
      firstName: existingObject.firstName?existingObject.firstName:null,
      middleName: existingObject.middleName?existingObject.middleName:null,
      lastName: existingObject.lastName?existingObject.lastName:null,
      displayName: existingObject.displayName?existingObject.displayName:null,
      dateOfBirth: existingObject.dateOfBirth?existingObject.dateOfBirth:null,
      gender: existingObject.gender?existingObject.gender:null,
      //citizenships: existingObject.citizenships?existingObject.citizenships:null,
      qualification: existingObject.qualification?existingObject.qualification:null,
      employmentStatus: existingObject.employmentStatus?existingObject.employmentStatus:null,
      professionalTag: existingObject.professionalTag?existingObject.professionalTag:null,
      industry:   existingObject.industry?existingObject.industry:null,
      profession: existingObject.profession?existingObject.profession:null,
      employerName: existingObject.employerName?existingObject.employerName:null,
      employerWebsite: existingObject.employerWebsite?existingObject.employerWebsite:null,
      employmentDate: existingObject.employmentDate?existingObject.employmentDate:null,
      experience: existingObject.experience?existingObject.experience:null
    }
    let newObject = {
      title: this.state.title ? this.state.title:null,
      firstName: this.refs.firstName.value?this.refs.firstName.value:null,
      middleName: this.refs.middleName.value?this.refs.middleName.value:null,
      lastName: this.refs.lastName.value?this.refs.lastName.value:null,
      displayName: this.refs.displayName.value?this.refs.displayName.value:null,
      dateOfBirth: this.state.dateOfBirth?this.state.dateOfBirth:null,
      gender: this.state.gender?this.state.gender:null,
      //citizenships: this.state.citizenships?this.state.citizenships:null,
      qualification: this.refs.qualification.value?this.refs.qualification.value:null,
      employmentStatus: this.state.employmentStatus?this.state.employmentStatus:null,
      professionalTag: this.refs.professionalTag.value?this.refs.professionalTag.value:null,
      industry: this.state.selectedTypeOfIndustry?this.state.selectedTypeOfIndustry:null,
      profession: this.state.profession?this.state.profession:null,
      employerName: this.refs.employerName.value?this.refs.employerName.value:null,
      employerWebsite: this.refs.employerWebsite.value?this.refs.employerWebsite.value:null,
      employmentDate: this.state.employmentDate?this.state.employmentDate:null,
      experience: this.refs.experience.value?this.refs.experience.value:null
    }
    var differences = diff(oldObject, newObject);
    //console.log(differences);
    var filteredObject = _underscore.where(differences, {kind: "E"});
    console.log("///////////////////////////////////////////////")
    console.log(differences)
    if(filteredObject && filteredObject.length>0){
      return false
    }else{
      return true
    }
  }

  render() {
    var yesterday = Datetime.moment().subtract(0, 'day');
    var valid = function (current) {
      return current.isBefore(yesterday);
    };
    let userType = this.props.userType;
    /**
     * action handlers
     * */
    let appActionConfig = [
      {
        showAction: true,
        actionName: 'save',
        handler: this.updateRegistration.bind(this),
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => {
          FlowRouter.go("/app/dashboard")
        }
      },
    ]
    export const genericAccordionConfig = {
      id: 'registrationAccordion',
      panelItems: [
        {
          'title': 'Actions',
          isText: false,
          style: {'background': '#ef4647'},
          contentComponent: <MlAppActionComponent
            resourceDetails={{
              resourceId: 'registrationId',
              resourceType: 'registration'
            }}
            actionOptions={appActionConfig}/>
        }]
    }
    {/**need to pass generic regId*/
    }

    let subsidary = [
      {value: 'Yes', label: 'Yes'},
      {value: 'No', label: 'No'}
    ];
    let genderValues = [
      {value: 'male', label: 'Male'},
      {value: 'female', label: 'Female'},
      {value: 'others', label: 'Others'}
    ];

    let genderquery = gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;
    let genderOption = {options: {variables: {type: "GENDER", hierarchyRefId: this.props.clusterId}}};
    let titlequery = gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;
    let employementquery = gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;
    let employmentOption = {options: {variables: {type: "EMPLOYMENTTYPE", hierarchyRefId: this.props.clusterId}}};
    let titleOption = {options: {variables: {type: "TITLE", hierarchyRefId: this.props.clusterId}}};
    /*let citizenshipsquery=gql`query($type:String,$hierarchyRefId:String){
     data: fetchMasterSettingsForPlatFormAdmin(type:$type,hierarchyRefId:$hierarchyRefId) {
     label
     value
     }
     }
     `;
     let citizenshipsOption={options: { variables: {type : "CITIZENSHIPS",hierarchyRefId:this.props.clusterId}}};
     */

    let userTypequery = gql`query{
    data:FetchUserType {label:userTypeName,value:_id}
    }
    `;
    let industriesquery = gql` query{
    data:fetchIndustries{label:industryName,value:_id}
    }
    `;

    let professionQuery = gql` query($industryId:String){
      data:fetchIndustryBasedProfession(industryId:$industryId) {
        label:professionName
        value:_id
      }
    }`;
    let citizenshipsquery = gql`query{
        data:FetchCitizenship {
          label:citizenshipTypeName
          value:_id
        
        }
        }
     `;
    let professionQueryOptions = {options: {variables: {industryId: this.state.selectedTypeOfIndustry}}};

    let that = this;
    const showLoader = this.state.loading;
    return (

      <div className="step_form_wrap step2">
        <Scrollbars speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
        <div className="col-md-6 nopadding-left">


            <div className="form_bg">
              <form>
                <div>
                  <div className="form-group">
                    <input type="text" placeholder="Date & Time" className="form-control float-label" id=""
                           defaultValue={moment(this.props.registrationInfo.registrationDate).format('MM/DD/YYYY hh:mm:ss')}
                           disabled="true"/>
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Request Id" className="form-control float-label" id=""
                           defaultValue={this.props.registrationInfo.registrationId} disabled="true"/>
                  </div>
                  {/*<div className="form-group">
                   <Moolyaselect multiSelect={false} placeholder="select user category" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedUserType} queryType={"graphql"} query={userTypequery} onSelect={that.optionsBySelectUserType.bind(this)} isDynamic={true}/>
                   </div>*/}
                  <div className="form-group">
                    <Moolyaselect multiSelect={false} placeholder="Title" className="form-control float-label"
                                  valueKey={'value'} labelKey={'label'} selectedValue={this.state.title}
                                  queryType={"graphql"} query={titlequery} queryOptions={titleOption}
                                  onSelect={that.optionsBySelectTitle.bind(this)} isDynamic={true} data-required={true}
                                  data-errMsg="Title is required"/>

                  </div>
                  <div className="form-group mandatory">
                    <input type="text" ref="firstName"
                           defaultValue={that.state.registrationDetails && that.state.registrationDetails.firstName}
                           placeholder="First Name" className="form-control float-label" id="" data-required={true}
                           data-errMsg="First Name is required"/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="middleName"
                           defaultValue={that.state.registrationDetails && that.state.registrationDetails.middleName}
                           placeholder="Middle Name" className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group mandatory">
                    <input type="text" ref="lastName"
                           defaultValue={that.state.registrationDetails && that.state.registrationDetails.lastName}
                           placeholder="Last Name" className="form-control float-label" id="" data-required={true}
                           data-errMsg="Last Name is required"/>
                  </div>
                  <div className="form-group mandatory">
                    <input type="text" ref="displayName"
                           defaultValue={that.state.registrationDetails && that.state.registrationDetails.displayName}
                           placeholder="Display Name" className="form-control float-label" id="" data-required={true}
                           data-errMsg="Display Name is required"/>
                  </div>
                  <div className="form-group mandatory" id="date-of-birth">
                    <Datetime dateFormat="DD-MM-YYYY" ref={"dob"} timeFormat={false} inputProps={{placeholder: "Date Of Birth",readOnly:true}}
                              closeOnSelect={true} value={that.state.dateOfBirth}
                              onChange={that.ondateOfBirthSelection.bind(that)} isValidDate={ valid }
                              data-required={true} data-errMsg="Date Of Birth is required"/>
                    <FontAwesome name="calendar" className="password_icon"
                                 onClick={that.openDatePickerDateOfBirth.bind(that)}/>
                    {/*<br className="brclear"/>  <br className="brclear"/>  <br className="brclear"/>*/}
                  </div>
                  {/*<div className="form-group">*/}
                  {/*<Moolyaselect multiSelect={false} placeholder="Select Gender" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.gender} queryType={"graphql"} query={genderquery}  queryOptions={genderOption} onSelect={that.optionsBySelectGender.bind(this)} isDynamic={true}/>*/}
                  {/*</div>*/}
                  <div className="form-group mandatory">
                    <Select name="form-field-name"  ref={"gender"} placeholder="Select Gender" value={this.state.gender}
                            options={genderValues} onChange={this.optionsBySelectGender.bind(this)}
                            className="float-label" data-required={true} data-errMsg="Gender is required"/>
                  </div>
                  <div className="form-group">
                    <Moolyaselect multiSelect={true} placeholder="Select Citizenship"
                                  className="form-control float-label" valueKey={'value'} labelKey={'label'}
                                  selectedValue={this.state.citizenships} queryType={"graphql"}
                                  query={citizenshipsquery} onSelect={that.optionsBySelectCitizenships.bind(that)}
                                  isDynamic={true}/>
                  </div>
                  <br className="brclear"/> <br className="brclear"/> <br className="brclear"/>

                </div>

              </form>
            </div>
        </div>
        <div className="col-md-6 nopadding-right">

            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" ref="qualification"
                         defaultValue={that.state.registrationDetails && that.state.registrationDetails.qualification}
                         placeholder="Qualification" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  {/*<Select name="form-field-name" placeholder="Employment Status" options={subsidary} value={this.state.employmentStatus} onChange={this.optionsBySelectSubsidaryComapny.bind(this)}  className="float-label"/>*/}
                  <Moolyaselect multiSelect={false} placeholder="Employment Status" className="form-control float-label"
                                valueKey={'value'} labelKey={'label'} selectedValue={this.state.employmentStatus}
                                queryType={"graphql"} query={employementquery} queryOptions={employmentOption}
                                onSelect={that.optionsBySelectSubsidaryComapny.bind(this)} isDynamic={true}/>
                </div>
                <div className="form-group">
                  <input type="text" ref="professionalTag"
                         defaultValue={that.state.registrationDetails && that.state.registrationDetails.professionalTag}
                         placeholder="Professional Tag" className="form-control float-label" id=""/>
                </div>
                {/* <div className="form-group">
                 <Moolyaselect multiSelect={false} placeholder="Select Type Of Industry" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedTypeOfIndustry} queryType={"graphql"} query={industriesquery} onSelect={that.optionsBySelectTypeOfIndustry.bind(this)} isDynamic={true}/>
                 </div>
                 <div className="form-group">
                 <Moolyaselect multiSelect={false} placeholder="Select Profession" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.profession} queryType={"graphql"} query={professionQuery} queryOptions={professionQueryOptions}  onSelect={that.optionsBySelectProfession.bind(this)} isDynamic={true}/>

                 </div>*/}
                <div className="form-group">
                  <input type="text" ref="employerName"
                         defaultValue={that.state.registrationDetails && that.state.registrationDetails.employerName}
                         placeholder="Employer Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="employerWebsite"
                         defaultValue={that.state.registrationDetails && that.state.registrationDetails.employerWebsite}
                         placeholder="Employer Website" className="form-control float-label" id=""/>
                </div>
                <div className="form-group" id="date-time">
                  <Datetime dateFormat="DD-MM-YYYY" timeFormat={false} inputProps={{placeholder: "Employment Date",readOnly:true}}
                            closeOnSelect={true} value={that.state.employmentDate}
                            onChange={that.onemploymentDateSelection.bind(that)} isValidDate={ valid }/>
                  <FontAwesome name="calendar" className="password_icon"
                               onClick={that.openDatePickerEmploymentDate.bind(that)}/>
                </div>
                <div className="form-group">
                  <input type="text" ref="experience"
                         defaultValue={that.state.registrationDetails && that.state.registrationDetails.experience}
                         placeholder="Year of Experience" className="form-control float-label" id=""/>
                </div>
              </form>
            </div>
        </div>
        <MlAccordion accordionOptions={genericAccordionConfig} {...this.props} />
        </Scrollbars>
        {/*<MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>*/}
      </div>
    )
  }
}
