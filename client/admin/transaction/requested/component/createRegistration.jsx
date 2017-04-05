import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { graphql } from 'react-apollo';
import Select from 'react-select';
import Datetime from "react-datetime";
import moment from "moment";
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');
import gql from 'graphql-tag';
import Moolyaselect from '../../../../commons/components/select/MoolyaSelect'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import {createRegistrationInfo} from '../actions/createRegistrationInfo'
import {initalizeFloatLabel} from '../../../utils/formElemUtil';
import formHandler from '../../../../commons/containers/MlFormHandler'

export default class MlCreateRegistration extends React.Component{

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
      userName : ''
    }
    //this.addEventHandler.bind(this);
    this.createRegistration.bind(this)
    return this;
  }

  componentDidMount(){
    var WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
    initalizeFloatLabel();
  }

  async  createRegistration() {
    let Details = {

        firstName       :  this.refs.firstName.value,
        lastName        :  this.refs.lastName.value,
        countryId     :  this.state.country,
        contactNumber   :  this.refs.contactNumber.value,
        email           :  this.refs.email.value,
        cityId          :  this.state.selectedCity,
        registrationType:  this.state.registrationType,
        userName        :  this.refs.userName.value,
        password        :  this.refs.password.value,
        accountType     :  this.state.subscription,
        institutionAssociation    :   this.state.institutionAssociation,
        companyname     :  this.refs.companyName.value,
        companyUrl      :  this.refs.companyUrl.value,
        remarks         :  this.refs.remarks.value,
        referralType    :  this.state.refered,
        clusterId       :  this.state.cluster,
        chapterId       :  this.state.chapter,
        communityName  :  this.state.coummunityName,

    }
    const response = await createRegistrationInfo(Details);
    if(response.success){
      FlowRouter.go("/admin/transactions/registrationRequested");
    }else{
      toastr.error(response.result);
      FlowRouter.go("/admin/transactions/registrationRequested");
    }
   }



  optionsBySelectCountry(value){
    this.setState({country:value})
  }

  optionsBySelectCity(value){
    this.setState({selectedCity:value})
  }

  optionsBySelectCluster(value){
    this.setState({cluster:value})
  }
  optionsBySelectChapter(value){
    this.setState({chapter:value})
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
   /* const resp=this.createRegistration();
    return resp;*/
  }

/*  async handleError(response) {
    alert(response)
  };*/
/*  enteredUserName(){
     this.setState({"userName" : this.refs.email.value});
  }*/

