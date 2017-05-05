import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
var Select = require('react-select');
import Moolyaselect from '../../../../commons/components/select/MoolyaSelect'
import ScrollArea from 'react-scrollbar';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import {updateRegistrationActionHandler,emailVerificationActionHandler,smsVerificationActionHandler} from '../actions/updateRegistration'
import {initalizeFloatLabel} from '../../../utils/formElemUtil';
import {fetchIdentityTypes} from "../actions/findRegistration";
import _ from 'lodash';
import {mlFieldValidations} from '../../../../commons/validations/mlfieldValidation';

var FontAwesome = require('react-fontawesome');
var options3 = [
  {value: 'Yes', label: 'Yes'},
  {value: 'No', label: 'No'}
];
var i = 1;

export default class step1 extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading:true,
      country:'',
      cluster:'',
      chapter:'',
      selectedCity:'',
      registrationId:'',
      registrationDetails:'',
      subscription:'',
      registrationType:'',
      refered:'',
      institutionAssociation:'',
      coummunityName:'',
      identityType:'',
      userType:null,
      identityTypesData:[],
      selectedTypeOfIndustry:'',
      profession:null,
      defaultIdentityIndividual: false,
      defaultIdentityCompany:false,
    }

    this.fetchIdentityTypesMaster.bind(this);
    this.updateregistrationInfo.bind(this);
    this.settingIdentity.bind(this);

    return this;
  }
  async settingIdentity(identity){

    if(identity == "Individual"){
      this.setState({defaultIdentityIndividual:true, defaultIdentityCompany: false})
      $('#companyId').hide();
    }
    if(identity == "Company"){
      this.setState({defaultIdentityCompany: true, defaultIdentityIndividual:false})
      $('#individualId').hide();
    }
    if(identity === null){
      this.setState({defaultIdentityCompany: false, defaultIdentityIndividual:false})
      i = 0;
    }
  }


  async fetchIdentityTypesMaster() {
    const response = await fetchIdentityTypes(this.props.config);
    this.setState({identityTypesData: response});
    console.log(this.state.identityTypesData);
    // this.IdentityCheckbox();
    return response;
  }

  componentWillMount() {
    this.fetchIdentityTypesMaster();

    let details=this.props.registrationInfo;
    this.setState({loading:false,
      registrationDetails:details,
      registrationId:details.registrationId,
      country :details.countryId,
      selectedCity : details.cityId,
      registrationType : details.registrationType,
      subscription: details.accountType,
      institutionAssociation :details.institutionAssociation,
      refered: details.referralType,
      cluster : details.clusterId,
      chapter :details.chapterId,
      identityType:details.identityType,
      userType:details.userType,
      selectedTypeOfIndustry:details.industry,
      profession:details.profession
    });
    this.settingIdentity(details.identityType);

  }

  componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
    initalizeFloatLabel();
    if(this.state.defaultIdentityIndividual == true){
      $('#companyId').hide();

    }
    if(this.state.defaultIdentityCompany == true){
      $('#individualId').hide();

    }



    //this.props.getRegistrationDetails(this.state)
  }
  optionsBySelectCountry(value){
    this.setState({country:value})
  }
  optionsBySelectCluster(value){
    this.setState({cluster:value})
  }
  optionsBySelectChapter(value){
    this.setState({chapter:value})
  }
  optionsBySelectCity(value){
    this.setState({selectedCity:value})
  }
  optionBySelectRegistrationType(value, calback, selObject){
    this.setState({registrationType:value});
    this.setState({identityType:null});
    this.setState({coummunityName:selObject.label})
  }
  optionBySelectSubscription(val){
    this.setState({subscription:val.value})
  }
  optionBySelectRefered(val){
    this.setState({refered:val.value})
  }
  optionBySelectinstitutionAssociation(val){
    this.setState({institutionAssociation:val.value})
    return resp;
  }
  optionsBySelectTypeOfIndustry(value){
    this.setState({selectedTypeOfIndustry:value})
  }
  optionsBySelectProfession(val){
    this.setState({profession:val})
  }

  checkIdentityIndividual(event) {
    this.setState({identityType: event.target.name});
    i++;
    if(event.target.name=="Individual"){
      // this.settingIdentity(event.target.name);
      $('#companyId').hide();
      this.setState({defaultIdentityIndividual: true, defaultIdentityCompany:false})

      if (i>1){
        i = 0;
        // this.setState({identityType: " "});
        $('#individualId').show();
        $('#companyId').show();
      }
    }else if(event.target.name=="Company"){
      //this.settingIdentity(event.target.name);
      this.setState({defaultIdentityCompany: true, defaultIdentityIndividual:false})
      $('#individualId').hide();
      if (i>1){
        i = 0;
        // this.setState({identityType: " "});
        $('#individualId').show();
        $('#companyId').show();
      }
    }
  }


  /* checkIdentityCompany(event) {
   this.setState({identityType: event.target.name});
   i++;
   $('#indi').hide();
   if (i > 1){
   i = 0;
   this.setState({identityType: " "});
   $('#indi').show();
   $('#comp').show();
   }
   }


   */
  optionsBySelectUserType(value){
    this.setState({userType:value})
  }


  async updateregistrationInfo() {
    let ret = mlFieldValidations(this.refs)
    if (ret) {
      toastr.error(ret);
    } else {

      let Details = {
        registrationId: this.props.registrationId,
        registrationDetail: {
          registrationId: this.state.registrationId,
          firstName: this.refs.firstName.value,
          lastName: this.refs.lastName.value,
          countryId: this.state.country,
          contactNumber: this.refs.contactNumber.value,
          email: this.refs.email.value,
          cityId: this.state.selectedCity,
          registrationType: this.state.registrationType,
          userName: this.refs.userName.value,
          password: this.refs.password.value,
          accountType: this.state.subscription,
          institutionAssociation: this.state.institutionAssociation,
          companyname: this.refs.companyName.value,
          companyUrl: this.refs.companyUrl.value,
          remarks: this.refs.remarks.value,
          referralType: this.state.refered,
          clusterId: this.state.cluster,
          chapterId: this.state.chapter,
          communityName: this.state.coummunityName,
          identityType: this.state.identityType,
          userType: this.state.userType,
          industry: this.state.selectedTypeOfIndustry,
          profession: this.state.profession

        }
      }
      const response = await updateRegistrationActionHandler(Details);
      return response;
    }
  }

  async updateRegistration(){
    const response= await this.updateregistrationInfo();
    console.log(response);
    if(response.success){
      this.props.refetchRegistrationAndTemplates();
      toastr.success("Saved Successfully")
    }else{
      toastr.error(response.result);
    }
    return response;
  }

  async sendEmailVerification(){
    const response= await emailVerificationActionHandler(this.props.registrationId);
    if(response.success){
      toastr.success("email verification link send successfully");
    }else{
      // toastr.error(response.result);
    }
    return response;

  }


  async sendSmsVerification(){
    const response= await smsVerificationActionHandler(this.props.registrationId);
    if(response.success){
      toastr.success("otp verification code send successfully");
    }else{
      // toastr.error(response.result);
    }
    return response;

  }

  render(){
    let MlActionConfig = [
      {
        actionName: 'save',
        showAction: true,
        handler: this.updateRegistration.bind(this)
      },
      // {
      //   actionName: 'comment',
      //   showAction: true,
      //   handler: this.updateRegistration.bind(this)
      // },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async (event) => {
          FlowRouter.go("/admin/transactions/registrationRequested")
        }
      }
    ];


    let countryQuery = gql`query{
 data:fetchCountries {
    value:_id
    label:country
  }
}`
    let clusterQuery = gql`query{data:fetchClustersForMap{label:displayName,value:_id}}
    `;
    let chapterQuery = gql`query($id:String){  
  data:fetchChaptersWithoutAll(id:$id) {
    value:_id
    label:chapterName
  }  
}`;
    /*    let citiesquery = gql`query{
     data:fetchCities {label:name,value:_id
     }
     }
     `;*/
    let citiesquery = gql`query($countryId:String){
      data:fetchCitiesPerCountry(countryId:$countryId){label:name,value:_id}
    }
    `;
    let fetchcommunities = gql` query{
  data:fetchCommunityDefinition{label:name,value:code}
} 
`;
    let userTypequery = gql` query($communityCode:String){  
    data:FetchUserType(communityCode:$communityCode) {
      value:_id
      label:userTypeName
  }  }
    `;
    let industriesquery=gql` query{
    data:fetchIndustries{label:industryName,value:_id}
    }
    `;

    let professionQuery=gql` query($industryId:String){
      data:fetchIndustryBasedProfession(industryId:$industryId) {
        label:professionName
        value:_id
      }
    }`;
    let professionQueryOptions = {options: {variables: {industryId:this.state.selectedTypeOfIndustry}}};
    let userTypeOption={options: { variables: {communityCode:this.state.registrationType}}};
    let chapterOption={options: { variables: {id:this.state.cluster}}};
    /*let registrationOptions = [
     { value: '0', label: 'simplybrowsing' },
     { value: '1', label: 'ideator' },
     { value: '2', label: 'startup' },
     { value: '3', label: 'company' },
     { value: '4', label: 'funder/investor' },
     { value: '5', label: 'institution' },
     { value: '6', label: 'service provider' },
     { value: '7', label: 'iam not sure' },
     ];*/

    let subscriptionOptions = [
      {value: 'Starter', label: 'Starter'},
      {value: 'Premier', label: 'Premier'}
    ];
    let referedOption=[
      { value: '0', label: 'friends/collegues reference' },
      { value: '1', label: 'google/searching' },
      { value: '2', label: 'newspaper' },
      { value: '3', label: 'hoarding' },
      { value: '4', label: 'event' },
      { value: '5', label: 'radio' },
      { value: '6', label: 'i over heard it' },
    ]

    const showLoader=this.state.loading;
    let that=this;

    let identityTypez=_.filter(that.state.identityTypesData, function(i) { return _.indexOf(i.communities,that.state.registrationType)>=0?true:false;})||[];
    console.log(identityTypez);
    let canSelectIdentity=identityTypez&&identityTypez.length>0?true:false;
    let countryOption = {options: { variables: {countryId:this.state.country}}};
    return (
      <div>
        {showLoader===true?( <div className="loader_wrap"></div>):(
          <div className="step_form_wrap step1">

            <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
              <div className="col-md-6 nopadding-left">
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text" placeholder="Date & Time" className="form-control float-label" id="" disabled="true"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Request ID"  defaultValue={that.state.registrationId} className="form-control float-label" id="" disabled="true"/>
                    </div>
                    <div className="form-group mandatory">
                      <input type="text" ref="firstName" placeholder="First Name" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.firstName} className="form-control float-label" data-required={true} data-errMsg="First Name is required" />
                    </div>
                    <div className="form-group mandatory">
                      <input type="text" ref="lastName" placeholder="Last Name" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.lastName} className="form-control float-label" id="" data-required={true} data-errMsg="Last Name is required" />
                    </div>
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Your Country"  selectedValue={this.state.country} queryType={"graphql"} query={countryQuery} isDynamic={true}  onSelect={this.optionsBySelectCountry.bind(this)}  />
                    </div>
                    <div className="form-group mandatory">
                      <input type="text" ref="contactNumber" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.contactNumber}  placeholder="Contact number" className="form-control float-label" id=""data-required={true} data-errMsg="Contact Number is required" />
                    </div>
                    <div className="form-group mandatory">
                      <input type="text" ref="email" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.email}  placeholder="Email ID" className="form-control float-label" id="" disabled="true" data-required={true} data-errMsg="Email Id is required"/>
                    </div>
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} placeholder="Registration Type" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.registrationType} queryType={"graphql"} query={fetchcommunities} onSelect={that.optionBySelectRegistrationType.bind(this)} isDynamic={true} />
                    </div>
                    {/*<div className="form-group">*/}
                    {/*<Moolyaselect multiSelect={false} placeholder="Headquarter Location" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedCity} queryType={"graphql"} queryOptions={countryOption} query={citiesquery} onSelect={that.optionsBySelectCity.bind(this)} isDynamic={true}/>*/}
                    {/*</div>*/}
                    <div className="panel panel-default">
                      <div className="panel-heading">Operation Area</div>
                      <div className="panel-body">
                        <Moolyaselect multiSelect={false} placeholder="Select Cluster" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.cluster} queryType={"graphql"} query={clusterQuery}  isDynamic={true}  onSelect={this.optionsBySelectCluster.bind(this)}/>
                        <Moolyaselect multiSelect={false} placeholder="Select Chapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapter} queryType={"graphql"} query={chapterQuery} reExecuteQuery={true} queryOptions={chapterOption}  isDynamic={true}  onSelect={this.optionsBySelectChapter.bind(this)}/>

                        {/* {canSelectIdentity&&
                         <div className="ml_tabs">
                         <ul  className="nav nav-pills">

                         {identityTypez.map((i)=>{

                         return (<li key={i.identityTypeName} className={that.state.identityType===i.identityTypeName?"active":""}>
                         <a href={i.identityTypeName==="Individual?"?"#3a":"#4a"} data-toggle="tab" name={i.identityTypeName} onClick={that.checkIdentity.bind(that)}>{i.identityTypeName}&nbsp;</a>
                         </li>);
                         })}
                         /!* <li className={this.state.identityType==="Individual"?"active":""}>
                         <a  href="#3a" data-toggle="tab" name="Individual" onClick={this.checkIdentity.bind(this)}>Individual&nbsp;</a>
                         </li>
                         <li className={this.state.identityType==="Company"?"active":""}>
                         <a href="#4a" data-toggle="tab" name="Company" onClick={this.checkIdentity.bind(this)}>Company&nbsp;</a>
                         </li>*!/
                         </ul>
                         </div>
                         }*/}
                        {canSelectIdentity &&
                        <div className="form-group">
                          {identityTypez.map((i) => {
                            let checked=null
                            if(i._id=='individual'){
                              checked=that.state.defaultIdentityIndividual
                            }else if(i._id=='company'){
                              checked=that.state.defaultIdentityCompany
                            }
                            return (
                              <div key={i._id}>
                                <div id={`${i._id}Id`}  className="input_types">

                                  <input type="checkbox" name={i.identityTypeName} value={i._id}
                                         onChange={that.checkIdentityIndividual.bind(that) }
                                         defaultChecked={checked}/><label
                                  htmlFor="radio1"><span><span></span></span>{i.identityTypeName}</label>
                                </div>
                                {/* <div id="comp" className="input_types">
                                 <input type="checkbox" name="Company" value="Company"
                                 onChange={that.checkIdentityCompany.bind(that)}
                                 defaultChecked={this.state.defaultIdentityCompany}/><label
                                 htmlFor="radio2"><span><span></span></span>Company</label>
                                 </div>*/}
                              </div>)
                          })
                          }
                        </div>
                        }
                        <div className="clearfix"></div>
                        <div className="form-group mart20">
                          <Moolyaselect multiSelect={false} placeholder="Select User Category" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.userType} queryType={"graphql"} query={userTypequery} reExecuteQuery={true} queryOptions={userTypeOption}   onSelect={that.optionsBySelectUserType.bind(this)} isDynamic={true}/>
                        </div>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false} placeholder="Select Type Of Industry" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedTypeOfIndustry} queryType={"graphql"} query={industriesquery} onSelect={that.optionsBySelectTypeOfIndustry.bind(this)} isDynamic={true}/>
                        </div>
                        <div className="form-group">
                          <Moolyaselect multiSelect={false} placeholder="Select Profession" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.profession} queryType={"graphql"} query={professionQuery} queryOptions={professionQueryOptions}  onSelect={that.optionsBySelectProfession.bind(this)} isDynamic={true} />

                        </div>

                        <div className="form-group">
                          <input type="text" placeholder="Source" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.source}  className="form-control float-label" id="" disabled="true" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Device Name" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.deviceName} className="form-control float-label" id="" disabled="true"/>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Device Number" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.deviceNumber} className="form-control float-label" id="" disabled="true"/>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="IP Address" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.ipAddress} className="form-control float-label" id="" disabled="true"/>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="IP Location" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.ipLocation} className="form-control float-label" id="" disabled="true"/>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 nopadding-right">
                <div className="form_bg">
                  <form>

                    <div className="form-group">
                      <input type="text" placeholder="User Name" ref="userName" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.userName}  className="form-control float-label" id="" disabled="true"/>
                    </div>
                    <div className="form-group">
                      <input type="Password" placeholder="Password" ref="password" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.password} className="form-control float-label" id="" disabled="true"/>
                    </div>
                    <div className="form-group">
                      <Select name="form-field-name" placeholder="Account Type" value={this.state.subscription} options={subscriptionOptions} className="float-label" onChange={this.optionBySelectSubscription.bind(this)} />
                    </div>
                    <div className="form-group">
                      <Select name="form-field-name"  placeholder="Do You Want To Associate To Any Of The Institution" value={this.state.institutionAssociation}  options={options3} onChange={this.optionBySelectinstitutionAssociation.bind(this)} className="float-label" />
                    </div>
                    <div className="form-group">
                      <input type="text" ref="companyName" placeholder="Company Name"  defaultValue={that.state.registrationDetails&&that.state.registrationDetails.companyname}  className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" ref="companyUrl" placeholder="Company URL"  defaultValue={that.state.registrationDetails&&that.state.registrationDetails.companyUrl}  className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" ref="remarks" placeholder="Remarks"  defaultValue={that.state.registrationDetails&&that.state.registrationDetails.remarks}  className="form-control float-label" id="" />
                    </div>
                    <div className="form-group mandatory">
                      <Select name="form-field-name" placeholder="How Did You Know About Us" value={this.state.refered} options={referedOption} className="float-label" onChange={this.optionBySelectRefered.bind(this)} data-required={true} data-errMsg="How Did You Know About Us is required" />
                    </div>

                    {/* <div className="panel panel-default">
                     <div className="panel-heading">Process Status</div>
                     <div className="panel-body button-with-icon">
                     <button type="button" className="btn btn-labeled btn-success"  onClick={this.sendSmsVerification.bind(this)} >
                     <span className="btn-label"><FontAwesome name='key'/></span>Send OTP</button>
                     <button type="button" className="btn btn-labeled btn-success" onClick={this.sendEmailVerification.bind(this)}>
                     <span className="btn-label"><span className="ml ml-email"></span></span>Send Email</button>
                     /!*<button type="button" className="btn btn-labeled btn-success" >
                     <span className="btn-label"><FontAwesome name='bullhorn'/></span>Send Ann.Temp</button>*!/
                     </div>
                     </div>*/}

                  </form>
                </div>
              </div>
            </ScrollArea>
            <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
          </div>
        )}
      </div>
    )
  }
};
/*export default Step1 = formHandler()(Step1);*/
