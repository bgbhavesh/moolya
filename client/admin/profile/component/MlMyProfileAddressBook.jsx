
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import {initalizeFloatLabel} from '../../utils/formElemUtil';
import {getContactDetails} from '../actions/getAddressBookAction'

import ScrollArea from 'react-scrollbar'
import  ContactDetails from './MlMyProfileContactDetails';
import AddressDetails from './mlRegistrationAddressDetails'
import EmailDetails from './mlRegistrationEmailDetails'

export default class Step3 extends React.Component{

  constructor(props){
    super(props);
    this.state={
      selectedValue : null,
      contactNumber:[{numberType: '',countryCode:'',contactNumber:''},{numberType: 'Test',countryCode:'',contactNumber:''}],
      registerId : " ",
      registrationDetails:" ",
      clusterId : 'opa3eg2mFPnTaK3mw'

    }
    //this.getContents.bind(this);

    return this;
  }
    componentWillMount(){
     // this.setState({contactNumber:[{numberType: '',countryCode:'',contactNumber:''},{numberType: 'Test',countryCode:'',contactNumber:''}]})
      // this.setState({'registrationDetails':this.props.registrationData});
      const resp = this.getContents();
      return resp;

  }


  async getContents(){
      const userId = Meteor.userId();
      let response = await getContactDetails (userId);
      this.setState({registrationDetails:response});
      return response;
  }

  componentDidMount()
  {
    var WinHeight = $(window).height();
    //$('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
    $('.left_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
    //this.props.getRegistrationContactDetails();
    initalizeFloatLabel();


  }
  /* componentWillReceiveProps(nextProps){
   this.getRegistrationContactInfo();
   }*/
  async getRegistrationContactInfo(){

   // const resp=this.props.getRegistrationContactDetails();
   //this.setState({'registrationDetails':this.props.registrationData});
    const resp = this.getContents();
    return resp;
  }

  render(){
    return (

<div className="admin_main_wrap">
  <div className="admin_padding_wrap">
    <h2>Address book</h2>
    <div className="main_wrap_scroll">
    <ScrollArea
      speed={0.8}
      className="main_wrap_scroll"
      smoothScrolling={true}
      default={true}
    >
    <div className="row">
    <div className="col-lg-6 ">

          <form>
            <div className="panel panel-default new_profile_tabs">
              <div className="panel-heading">
                Contact Number
              </div>

              <ContactDetails registerId={this.state.registerId} registrationInfo={this.state.registrationDetails} registrationDetails={this.props.getRegistrationContactDetails} clusterId={this.state.clusterId}/>
            </div>
            <div className="panel panel-default new_profile_tabs">
              <div className="panel-heading">
                Email ID
              </div>
              <EmailDetails registerId={this.state.registerId} registrationInfo={this.state.registrationDetails} registrationDetails={this.props.getRegistrationContactDetails} clusterId={this.state.clusterId}/>
            </div>
          </form>

    </div>


    <div className="col-lg-6 ">


      <form>
      <div className="panel panel-default new_profile_tabs">
      <div className="panel-heading">
      Address
      </div>
      <AddressDetails registerId={this.state.registerId} getRegistrationContactInfo={this.getRegistrationContactInfo.bind(this)} registrationInfo={this.state.registrationDetails} registrationDetails={this.props.getRegistrationContactDetails} clusterId={this.state.clusterId}/>
  </div>
    </form>


    </div>
    </div>
    </ScrollArea>
    </div>
  </div>
</div>



  )
  }
};
