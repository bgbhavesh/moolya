/**
 * Service term and condition component
 * @Author :: Mukhil P
 * @Dated :: 19/06/2017
 */

// import NPM module(s)
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

// import custom method(s) and component(s)
import ScrollArea from 'react-scrollbar';


export default class MlAppServiceTermsAndConditions extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(290+$('.admin_header').outerHeight(true)));
  }

  /**
   * Method :: getAttachmentsList
   * Desc :: Get the attachmentlist for a service
   * @return {XML}
   */
  getAttachmentsList() {
    const {serviceTermAndCondition, attachments, saveDetails} = this.props;
    const attachmentDetails = attachments && attachments.length > 0 ?
      attachments.map(function(value , index){
      return(
        <div className="col-md-6 nopadding-left" key={index}>
          <div className="panel panel-default">
            <div className="panel-heading">
              Attachment {index + 1}
            </div>
            <div className="panel-body">
              <form>
                <div className="form-group">
                  <input placeholder="Document name" className="form-control float-label" value={value.name} disabled />
                </div>
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="Info" value={value.info} disabled></textarea>
                </div>
                <div className="input_types">
                  <input id="checkbox" type="checkbox" name="checkbox" checked={value.isMandatory}disabled /><label htmlFor="checkbox"><span><span></span></span>Is Mandatory</label>
                </div>
                <br className="brclear"/>
              </form>
            </div>
          </div>
        </div>
      )
    }) : [];
    return attachmentDetails;
  }

  /**
   * Method :: React render
   * Desc :: Showing html page
   * @returns {XML}
   */
  render(){
    const {
      serviceTermAndCondition,
      attachments,
      saveService,
      onChangeCheckBox,
      onChangeValue } = this.props;
    console.log('----step--3--props--', this.props.serviceTermAndCondition);
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group switch_wrap switch_names inline_switch">
                  <label htmlFor="cancelable">Cancelation is Applicable</label>
                  <span className={serviceTermAndCondition.isCancelable ? 'state_label acLabel' : 'state_label'}>Yes</span><label className="switch nocolor-switch">
                  <input id="cancelable" type="checkbox"
                         checked={!serviceTermAndCondition.isCancelable}
                         value={serviceTermAndCondition.isCancelable}
                         onChange={(event) => onChangeCheckBox(event)} />
                  <div className="slider"></div>
                </label>
                  <span className={serviceTermAndCondition.isCancelable ? 'state_label' : 'state_label acLabel'}>No</span>
                </div>
                <div className="form-group switch_wrap switch_names inline_switch">
                  <label htmlFor="schedulable">Is Reschedule allowable</label>
                  <span className={serviceTermAndCondition.isReschedulable ? 'state_label acLabel' : 'state_label'}>Yes</span><label className="switch nocolor-switch">
                  <input id="schedulable" type="checkbox"
                         checked={!serviceTermAndCondition.isReschedulable}
                         value={serviceTermAndCondition.isReschedulable}
                         onChange={(event) => onChangeCheckBox(event)} />
                  <div className="slider"></div>
                </label>
                  <span className={serviceTermAndCondition.isReschedulable ? 'state_label' : 'state_label acLabel'}>No</span>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <label>Days before cancelation
                    <input className="form-control inline_input medium_in"
                           id="cancelationday"
                           disabled={!serviceTermAndCondition.isCancelable}
                           value={serviceTermAndCondition.noOfDaysBeforeCancelation}
                           onChange={(event) => onChangeValue(event)} />
                  </label>
                </div>
                <br className="brclear"/>
                <div className="form-group">
                  <label>How many times <input className="form-control inline_input medium_in"
                                               id="rescheduler"
                                               disabled={!serviceTermAndCondition.isReschedulable}
                                               onChange={(event) => onChangeValue(event)}
                                               value={serviceTermAndCondition.noOfReschedulable}  />
                  </label>
                </div>
              </form>
            </div>
          </div>
          <br className="brclear"/>
          {this.getAttachmentsList()}
        </ScrollArea>
        {!this.props.viewMode?<div className="ml_btn" style={{'textAlign':'center'}}>
          <div className="save_btn" onClick={() => saveService()}>Save</div> <div className="cancel_btn">Cancel</div>
        </div>:""}
      </div>
    )
  }
};
