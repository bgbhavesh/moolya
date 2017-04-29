import React from 'react';
import { render } from 'react-dom';
import {verifyEmailHandler} from '../../verificationActionHandler';

export default class EmailVerification extends React.Component{

  constructor(props){
    super(props);
    this.state={
      emailVerificationSuccess:false,
      email:"",
      mobileNumber:"",
      mobileNumberVerified:false,
      loading:true
    }
    this.verifyEmail.bind(this);
  }


  async componentWillMount()
  {
    const resp=await this.verifyEmail(this.props.token);
  }

  async verifyEmail(token){
    const response=await verifyEmailHandler(token);
    let resp=null;
    if(response.success){
      resp = JSON.parse(response.result);
      this.setState({loading:false,emailVerificationSuccess:resp.emailVerified,email:resp.email,mobileNumber:resp.mobileNumber});
    }else{
      this.setState({loading:false,emailVerificationSuccess:false,emailVerificationMessage:response.result});
    }
    return response;
  }

  render(){

     let mobileNumber=this.state.mobileNumber||"";
     let emailVerificationSuccess=this.state.emailVerificationSuccess;
     const showLoader=this.state.loading;
    return (
      <div>
      {showLoader===true?( <div className="loader_wrap"></div>):(
      <div className="app_main_wrap email-bg">
        <div className="col-md-3 col-md-offset-3">
          <div className="email-body">
            {emailVerificationSuccess&&
              <div>
              <img src="../images/success_icon.png" /><br />
              <h2>Congratulations</h2>
               You have successfully verified your account. You will be notified once your profile is activated<br /><br />
              <div className="form-group">
                <input type="text"  value={mobileNumber} className="form-control sendotp float-label" disabled id="mobileNumber"/>
              </div>
              <div className="form-group sendotp">
                <input type="text" placeholder="Enter OTP" className="form-control float-label" id=""/>
                <a href="#" className="resendotp">Resend OTP</a>
              </div><br />
              <a href="#" className="save_btn">Verify Now</a>
              </div>
            }

          </div>
        </div>
      </div>)}
      </div>
    )
  }
};