/*  async handleSuccess(response) {

    //FlowRouter.go("/admin/settings/departmentsList");
    if (response){
      if(response.success)
        FlowRouter.go("/admin/transactions/registrationRequested");
      else
        toastr.error(response.result);
      FlowRouter.go("/admin/transactions/registrationRequested");
    }
  };*/
  render(){
    let MlActionConfig = [
      {
        showAction: true,
        actionName: 'save',
        handler: this.createRegistration.bind(this)
      },
  /*    {
        showAction: true,
        actionName: 'cancel',
        handler: null
      }*/
    ]

    let countryQuery=gql`query{
     data:fetchCountries {
        value:_id
        label:country
      }
    }`

   /* let stateQuery=gql` query($countryId:String){
      data:fetchStatesPerCountry(countryId:$countryId){label:name,value:_id}
    }
    `;
*/
    let citiesquery = gql`query($countryId:String){
      data:fetchCitiesPerCountry(countryId:$countryId){label:name,value:_id}
    }
    `;


    let clusterQuery=gql` query{
      data:fetchActiveClusters{label:countryName,value:_id}
    }
    `;
    let chapterQuery=gql`query($id:String){  
      data:fetchChapters(id:$id) {
        value:_id
        label:chapterName
      }  
    }`;


    let fetchcommunities = gql` query{
      data:fetchCommunityDefinition{label:name,value:code}
    }
    `;
/*
    let stateOption={options: { variables: {countryId:this.state.country}}};
    let cityOption={options: { variables: {stateId:this.state.state}}};*/
    let chapterOption={options: { variables: {id:this.state.cluster}}};
    let countryOption = {options: { variables: {countryId:this.state.country}}};

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

    let genderValues = [
      {value: 'male', label: 'Male'},
      {value: 'female', label: 'Female'},
      {value: 'others', label: 'Others'}
    ];

    let options3 = [
      {value: 'Yes', label: 'Yes'},
      {value: 'No', label: 'No'}
    ];

    return (

        <div className="admin_main_wrap">
          <h2>Create Registration</h2>
          <div className="col-md-6 nopadding-left">
            <div className="form_bg left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
              <form>
                <div className="form-group">
                  <input type="text" ref="firstName" placeholder="First Name"  className="form-control float-label" />
                </div>
                <div className="form-group">
                  <input type="text" ref="lastName" placeholder="Last Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Your Country"  selectedValue={this.state.country} queryType={"graphql"} query={countryQuery} isDynamic={true}  onSelect={this.optionsBySelectCountry.bind(this)} />
                </div>
                <div className="form-group">
                  <input type="text" ref="contactNumber"   placeholder="Contact number" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="email"   placeholder="Email ID" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={false} placeholder="Headquarter Location" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedCity} queryType={"graphql"} queryOptions={countryOption} query={citiesquery} onSelect={this.optionsBySelectCity.bind(this)} isDynamic={true}/>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">Operation Area</div>
                  <div className="panel-body">
                    <Moolyaselect multiSelect={false} placeholder="Select Cluster" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.cluster} queryType={"graphql"} query={clusterQuery}  isDynamic={true}  onSelect={this.optionsBySelectCluster.bind(this)} />
                    <Moolyaselect multiSelect={false} placeholder="Select Chapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapter} queryType={"graphql"} query={chapterQuery} reExecuteQuery={true} queryOptions={chapterOption}  isDynamic={true}  onSelect={this.optionsBySelectChapter.bind(this)} />
                    <div className="form-group">
                      <input type="text" placeholder="Source"  className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Device name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Device number"  className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="IP Address"  className="form-control float-label" id="" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="IP Location"  className="form-control float-label" id=""/>
                    </div>
                  </div>
                </div>
              </form>
              </ScrollArea>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
              <form>
                <div className="form-group">
                  <Moolyaselect multiSelect={false} placeholder="Registration Type" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.registrationType} queryType={"graphql"} query={fetchcommunities} onSelect={this.optionBySelectRegistrationType.bind(this)} isDynamic={true}/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="User name" ref="userName"  className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="Password" placeholder="Password" ref="password"  className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <Select name="form-field-name" placeholder="Account Type" value={this.state.subscription} options={subscriptionOptions} className="float-label" onChange={this.optionBySelectSubscription.bind(this)}/>
                </div>
                <div className="form-group">
                  <Select name="form-field-name"  placeholder="Do you want to associate to any of the institution" value={this.state.institutionAssociation}  options={options3} onChange={this.optionBySelectinstitutionAssociation.bind(this)} className="float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" ref="companyName" placeholder="Company Name"    className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="companyUrl" placeholder="Company URL"   className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="remarks" placeholder="Remarks"    className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <Select name="form-field-name" placeholder="How did you know about us" value={this.state.refered} options={referedOption} className="float-label" onChange={this.optionBySelectRefered.bind(this)}/>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">Process Status</div>
                  <div className="panel-body button-with-icon">
                    <button type="button" className="btn btn-labeled btn-success" >
                      <span className="btn-label"><FontAwesome name='key'/></span>Send OTP</button>
                    <button type="button" className="btn btn-labeled btn-success" >
                      <span className="btn-label"><span className="ml ml-email"></span></span>Send Email</button>
                    <button type="button" className="btn btn-labeled btn-success" >
                      <span className="btn-label"><FontAwesome name='bullhorn'/></span>Send Ann.Temp</button>
                  </div>
                </div>
              </form>
              </ScrollArea>
            </div>
          </div>
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        </div>
    )
  }
}

/*export default MoolyaCreateRegistation = formHandler()(MlCreateRegistration);*/

