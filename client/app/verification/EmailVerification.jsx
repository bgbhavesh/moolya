import React from 'react';
import {verifyEmailHandler,verifyMobileNumberHandler} from '../../commons/verificationActionHandler';
import MlLoader from '../../commons/components/loader/loader'
import {appClient} from '../core/appConnection';
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
    //this.verifyEmail.bind(this);
    this.verifyMobileNumber.bind(this);
  }

   /*
    verify-email flow changed.
   */
  async componentWillMount()
  {
    //const resp=await this.verifyEmail(this.props.token);
    let token = FlowRouter.getParam('token');
    let data={token:token};
    var header={ apiKey: "741432fd-8c10-404b-b65c-a4c4e9928d32"};
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: Meteor.absoluteUrl('verifyEmail'),
      data :JSON.stringify(data),
      headers: header,
      contentType: "application/json; charset=utf-8",
      success:function(response){
        console.log(response);
        if(response.success){
          resp = JSON.parse(response.result);
          this.setState({loading:false,emailVerificationSuccess:resp.emailVerified,email:resp.email,mobileNumber:resp.mobileNumber});
        } else {
          this.setState({loading:false,emailVerificationSuccess:false,emailVerificationMessage:response.result});
        }
      }.bind(this)
    });
  }

 /* async verifyEmail(token){
    const response=await verifyEmailHandler(token,appClient);
    let resp=null;
    if(response.success){
      resp = JSON.parse(response.result);
      this.setState({loading:false,emailVerificationSuccess:resp.emailVerified,email:resp.email,mobileNumber:resp.mobileNumber});
    }else{
      this.setState({loading:false,emailVerificationSuccess:false,emailVerificationMessage:response.result});
    }
    return response;
  }*/

  async verifyMobileNumber(){
    let mobileNumber=this.state.mobileNumber;
    let otp=this.refs.otpValue.value;
    const response=await verifyMobileNumberHandler(mobileNumber,otp,appClient);
    let resp=null;
    if(response.success){
      resp = JSON.parse(response.result);
      this.setState({mobileNumberVerified:resp.mobileNumberVerified});
    }else{
      this.setState({mobileNumberVerified:false});
    }
    return response;
  }

  render(){

     let mobileNumber=this.state.mobileNumber||"";
     let emailVerificationSuccess=this.state.emailVerificationSuccess;
     let mobileNumberVerificationSuccess=this.state.mobileNumberVerified;
     const showLoader=this.state.loading;
    return (
      <div>
      {showLoader===true?( <MlLoader/>):(
      <div className="app_main_wrap email-bg">
        <div className="" style={{'width': '600px','marginLeft': '132px'}}>
          <div className="email-body">
            {!mobileNumberVerificationSuccess&&emailVerificationSuccess&&
              <div>
              <img src="../images/success_icon.png" /><br />
              <h2 style={{'marginBottom':'20px'}}>Congratulations!!</h2>
             {/*  You have successfully verified your account. You will be notified once your profile is activated.<br /><br />
                Until then, don't miss to check our&nbsp;<a href="https://blog.moolya.in" style={{'color':'#ef4647'}}>blog</a>*/}
                <p style={{'fontSize':'24px'}}>Thank you for your time. Your email id has been verified.<br />
                We will keep you posted on the next steps once <span className="m_red">m</span><span className="m_yel">oo</span><span className="m_red">lya</span> app is ready in the next few weeks.<br/><br/>
                  Good day and God speed to all your efforts.</p>
              {/*<div className="form-group">
                <input type="text"  value={mobileNumber} className="form-control sendotp float-label" disabled id="mobileNumber"/>
              </div>
              <div className="form-group sendotp">
                <input type="text" ref="otpValue" placeholder="Enter OTP" className="form-control float-label"/>
                <a href="#" className="resendotp">Resend OTP</a>
              </div><br />
              <a href="#" className="save_btn" onClick={this.verifyMobileNumber.bind(this)}>Verify Now</a>*/}
              </div>
            }
            {!emailVerificationSuccess&&<div>
              <img src="../images/fail_icon.png" /><br /> <h2 style={{'marginBottom':'20px'}}>Expired!</h2>
              <p style={{'fontSize':'24px'}}>Your verification link has expired.<br/>Please contact us at <a style={{'color':'#ef4647'}} href="mailto:startup@moolya.in"> startup@moolya.in</a>, if required.</p>
              {/*<a href="/login" className="save_btn" >Login</a>*/}
             </div>}

            {/*{mobileNumberVerificationSuccess&&
            <div>
              <img src="../images/success_icon.png" /><br />
              <h2>Congratulations</h2>
              You have successfully verified your account. You will be notified once your profile is activated<br /><br />
              <a href="/login" className="save_btn" >Login</a>
            </div>
            }*/}


          </div>
        </div>
      </div>)}
      </div>
    )
  }
};

