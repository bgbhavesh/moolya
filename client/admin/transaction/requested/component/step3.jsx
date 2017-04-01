import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar'
import  Select from 'react-select';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import  ContactDetails from './contactDetails';
import AddressDetails from '../component/mlRegistrationAddressDetails'
import EmailDetails from '../component/mlRegistrationEmailDetails'

export default class Step3 extends React.Component{

  constructor(props){
    super(props);
    this.state={
      selectedValue : null,
      contactNumber:[{numberType: '',countryCode:'',contactNumber:''},{numberType: 'Test',countryCode:'',contactNumber:''}],
      registerId : this.props.registrationId,
      registrationDetails:this.props.registrationInfo,


    }

    return this;
  }
  componentWillMount(){

    this.setState({contactNumber:[{numberType: '',countryCode:'',contactNumber:''},{numberType: 'Test',countryCode:'',contactNumber:''}]})
  }
  componentDidMount()
  {
    var WinHeight = $(window).height();
    //$('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
    $('.left_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
    this.props.getRegistrationContactDetails();


  }
 /* componentWillReceiveProps(nextProps){
    this.getRegistrationContactInfo();
  }*/
  async getRegistrationContactInfo(){

    const resp=this.props.getRegistrationContactDetails();
    this.setState({'registrationDetails':this.props.registrationInfo});
  }

  render(){
    return (
      <div className="step_form_wrap step3">

          <div className="col-lg-6 nopadding-left">
            <div className="form_bg left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
                <form>
                  <div className="panel panel-default new_profile_tabs">
                    <div className="panel-heading">
                      Contact Number
                    </div>

                    <ContactDetails registerId={this.state.registerId} registrationInfo={this.state.registrationDetails} registrationDetails={this.props.getRegistrationContactDetails} clusterId={this.props.clusterId}/>
                  </div>
                  <div className="panel panel-default new_profile_tabs">
                    <div className="panel-heading">
                      Email ID
                    </div>
                    <EmailDetails registerId={this.state.registerId} registrationInfo={this.state.registrationDetails} registrationDetails={this.props.getRegistrationContactDetails} clusterId={this.props.clusterId}/>
                  </div>
                </form>
              </ScrollArea>
            </div>
          </div>


          <div className="col-lg-6 nopadding-right">
            <div className="form_bg left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
              <form>
                <div className="panel panel-default new_profile_tabs">
                  <div className="panel-heading">
                    Address
                  </div>
                  <AddressDetails registerId={this.state.registerId} getRegistrationContactInfo={this.getRegistrationContactInfo.bind(this)} registrationInfo={this.state.registrationDetails} registrationDetails={this.props.getRegistrationContactDetails} clusterId={this.props.clusterId}/>
                </div>
              </form>
              </ScrollArea>
            </div>

          </div>



      </div>
    )
  }
};
