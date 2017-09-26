import React from 'react';
import {verifyEmailHandler,verifyMobileNumberHandler, resendSmsOtpHandler} from '../../commons/verificationActionHandler';
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
      loading:true,
      canResend:false
    }
    //this.verifyEmail.bind(this);
    this.verifyMobileNumber.bind(this);
    this.resendSmsOTP.bind(this);
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
 componentDidMount(){
   setTimeout(function(){
     this.setState({canResend:true})
   }.bind(this),30000)
 }

  async verifyMobileNumber(){
    let mobileNumber=this.state.mobileNumber;
    let otp=this.refs.otpValue.value;
    let isTermsChecked= this.refs.isTermsChecked.checked;
    if(isTermsChecked && otp) {
      const response=await verifyMobileNumberHandler(mobileNumber,otp,appClient);
      let resp=null;
      if(response.success){
        resp = JSON.parse(response.result);
        this.setState({mobileNumberVerified:resp.mobileNumberVerified});
      }else{
        toastr.error(response.result);
        this.setState({mobileNumberVerified:false});
      }
      return response;
    }else{
      if(!isTermsChecked){
        toastr.error("Please agree to the Terms and Conditions and 'Privacy Policy'");
      }
      if(!otp){
        toastr.error("Please enter OTP");
      }
    }
  }
  async resendSmsOTP(){
    if(this.state.canResend){
      let mobileNumber=this.state.mobileNumber;
      const response=await resendSmsOtpHandler(mobileNumber, appClient);
      if(response.success){
        toastr.success("OTP Sent Successfuly");
      }else{
        toastr.error("Resend OTP failed");
      }
      return response;
    }
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
              <h3 style={{'marginBottom':'20px'}}>Congratulations!!</h3>
             {/*  You have successfully verified your account. You will be notified once your profile is activated.<br /><br />
                Until then, don't miss to check our&nbsp;<a href="https://blog.moolya.in" style={{'color':'#ef4647'}}>blog</a>*/}
                <p style={{'fontSize':'24px'}}>Thank you for your time. Your email id has been verified.<br />
                We will keep you posted on the next steps once <span className="m_red">m</span><span className="m_yel">oo</span><span className="m_red">lya</span> app is ready in the next few weeks.<br/><br/>
                  Good day and God speed to all your efforts.</p>
              <div className="form-group">
                <input type="text"  value={mobileNumber} className="form-control sendotp float-label" disabled id="mobileNumber"/>
              </div>
              <div className="form-group sendotp">
                <input type="text" ref="otpValue" placeholder="Enter OTP" className="form-control float-label"/>
                <a href="" className="resendotp" onClick={this.resendSmsOTP.bind(this)}>Resend OTP</a>
              </div><br />
                <div className="terms">
                  <label><input type="checkbox" ref="isTermsChecked"/>&nbsp; I have read and agree to the <a data-toggle="modal" data-target=".termsConditionsPop">Terms and Conditions</a> and <a data-toggle="modal" data-target=".privacyPop"> 'Privacy Policy'</a></label>
                </div>
              <a href="" className="save_btn" onClick={this.verifyMobileNumber.bind(this)}>Verify Now</a>
              </div>
            }
            {!emailVerificationSuccess&&<div>
              <img src="../images/fail_icon.png" /><br /> <h2 style={{'marginBottom':'20px'}}>Expired!</h2>
              <p style={{'fontSize':'24px'}}>Your verification link has expired.<br/>Please contact us at <a style={{'color':'#ef4647'}} href="mailto:startup@moolya.in"> startup@moolya.in</a>, if required.</p>
              {/*<a href="/login" className="save_btn" >Login</a>*/}
             </div>}

            {mobileNumberVerificationSuccess&&
              <div>
                <img src="../images/success_icon.png" /><br />
                <h2>Congratulations</h2>
                You have successfully verified your account. You will be notified once your profile is activated<br /><br />
                <a href="/login" className="save_btn" >Login</a>
              </div>
            }
          </div>
        </div>
      </div>)}

        <div className="modal fade bs-example-modal-sm library-popup termsConditionsPop"
             onContextMenu={(e) => e.preventDefault()} tabindex="-1" role="dialog"
             aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                Terms & Conditions
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                  aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">

                  <div className="blank_content" style={{'height':'400px','overflow':'auto','padding':'0px 5px'}}>
                    <h5>Introduction</h5>
                    <p>
                      These Standard Terms and Conditions written on this webpage shall manage your use of this website and the related mobility applications (hereby jointly called as ‘Website’ for the entire course of the document). These Terms and Conditions will be applied fully and affect your use of this Website. By using this Website, you agree and agree to abide by all terms and conditions written in here as well as the ones which are updated from time to time. You MUST NOT use this Website if you disagree with any of these Website Standard Terms and Conditions. User Registrations and Transactions on the application are allowed for majors only. The age for being a major may vary from country/state to country/state and the prevailing law of the land where the user is registering from will be applicable for defining the age from being a major. This ‘Terms and Conditions’ document also includes the ‘Disclaimer’ document. Please read and accept the points completely, before you proceed further.</p>
                    <p>
                      Amendments to this agreement can be made and effected by us from time to time without specific notice to your end. Updates to the ‘Terms and Conditions’ may be updated, added or modified from time to time and this reflects the latest agreement and all users should carefully review and agree to them, before you register with the website and/or continue using the website.
                    </p>
                    <h5>Intellectual Property Rights </h5>
                    <p>
                      Other than the content you own, under these Terms, ‘moolya Business Services Private Limited, Hyderabad, India’ (hereby referred to as ‘moolya’ for the entire course of the document) and/or its partners and/or affiliates are entitled to use the intellectual property rights and materials contained in this Website. Users are requested not to post or upload any content or information which you would not want to be shared with the rest of the users at any point of time. You are being granted time-bound usage rights to the services, based on your selected subscription or category of your registration. Such rights are meant only for the purposes of viewing the material and information on the website and for engaging with the users on this Website. All users are bound to strictly adhere to the prescribed terms and conditions at all times. </p>
                    <h5>
                      Specific Restrictions: </h5>

                    <ul>
                      <li>publishing any Website or application material in any other media;</li>
                      <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                      <li>publicly performing and/or showing any Website material;</li>
                      <li>using this Website in any way that is or may be damaging to this Website;</li>
                      <li>using this Website in any way that impacts user access to this Website;</li>
                      <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
                      <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
                      <li>using this Website to engage in any advertising or marketing.</li>
                    </ul>
                    <p>Certain areas of this Website are restricted from being accessed by you. ‘moolya Business Services Private Limited, Hyderabad, India’ may further restrict access to you to any areas or sections of this Website, at any time, at its own absolute discretion. Any user ID and/or password you may have for this Website are confidential and you must always maintain confidentiality.</p>
                    <h5>Your Content</h5>
                    <p>
                      In these Website Standard Terms and Conditions, “Your Content” shall mean any audio, video text, images or other material you choose to display on this Website or the related applications. By displaying Your Content, you grant ‘moolya’, a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
                    <p>
                      Your Content must be your own and must not be invading any third-party’s rights at any time. moolya reserves the right to remove any of Your Content from this Website at any time without notice.</p>
                    <h5>No warranties</h5>
                    <p>
                      This Website is provided “as is,” with all faults, and moolya expresses no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you or any of your related contacts at any point of time. All actions conducted by you on the website shall be deemed as being carried out solely by you under your own wise discretion. </p>
                    <h5>Limitation of liability</h5>
                    <p>
                      In no event shall moolya, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract. moolya, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.

                    </p>
                    <h5>Indemnification </h5>
                    <p>
                      You hereby indemnify to the fullest extent moolya Business Services Private Limited, Hyderabad, India and its other offices and businesses, from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.

                    </p>
                    <h5>
                      Severability </h5>

                    <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>

                    <h5>Variation of Terms </h5>
                    <p>
                      moolya Business Services Private Limited is permitted to revise these Terms at any time as it deems fit, and by using this Website you are expected to review these Terms on a regular basis. moolya may also decide at its own discretion, to either make any of its services, products or subscriptions (hereby referred to as ‘services’ for the entire course of this document) complimentary or chargeable at any point of time without any notice. For users who have already paid for the services or the products on the website, the charged amount will continue to be under effect till the completion of the duration of the said contract or otherwise. After the completion of the contract the new rates will become applicable for further availment of services/products on the website. </p>

                    <h5>Assignment </h5>
                    <p>
                      moolya is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms. </p>

                    <h5>
                      Entire Agreement</h5>

                    <p>
                      These Terms constitute the entire agreement between ‘moolya Business Services Private Limited, Hyderabad, India and/or its other global offices, and you in relation to your use of this Website, and supersede all prior agreements and understandings. Any new terms and conditions prescribed from time to time, will be shared with the existing users for them to read, understand and accept before they continue the use of the services on the website. </p>
                    <p>
                      Even though you may or may not be registered with some form of DND (‘DO NOT DISTURB’ or ‘DO NOT CALL’ registry or similar in various countries and jurisdictions) or other similar records maintained by various governmental, public or private entities, you expressly and continuously permit moolya authorized representatives/staff members to contact you over email, phone, mobile and other modes of communication for setting up your account, seeking clarifications on any actions carried out on your account and for any updates that may be required. Verbal and email communication is important for many activities to be carried out on moolya and you expressly agree to be contacted at appropriate times for the same. </p>
                    <h5> Governing Law & Jurisdiction </h5>

                    <p>
                      These Terms will be governed by and interpreted in accordance with the laws of the State of Telangana, India. The High-court of ‘Hyderabad, Telangana, India’ or only the appropriate courts of ‘Hyderabad, Telangana, India’, will have exclusive jurisdiction to adjudicate any dispute arising under or in connection with this Agreement and ‘Terms and Conditions’ document. Any new terms and conditions prescribed from time to time, will be shared with the existing users for them to read, understand and accept before they continue the use of the services on the website.
                    </p>
                    <p>‘moolya’ confirms to the Information Technology Act, 2000 of India and users are alerted to read, understand and abide by the laws listed in the act. ‘moolya’ also conforms to the ‘Information Technology (Intermediaries guidelines) Rules, 2011’. Users are encouraged to understand and abide by the rules and regulations of this act and other accompanying acts in their entirety, before using ‘moolya’. More details of the ‘Information Technology Rules, 2000’ can be found here: <a href="http://www.dot.gov.in/sites/default/files/itbill2000_0.pdf" target="_blank"></a></p>
                    <h5> Mediation and Arbitration</h5>
                    <p>
                      In the event of a dispute arising out of or relating to this contract, including any question regarding its existence, validity or termination, the parties shall first seek settlement of that dispute by mediation in accordance with ‘The Arbitration and Conciliation Act, 1996’, which Rules are deemed to be incorporated by reference into this clause.

                    </p>
                    <p>
                      If the dispute is not settled by mediation within 30 days of the appointment of the mediator, or such further period as the parties shall agree in writing, the dispute shall be referred to and finally resolved by arbitration under the ‘The Arbitration and Conciliation Act, 1996’, which Rules are deemed to be incorporated by reference into this clause.

                    </p>
                    <p>
                      The language to be used in the mediation and in the arbitration shall be ‘English’.
                      The governing law of the contract shall be the substantive law of INDIA.

                    </p>
                    <p>
                      In any arbitration commenced pursuant to this clause,

                    </p>
                    <ul>
                      <li>the number of arbitrators shall be three; and</li>
                      <li>the seat, or legal place, of the arbitration shall be ‘Hyderabad, Telangana, India’</li>
                    </ul>
                    <h5> No warranties: </h5>

                    <p>
                      This website is provided “as is” without any representations or warranties, express or implied. ‘moolya’ makes no representations or warranties in relation to this website or the information and materials provided on this website.
                    </p>
                    <p>
                      Without prejudice to the generality of the foregoing paragraph, ‘moolya’ does not warrant that:
                    </p>
                    <ul>
                      <li>this website will be constantly available, or available at all; or</li>
                      <li>the information on this website is complete, true, accurate or non-misleading.</li>
                    </ul>
                    <p> Nothing on this website constitutes, or is meant to constitute, advice of any kind. If you require advice in relation to any [legal, financial or medical] matter you should consult an appropriate professional.</p>

                    <h5>Conformance to Consumer Protection Acts:</h5>
                    <p> ‘moolya’ seeks to be a self-discovery platform and hence services may be rendered by users for other users on the platform as well as in offline mode. Out of the various laws that have been enforced to protect the consumer rights in India, the most important is the Consumer Protection Act, 1986. Each of the user who wishes to operate on ‘moolya’ for rendering any services, expressly agrees to abide by the guidelines mentioned in the ‘Consumer Protection Act, 1986, India’ at all times. According to this law, everybody, including individuals, a firm, a Hindu undivided family and a company, have the right to exercise their consumer rights for the purchase of goods and services made by them. It is significant that, as consumer, one knows the basic rights as well as about the courts and procedures that follow with the infringement of one’s rights. Users are encouraged to understand the rules and regulations of this act and other accompanying acts in their entirety, before using ‘moolya’ for rendering or consuming any services or making any purchases. </p>
                    <h5>Limitations of liability:</h5>
                    <p>moolya’ will not be liable to you (whether under the law of contract, the law of torts or otherwise) in relation to the contents of, or use of, or otherwise in connection with, this website:</p>
                    <ul>
                      <li>[to the extent that the website is provided free-of-charge or charges are to the extent of providing access to restricted features or transactions, for any direct loss]</li>
                      <li>for any indirect, special or consequential loss; or</li>
                      <li>for any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data.</li>

                    </ul>
                    <p>These limitations of liability apply even if ‘moolya; has been expressly advised of the potential loss.</p>
                    <h5>Exceptions:</h5>
                    <p>Nothing in this website disclaimer will exclude or limit any warranty implied by law that it would be unlawful to exclude or limit; and nothing in this website disclaimer will exclude or limit ‘moolya’s liability in respect of any:</p>
                    <ul>
                      <li>death or personal injury caused by ‘moolya’s’ negligence;</li>
                      <li>fraud or fraudulent misrepresentation on the part of ‘moolya’; or</li>
                      <li>matter which it would be illegal or unlawful for ‘moolya’ to exclude or limit, or to attempt or purport to exclude or limit, its liability</li>
                    </ul>
                    <h5>Other parties:</h5>
                    <p>You accept that, as a limited liability entity, moolya has an interest in limiting the personal liability of its officers and employees. You agree that you will not bring any claim personally against ‘moolya’s’ officers or employees in respect of any losses you suffer in connection with the website.</p>
                    <p>Without prejudice to the foregoing paragraph, you agree that the limitations of warranties and liability set out in this website disclaimer will protect moolya’s officers, employees, agents, subsidiaries, successors, assigns and sub-contractors as well as ‘moolya’, at all times. </p>

                    <h5>Unenforceable provisions:</h5>
                    <p>If any provision of this website disclaimer is, or is found to be, unenforceable under applicable law, that will not affect the enforceability of the other provisions of this website disclaimer.</p>
                    <h5>Reasonableness:</h5>
                    <p>By using this website, you agree that the exclusions and limitations of liability set out in this website disclaimer are reasonable.  If you do not think they are reasonable, you must not use this website.</p>
                    <h5>Force Majeure:</h5>
                    <p> In no event shall ‘moolya’ or any of its agents, staff or officers, be responsible or liable for any failure or delay in the performance of its obligations hereunder arising out of or caused by, directly or indirectly, forces beyond its control, including, without limitation, strikes, work stoppages, accidents, acts of war or terrorism, civil or military disturbances, nuclear or natural catastrophes or acts of God, and interruptions, loss or malfunctions of utilities, communications or computer (software and hardware) services; it being understood that ‘moolya’ shall use reasonable efforts which are consistent with accepted practices in the Information Technology industry to resume performance as soon as practicable under the circumstances.</p>
                    <h5>Guidance on transferring personal data to external organisations:</h5>
                    <p>Personal Data is defined under the Data Protection Acts or similar ones for various countries. It is generally defined as data which relates to a living individual who can either be identified from that data; or identified from that data and other data which may be in the possession of or likely to come into the possession of the data controller. This will include any expression of opinion about that person. Personal Data will include ‘Name, Date of Birth, Address, Telephone numbers and “sensitive personal data” eg. Financial History, racial or ethnic origin. ‘moolya’ collects a wide range of personal data relating to the users of the platform/website, for its own purposes, and to meet external obligations. This may result in the eventual transfer of personal data to an outside third party, however any such transfers must be permitted under the acts permitted as per India’s law of the land. Personal data must not be disclosed to unauthorised third parties. Unauthorised third parties includes another individual or organisation, family members, friends, local authorities, government bodies, and the police where the individual has not consented to the transfer unless disclosure is exempted appropriate Acts, or by other legislation. There is no general legal requirement to disclose information to the police unless specified in a proper and legitimate form. However data can sometimes be disclosed without consent, where, for example, it is required for:</p>
                    <ul>
                      <li>Protecting the vital interests of the data subject (i.e. release of medical data in emergency), or </li>
                      <li>The prevention or detection of crime </li>
                    </ul>
                    <p>Personal Data can be transferred to another third party if the data subject has given their consent. ‘moolya’ maybe/is frequently required to disclose information in accordance with legislation which it is subject to. Legal services can be availed by the prospective users of ‘moolya’ for advice on whether India offers adequate protection and to assist with any risk assessments which may be necessary. </p>
                    <h5>e-Commerce compliances:</h5>
                    <p>‘moolya’ endeavours to host the application, website and all related systems on vendors of adequate repute at all times, which ensures adequate security or user data and transactions. Some of the security checks which are put in place by the hosting service provider, include:</p>
                    <ul>
                      <li>Use a firewall and keep the firewall updated</li>
                      <li>Non-storage of cardholder data in any form</li>
                      <li>Use sufficient encryption to protect all transmission of cardholder data over any public network</li>
                      <li>Use antivirus software on all machines in the cardholder data environment and ensure that the software is regularly updated</li>
                      <li>Ensure only reputed Card processing systems are utilized to process payments</li>
                      <li>Limit access to cardholder data to as few people as possible</li>
                      <li>Assign a unique ID number to each user so that everyone is accountable for his own actions</li>
                      <li>Restrict physical access to the cardholder data environment</li>
                      <li>Monitor all access to the network and cardholder data environment</li>
                      <li>Regularly test security systems and network environment</li>
                      <li>Maintain a security policy and ensure that all personnel are aware of it</li>

                    </ul>
                  </div>

              </div>
            </div>
          </div>
        </div>

        <div className="modal fade bs-example-modal-sm library-popup privacyPop"
             onContextMenu={(e) => e.preventDefault()} tabindex="-1" role="dialog"
             aria-labelledby="mySmallModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                Privacy Policy
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                  aria-hidden="true">&times;</span></button>
              </div>
              <div className="modal-body">

                  <div className="blank_content" style={{'height':'400px','overflow':'auto','padding':'0px 5px'}}>
                    <h5>Welcome to our Privacy Policy.</h5>
                    <p>Your privacy is critically important to us.</p>
                    <p>moolya’s office is located at:<div className="clearfix"></div> #1002, 10th Floor, The Platina, Gachibowli Road, Gachibowli, Hyderabad, Telangana, IN - 500032 <div className="clearfix"></div> Mobile: 91-99664 08213</p>
                    <p>It is moolya’s policy to respect your privacy regarding any information we may collect while operating our website. This Privacy Policy applies to moolya.global (hereinafter, "us", "we", or "moolya.global"). We respect your privacy and are committed to protecting personally identifiable information you may provide us through the Website. We have adopted this privacy policy ("Privacy Policy") to explain what information may be collected on our Website, how we use this information, and under what circumstances we may disclose the information to third parties. This Privacy Policy applies only to information we collect through the Website and does not apply to our collection of information from other sources.This Privacy Policy, together with the Terms and conditions posted on our Website, set forth the general rules and policies governing your use of our Website. Depending on your activities when visiting our Website, you may be required to agree to additional terms and conditions.</p>
                    <h5>- Website Visitors:</h5>
                    <p>Like most website operators, moolya collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. moolya’s purpose in collecting non-personally identifying information is to better understand how moolya’s visitors use its website. From time to time, moolya may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.</p>
                    <p>moolya also collects potentially personally-identifying information like Internet Protocol (IP) addresses for logged in users and for users leaving comments on http://moolya.global blog posts. moolya only discloses logged in user and commenter IP addresses under the same circumstances that it uses and discloses personally-identifying information as described below:</p>
                    <h5>- Gathering of Personally-Identifying Information:</h5>
                    <p>Certain visitors to moolya’s websites choose to interact with moolya in ways that require moolya to gather personally-identifying information. The amount and type of information that moolya gathers depends on the nature of the interaction. For example, we ask visitors who sign up for a blog at http://moolya.global to provide a username and email address.</p>
                    <h5>- Security</h5>
                    <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
                    <h5>- Advertisements</h5>
                    <p>Ads appearing on our website may be delivered to users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This Privacy Policy covers the use of cookies by moolya and does not cover the use of cookies by any advertisers.</p>
                    <h5>- Links To External Sites</h5>
                    <p>Our Service may contain links to external sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms and conditions of every site you visit.We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites, products or services.</p>
                    <h5>- moolya.global uses Google AdWords for remarketing</h5>
                    <p>moolya.global uses the remarketing services to advertise on third party websites (including Google) to previous visitors to our site. It could mean that we advertise to previous visitors who haven’t completed a task on our site, for example using the contact form to make an enquiry. This could be in the form of an advertisement on the Google search results page, or a site in the Google Display Network. Third-party vendors, including Google, use cookies to serve ads based on someone’s past visits. Of course, any data collected will be used in accordance with our own privacy policy and Google’s privacy policy.</p>
                    <p>You can set preferences for how Google advertises to you using the Google Ad Preferences page, and if you want to you can opt out of interest-based advertising entirely by cookie settings or permanently using a browser plugin.</p>
                    <h5>- Protection of Certain Personally-Identifying Information</h5>
                    <p>moolya discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on moolya’s behalf or to provide services available at moolya’s website, and (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; by using moolya’s website, you consent to the transfer of such information to them. moolya will not rent or sell potentially personally-identifying and personally-identifying information to anyone. Other than to its employees, contractors and affiliated organizations, as described above, moolya discloses potentially personally-identifying and personally-identifying information only in response to a subpoena, court order or other governmental request, or when moolya believes in good faith that disclosure is reasonably necessary to protect the property or rights of moolya, third parties or the public at large.</p>
                    <p>If you are a registered user of http://moolya.global and have supplied your email address, moolya may occasionally send you an email to tell you about new features, solicit your feedback, or just keep you up to date with what’s going on with moolya and our products. We primarily use our blog to communicate this type of information, so we expect to keep this type of email to a minimum. If you send us a request (for example via a support email or via one of our feedback mechanisms), we reserve the right to publish it in order to help us clarify or respond to your request or to help us support other users. moolya takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.</p>
                    <h5>- Aggregated Statistics</h5>
                    <p>moolya may collect statistics about the behavior of visitors to its website. moolya may display this information publicly or provide it to others. However, moolya does not disclose your personally-identifying information.</p>
                    <h5>- Affiliate Disclosure</h5>
                    <p>This site uses affiliate links and does earn a commission from certain links. This does not affect your purchases or the price you may pay.</p>
                    <h5>- Cookies</h5>
                    <p>To enrich and perfect your online experience, moolya uses "Cookies", similar technologies and services provided by others to display personalized content, appropriate advertising and store your preferences on your computer.</p>
                    <p>A cookie is a string of information that a website stores on a visitor’s computer, and that the visitor’s browser provides to the website each time the visitor returns. moolya uses cookies to help moolya identify and track visitors, their usage of http://moolya.global, and their website access preferences. moolya visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using moolya’s websites, with the drawback that certain features of moolya’s websites may not function properly without the aid of cookies.</p>
                    <p>By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to moolya's use of cookies.</p>
                    <h5>- E-commerce</h5>
                    <p>Those who engage in transactions with moolya – by purchasing moolya's services or products, are asked to provide additional information, including as necessary the personal and financial information required to process those transactions. In each case, moolya collects such information only insofar as is necessary or appropriate to fulfill the purpose of the visitor’s interaction with moolya. moolya does not disclose personally-identifying information other than as described below. And visitors can always refuse to supply personally-identifying information, with the caveat that it may prevent them from engaging in certain website-related activities.</p>
                    <h5>- Business Transfers</h5>
                    <p>If moolya, or substantially all of its assets, were acquired, or in the unlikely event that moolya goes out of business or enters bankruptcy, user information would be one of the assets that is transferred or acquired by a third party. You acknowledge that such transfers may occur, and that any acquirer of moolya may continue to use your personal information as set forth in this policy.</p>
                    <h5>- Privacy Policy Changes:</h5>
                    <p>Although most changes are likely to be minor, moolya may change its Privacy Policy from time to time, and in moolya’s sole discretion. moolya encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.</p>
                    <h5>- Credit & Contact Information:</h5>
                    <p>This privacy policy was created at privacygen.com. If you have any questions about this Privacy Policy, please contact us via email or phone (details in CONTACT US of www.moolya.global)</p>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

