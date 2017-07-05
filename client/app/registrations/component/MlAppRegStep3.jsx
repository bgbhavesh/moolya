import React from "react";
import {render} from "react-dom";
import {initalizeFloatLabel} from "../../../admin/utils/formElemUtil";
import ScrollArea from "react-scrollbar";
import {graphql} from "react-apollo";
import MlAppRegContactDetails from "./MlAppRegContactDetails";
import MlAppRegAddressDetails from "./MlAppRegAddressDetails";
import MlAccordion from "../../../app/commons/components/MlAccordion";
import MlAppActionComponent from "../../../app/commons/components/MlAppActionComponent";
import MlAppRegEmailDetails from "./MlAppRegEmailDetails";
// import MlActionComponent from "../../../commons/components/actions/ActionComponent";
var FontAwesome = require('react-fontawesome');
export default class MlAppRegStep3 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      contactNumber: [{numberType: '', countryCode: '', contactNumber: ''}, {
        numberType: 'Test',
        countryCode: '',
        contactNumber: ''
      }],
      registerId: this.props.registrationId,
      registrationDetails: this.props.registrationData,


    }

    return this;
  }

  componentWillMount() {

    this.setState({
      contactNumber: [{numberType: '', countryCode: '', contactNumber: ''}, {
        numberType: 'Test',
        countryCode: '',
        contactNumber: ''
      }]
    })
  }

  componentDidMount() {
    var WinHeight = $(window).height();
    //$('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
    $('.left_wrap').height(WinHeight - (160 + $('.admin_header').outerHeight(true)));
    this.props.getRegistrationContactDetails();
    initalizeFloatLabel();


  }

  /* componentWillReceiveProps(nextProps){
   this.getRegistrationContactInfo();
   }*/
  async getRegistrationContactInfo() {

    const resp = this.props.getRegistrationContactDetails();
    this.setState({'registrationDetails': this.props.registrationData});
  }

  render() {
    let MlActionConfig
    let userType = this.props.userType;

    let appActionConfig = [
      {
        showAction: true,
        actionName: 'exit',
        handler: null
      }
    ]

    export const genericPortfolioAccordionConfig = {
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

                  <MlAppRegContactDetails registerId={this.state.registerId}
                                          registrationInfo={this.state.registrationDetails}
                                          registrationDetails={this.props.getRegistrationContactDetails}
                                          clusterId={this.props.clusterId}/>
                </div>
                <div className="panel panel-default new_profile_tabs">
                  <div className="panel-heading">
                    Email ID
                  </div>
                  <MlAppRegEmailDetails registerId={this.state.registerId}
                                        registrationInfo={this.state.registrationDetails}
                                        registrationDetails={this.props.getRegistrationContactDetails}
                                        clusterId={this.props.clusterId}/>
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
                  <MlAppRegAddressDetails registerId={this.state.registerId}
                                          getRegistrationContactInfo={this.getRegistrationContactInfo.bind(this)}
                                          registrationInfo={this.state.registrationDetails}
                                          registrationDetails={this.props.getRegistrationContactDetails}
                                          clusterId={this.props.clusterId}/>
                </div>
              </form>
            </ScrollArea>

          </div>
        </div>

        {/*<MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>*/}
        <MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} />

      </div>
    )
  }
};
