import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ReactToastr from 'react-toastr'
export default class MlToaster extends Component {
  successToaster(message, heading, timeout) {
    this.refs.container.success(message, heading, { timeout });
  //  window.open("http://youtu.be/3SR75k7Oggg");
  }
  errorToaster(message, heading, timeout) {
    this.refs.container.error(message, heading, { timeout });
    //  window.open("http://youtu.be/3SR75k7Oggg");
  }
  infoToaster(message, heading, timeout) {
    this.refs.container.info(message, heading, { timeout });
    //  window.open("http://youtu.be/3SR75k7Oggg");
  }
  render() {
    const { ToastContainer } = ReactToastr;
    const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
    const message = this.props.message;
    const type = this.props.type
    const timeout = this.props.timeout
    const heading = this.props.heading;
    if (type == 'success') {
      /* let timeout=3000,heading="sucess Head" */
      this.successToaster(message, heading, timeout)
    } else if (type == 'error') {
      this.errorToaster(message, heading, timeout)
    } else if (type == 'info') {
      this.infoToaster(message, heading, timeout)
    }


    return (
      <div className="toaster-container">
        <ToastContainer
          ref="container"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right" />
      </div>


    )
  }
}
