/**
 * Created by Mukhil on 19/6/17.
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import {updateServiceActionHandler, fetchServiceActionHandler} from'../actions/MlServiceActionHandler'


export default class MlAppServiceTermsAndConditions extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      mandatory: "",
      cancellation: "",
      reschedule: "",
      refund: "",
      attachment: [{
        name:"",
      }],
      documentName:"",
      information:""
    }
    this.getDetails.bind(this)
  }
  componentDidMount()
  {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(290+$('.admin_header').outerHeight(true)));
  }

  componentWillMount() {
    this.getDetails();
  }

  async getDetails() {
    let id = FlowRouter.getQueryParam('id')
    const response = await fetchServiceActionHandler(id)
    console.log(response)
    this.setState({
      documentName:response.attachments.name,information:response.attachments.info,
      mandatory:response.attachments.isMandatory,cancellation:response.termsAndCondition.isCancelable,
      refund:response.termsAndCondition.isRefundable,reschedule:response.termsAndCondition.isReschedulable,
      time:response.termsAndCondition.noOfReschedulable
    })
    this.getDetails();
  }

  async saveDetails() {
     let attachments = {
       name:this.state.documentName,
       info:this.state.information,
       isMandatory:this.state.mandatory
     }
     let termsAndCondition = {
       isCancelable:this.state.cancellation,
       isRefundable:this.state.refund,
       isReschedulable:this.state.reschedule,
       noOfReschedulable:this.state.time
     }
     let service ={
       attachments:attachments,
       termsAndCondition:termsAndCondition
     }
    let id = FlowRouter.getQueryParam('id')
    const resp = await updateServiceActionHandler(id,service)
    return resp
  }
  information(e) {
    let value = e.target.value;
    this.setState({information:value})
  }
  documentName(e) {
    let value = e.target.value;
    this.setState({documentName:value})
  }
  cancellationApplicable(e) {
    let cancel = e.target.checked;
    this.setState({cancellation:cancel})
  }
  rescheduleApplicable(e) {
    let reschedule = e.target.checked;
    this.setState({reschedule:reschedule})
  }
  refundAmount(e) {
    let refund = e.target.checked;
    this.setState({refund:refund})
  }
  isMandatory(e) {
    let mandate = e.target.checked;
    this.setState({mandatory:mandate})
  }
  times(e) {
    if(e.currentTarget.value >= 0) {
      this.setState({"time":e.currentTarget.value});
    } else {
      this.setState({"time":0});
    }
  }
  addComponent() {
    let attachments = this.state.attachment;
    attachments.push({});
    this.setState({
      attachment:attachments
    });
  }

  removeComponent(){
    let attachments = this.state.attachment;
    attachments.pop({})
    this.setState({attachment:attachments})
  }

  render(){
    let that = this;
    let attachmentsArray = that.state.attachment || []
    const attachments = attachmentsArray.map(function(value , index){
        return(
          <div className="col-md-6 nopadding-left">
            <div className="panel panel-default">
              <div className="panel-heading">
                Attachment 1
                <span className="see-more pull-right"><a href=""><FontAwesome name='plus' onClick={that.addComponent.bind(that)}/><FontAwesome name='minus' onClick={that.removeComponent.bind(that)}/></a></span>
              </div>
              <div className="panel-body">
                <form>
                  <div className="form-group">
                    <input placeholder="Document name" className="form-control float-label" value={that.state.documentName} onChange={that.documentName.bind(that)}/>
                  </div>
                  <div className="form-group">
                    <textarea className="form-control float-label" placeholder="Info" value={that.state.information} onChange={that.information.bind(that)}></textarea>
                  </div>
                  <div className="input_types">
                    <input id="checkbox" type="checkbox" name="checkbox" value={that.state.mandatory} onChange={that.isMandatory.bind(that)}/><label htmlFor="checkbox"><span><span></span></span>Is Mandatory</label>
                  </div>
                  <br className="brclear"/>
                </form>
              </div>
            </div>
          </div>
        )
    })


    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group switch_wrap switch_names inline_switch">
                  <label>Cancelation is Applicable</label>
                  <span className="state_label">Yes</span><label className="switch nocolor-switch">
                  <input type="checkbox" value={that.state.cancellation} onChange={that.cancellationApplicable.bind(that)} />
                  <div className="slider"></div>
                </label>
                  <span className="state_label acLabel">No</span>
                </div>
                <div className="form-group switch_wrap switch_names inline_switch">
                  <label>Is Reschedule allowable</label>
                  <span className="state_label">Yes</span><label className="switch nocolor-switch">
                  <input type="checkbox" value={that.state.reschedule} onChange={that.rescheduleApplicable.bind(that)}  />
                  <div className="slider"></div>
                </label>
                  <span className="state_label acLabel">No</span>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group switch_wrap switch_names inline_switch">
                  <label>Refund of Amount</label>
                  <span className="state_label">Yes</span><label className="switch nocolor-switch">
                  <input type="checkbox" value={that.state.refund} onChange={that.refundAmount.bind(that)}   />
                  <div className="slider"></div>
                </label>
                  <span className="state_label acLabel">No</span>
                </div>
                <br className="brclear"/>
                <div className="form-group">
                  <label>How many times <input className="form-control inline_input medium_in" onChange={(e)=>that.times(e)} value={that.state.time}  /> </label>
                </div>
              </form>
            </div>
          </div>
          <br className="brclear"/>
          {attachments}
        </ScrollArea>
        <div className="ml_btn" style={{'textAlign':'center'}}>
          <div className="save_btn" onClick={that.saveDetails.bind(that)}>Save</div> <div className="cancel_btn">Cancel</div>
        </div>
      </div>
    )
  }
};
