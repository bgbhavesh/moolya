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
    {value: 'select', label: 'Do you want to associate to any institution'},
    {value: 'one', label: 'One'},
    {value: 'two', label: 'Two'}
];

export default class Step1 extends React.Component{
  constructor(props){
    super(props);
    this.state={
      country:'',
      cluster:'',
      chapter:'',
    }
    this.findRegistration.bind(this);
    return this;
  }
  componentWillMount() {
    const resp = this.findRegistration();
    return resp;
  }
  async findRegistration() {
    let registrationId = this.props.params;
    const response = await findRegistrationActionHandler(registrationId);
    this.setState({loading: false, data: response});
  }
componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
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
  optionBySelectRegistrationType(val){
    this.setState({registrationType:val.value})
  }
  optionBySelectSubscription(val){
    this.setState({subscription:val.value})
  }
  optionBySelectRefered(val){
    this.setState({refered:val.value})
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
                  <input type="text" placeholder="First Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Last Name" className="form-control float-label" id=""/>
                </div>
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Your Country"  selectedValue={this.state.country} queryType={"graphql"} query={countryQuery} isDynamic={true}  onSelect={this.optionsBySelectCountry.bind(this)} />
                <div className="form-group">
                  <input type="text" placeholder="Contact number" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email ID" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="City" className="form-control float-label" id=""/>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">Operation Area</div>
                  <div className="panel-body">
                    <Moolyaselect multiSelect={false} placeholder="Select Cluster" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.cluster} queryType={"graphql"} query={clusterQuery}  isDynamic={true}  onSelect={this.optionsBySelectCluster.bind(this)} />
                    <Moolyaselect multiSelect={false} placeholder="Select Chapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.chapter} queryType={"graphql"} query={chapterQuery} reExecuteQuery={true} queryOptions={chapterOption}  isDynamic={true}  onSelect={this.optionsBySelectChapter.bind(this)} />
                    <div className="form-group">
                      <input type="text" placeholder="Source" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Device name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Device number" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="IP Address" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="IP Location" className="form-control float-label" id=""/>
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
                  <input type="text" placeholder="User name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="Password" placeholder="Password" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <Select name="form-field-name" placeholder="Subscription Type" value={this.state.subscription} options={subscriptionOptions} className="float-label" onChange={this.optionBySelectSubscription.bind(this)}/>
                </div>
                <div className="form-group">
                  <Select name="form-field-name"value="select"options={options3} className="float-label"/>
                </div>
                <div className="form-group">
                  <input type="Password" placeholder="Company Name" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="Password" placeholder="Company URL" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="Password" placeholder="Remarks" className="form-control float-label" id=""/>
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
