/**
 * Created by mohammed.mohasin on 9/6/17.
 */
import React from 'react';
import { render } from 'react-dom';
import { inquiryActionHandler } from '../actions/inquiryActionHandler';
export default class Inquiry extends React.Component {
  constructor(props) {
    super(props);
    return this;
  }

  async inquiryHandler() {
    const resourceDetails = this.props.data || {};
    const subject = this.refs.subject.value && this.refs.subject.value.trim() !== '' ? this.refs.subject.value.trim() : null;
    const message = this.refs.message.value && this.refs.message.value.trim() !== '' ? this.refs.message.value.trim() : null;
    const response = await inquiryActionHandler({
      resourceId: resourceDetails.resourceId, resourceType: resourceDetails.resourceType, subject, message
    });

    if (response && response.success) {
      toastr.success(response.result);
    } else {
      toastr.error('Failed to send the enquiry');
    }
    this.props.toggle();
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <input type="text" ref='subject' placeholder="subject" className="form-control float-label"/>
        </div>
        <div className="form-group">
          <textarea placeholder="message" ref='message' className="form-control float-label"></textarea>
        </div>
        <div className="ml_btn">
          <a href="" className="save_btn" onClick={this.inquiryHandler.bind(this)}>Send</a>
          <a href="" className="cancel_btn" onClick={this.props.toggle}>Cancel</a>
        </div>
      </div>

    );
  }
}
