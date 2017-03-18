import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
var Select = require('react-select');
import Moolyaselect from '../../../../commons/components/select/MoolyaSelect'
import {findRegistrationActionHandler} from '../actions/findRegistration'
import ScrollArea from 'react-scrollbar';

var FontAwesome = require('react-fontawesome');
var options3 = [
    {value: 'Yes', label: 'Yes'},
    {value: 'No', label: 'No'}
];

export default class Step1 extends React.Component{
  constructor(props){
    super(props);
    this.state={
      country:'',
      cluster:'',
      chapter:'',
      selectedCity:'',
      registrationId:'',
      registrationDetails:'',
      instituteAssociation:'',
      subscription:'',
      registrationType:'',
      refered:''

    }
    this.findRegistration.bind(this);
    return this;
  }
  componentWillMount() {
    const resp=this.findRegistration();
    return resp;
  }
  async findRegistration() {
    const response = await findRegistrationActionHandler(this.state.registrationId);
    console.log(response)
    this.setState({loading: false, registrationDetails: response});
    return response;
  }

componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
    this.setState({loading: false, registrationId:this.props.registrationId});

  }
  optionsBySelectCountry(val){
      this.setState({country:val})
  }
  optionsBySelectCluster(val){
    this.setState({cluster:val})
  }
  optionsBySelectChapter(val){
    this.setState({chapter:val})
  }
  optionsBySelectCity(value){
    this.setState({selectedCity:value})
  }
  optionBySelectRegistrationType(val){
    this.setState({registrationType:val.value})
  }
  optionBySelectSubscription(val){
    this.setState({subscription:val.value})
  }
  optionBySelectRefered(val){
    this.setState({refered:val.value})
  }
  async  updateregistrationInfo() {
    let Details = {
      id : this.props.config,
      registrationDetail:{
      firstName       :  this.refs.firstName.value,
      lastName        :  this.refs.lastName.value,
      countryName     :  this.state.country,
      contactNumber   :  this.refs.contactNumber.value,
      email           :  this.refs.email.value,
      cityId          :  this.state.selectedCity,
      registrationType:  this.state.registrationType,
      userName        :  this.refs.userName.value,
      password        :  this.refs.password.value,
      accountType     :  this.state.subscription,
      institutionAssociation    :   this.state.instituteAssociation,
      companyName     :  this.refs.companyName.value,
      companyUrl      :  this.refs.companyUrl.value,
      remarks         :  this.refs.remarks.value,
      referralType    :  this.state.refered,
      clusterId       :  this.state.cluster,
      chapterId       :  this.state.chapter
    }
    }
    const response = await updateRegistrationActionHandler(Details);
    return response;
  }
  render(){

  let countryQuery=gql`query{
 data:fetchCountries {
    value:_id
    label:country
  }
}`
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
    let citiesquery = gql`query{
  data:fetchCities {label:name,value:_id
  }
}
`;
    let chapterOption={options: { variables: {id:this.state.cluster}}};
    let registrationOptions = [
      { value: '0', label: 'simplybrowsing' },
      { value: '1', label: 'ideator' },
      { value: '2', label: 'startup' },
      { value: '3', label: 'company' },
      { value: '4', label: 'funder/investor' },
      { value: '5', label: 'institution' },
      { value: '6', label: 'service provider' },
      { value: '7', label: 'iam not sure' },
    ];

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
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Date & Time" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Request ID" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="firstName" placeholder="First Name" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.firstName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="lastName" placeholder="Last Name" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.lastName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Your Country"  selectedValue={this.state.country} queryType={"graphql"} query={countryQuery} isDynamic={true}  onSelect={this.optionsBySelectCountry.bind(this)} />
                </div>
                <div className="form-group">
                  <input type="text" ref="contactNumber" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.contactNumber}  placeholder="Contact number" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="emailId" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.emailId}  placeholder="Email ID" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <Moolyaselect multiSelect={false} placeholder="Headquarter Location" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedCity} queryType={"graphql"} query={citiesquery} onSelect={that.optionsBySelectCity.bind(this)} isDynamic={true}/>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">Operation Area</div>
                  <div className="panel-body">
                    <Moolyaselect multiSelect={false} placeholder="Select Cluster" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.cluster} queryType={"graphql"} query={clusterQuery}  isDynamic={true}  onSelect={this.optionsBySelectCluster.bind(this)} />
                    <Moolyaselect multiSelect={false} placeholder="Select Chapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapter} queryType={"graphql"} query={chapterQuery} reExecuteQuery={true} queryOptions={chapterOption}  isDynamic={true}  onSelect={this.optionsBySelectChapter.bind(this)} />
                    <div className="form-group">
                      <input type="text" placeholder="Source" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.source}  className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Device name" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.deviceName} className="form-control float-label" id="" disabled="true"/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Device number" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.deviceNumber} className="form-control float-label" id="" disabled="true"/>
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
                  <Select name="form-field-name" placeholder="Choose registration type" value={this.state.registrationType} options={registrationOptions} className="float-label" onChange={this.optionBySelectRegistrationType.bind(this)}/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="User name" ref="userName" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.userName}  className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="Password" placeholder="Password" ref="password" defaultValue={that.state.registrationDetails&&that.state.registrationDetails.password} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <Select name="form-field-name" placeholder="Account Type" value={this.state.subscription} options={subscriptionOptions} className="float-label" onChange={this.optionBySelectSubscription.bind(this)}/>
                </div>
                <div className="form-group">
                  <Select name="form-field-name"  placeholder="Do you want to associate to any of the institiotion" value={this.state.subscription}  options={options3} className="float-label"/>
                </div>
                <div className="form-group">
                  <input type="text" ref="companyName" placeholder="Company Name"  defaultValue={that.state.registrationDetails&&that.state.registrationDetails.companyName}  className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="companyUrl" placeholder="Company URL"  defaultValue={that.state.registrationDetails&&that.state.registrationDetails.companyUrl}  className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" ref="remarks" placeholder="Remarks"  defaultValue={that.state.registrationDetails&&that.state.registrationDetails.remarks}  className="form-control float-label" id=""/>
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
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};
