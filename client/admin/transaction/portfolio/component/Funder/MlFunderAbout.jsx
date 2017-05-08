import React, { Component, PropTypes }  from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import {dataVisibilityHandler, OnLockSwitch,initalizeFloatLabel} from '../../../../utils/formElemUtil';
import {fetchfunderPortfolioAbout} from '../../actions/findPortfolioFunderDetails'
import {multipartASyncFormHandler} from '../../../../../commons/MlMultipartFormAction'
import _ from 'lodash';

export default class MlFunderAbout extends React.Component {
  constructor(props, context){
    super(props);
    this.state={
      loading: true,
      data:{}
    }
    this.onClick.bind(this);
    this.handleBlur.bind(this);
    this.fetchPortfolioDetails.bind(this);
    return this;
  }
  componentWillMount(){
    this.fetchPortfolioDetails();
  }

  componentDidMount()
  {
    OnLockSwitch();
    dataVisibilityHandler();

  }
  componentDidUpdate()
  {
    OnLockSwitch();
    dataVisibilityHandler();
    var WinHeight = $(window).height();
    $('.left_wrap').height(WinHeight-(90+$('.admin_header').outerHeight(true)));
    initalizeFloatLabel();
  }
  onClick(field,e){
    let details = this.state.data||{};
    let key = e.target.id;
    details=_.omit(details,[key]);
    let className = e.target.className;
    if(className.indexOf("fa-lock") != -1){
      details=_.extend(details,{[key]:true});
    }else{
      details=_.extend(details,{[key]:false});
    }
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })

  }
  handleBlur(e){
    let details =this.state.data;
    let name  = e.target.name;
    details=_.omit(details,[name]);
    details=_.extend(details,{[name]:e.target.value});
    this.setState({data:details}, function () {
      this.sendDataToParent()
    })
  }
  async fetchPortfolioDetails() {
    let that = this;
    let portfoliodetailsId=that.props.portfolioDetailsId;
    let empty = _.isEmpty(that.context.funderPortfolio && that.context.funderPortfolio.funderAbout)
    if(empty){
      const response = await fetchfunderPortfolioAbout(portfoliodetailsId);
      if (response) {
        this.setState({loading: false, data: response});
      }
    }else{
      this.setState({loading: false, data: that.context.funderPortfolio.funderAbout});
    }

  }

  sendDataToParent(){
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    this.props.getAboutus(data)
  }
  onLogoFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let data ={moduleName: "PORTFOLIO", actionName: "UPLOAD", portfolioDetailsId:this.props.portfolioDetailsId, portfolio:{funderPortfolio:{funderAbout:{logo:{fileUrl:'', fileName : fileName}}}}};
    let response = multipartASyncFormHandler(data,file,'registration',this.onFileUploadCallBack.bind(this, name, fileName));
  }
  onFileUploadCallBack(name,fileName, resp){
    if(resp){
      let result = JSON.parse(resp)
      if(result.success){
        this.setState({loading:true})
        this.fetchOnlyImages();
      }
    }
  }
  async fetchOnlyImages(){
    const response = await fetchfunderPortfolioAbout(this.props.portfolioDetailsId);
    if (response) {
      let dataDetails =response
      let cloneBackUp = _.cloneDeep(dataDetails);
      if(cloneBackUp){
        let curUpload=dataDetails
        cloneBackUp['logo']= curUpload['logo']
        this.setState({loading: false, funderAbout:cloneBackUp})
      }else {
        this.setState({loading: false})
      }
    }
  }

  render() {
    const showLoader = this.state.loading;
    return (
      <div>
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
      <div>
        <h2>About Us</h2>
        <div className="main_wrap_scroll">
          <ScrollArea speed={0.8} className="main_wrap_scroll" smoothScrolling={true} default={true}>

            <div className="col-md-6 nopadding-left">
              <div className="left_wrap">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                  smoothScrolling={true}
                  default={true}
                >
                  <div className="form_bg">
                    <form>

                      <div className="form-group">
                        <input type="text" placeholder="First Name" name="firstName" defaultValue={this.state.data.firstName} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isFirstNamePrivate" onClick={this.onClick.bind(this, "isFirstNamePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isFirstNamePrivate}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Last Name" name="lastName" defaultValue={this.state.data.lastName} className="form-control float-label" id="cluster_name"  onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isLastNamePrivate" onClick={this.onClick.bind(this, "isLastNamePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isLastNamePrivate}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Gender" name="gender" defaultValue={this.state.data.gender} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isGenderPrivate" onClick={this.onClick.bind(this, "isGenderPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isGenderPrivate}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="User Category" name="category" defaultValue={this.state.data.category} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isCategoryPrivate" onClick={this.onClick.bind(this, "isCategoryPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isCategoryPrivate}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Education" name="qualification" defaultValue={this.state.data.qualification} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isQualificationPrivate" onClick={this.onClick.bind(this, "isQualificationPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isQualificationPrivate}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Employment Status" name="employmentStatus" defaultValue={this.state.data.employmentStatus} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isEmploymentStatusPrivate" onClick={this.onClick.bind(this, "isEmploymentStatusPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isEmploymentStatusPrivate}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Professional Tag" name="professionalTag" defaultValue={this.state.data.professionalTag} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isProfessionalTagPrivate" onClick={this.onClick.bind(this, "isProfessionalTagPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isProfessionalTagPrivate}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Years of Experience" name="yearsOfExperience" defaultValue={this.state.data.yearsOfExperience} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isYearsOfExperiencePrivate" onClick={this.onClick.bind(this, "isYearsOfExperiencePrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isYearsOfExperiencePrivate}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Industry" name="industry" defaultValue={this.state.data.industry} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isIndustryPrivate" onClick={this.onClick.bind(this, "isIndustryPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isIndustryPrivate}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Profession" name="profession" defaultValue={this.state.data.profession} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isProfessionPrivate" onClick={this.onClick.bind(this, "isProfessionPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isProfessionPrivate}/>
                      </div>
                    </form>
                  </div>
                </ScrollArea>
              </div>
            </div>
            <div className="col-md-6 nopadding-right">
              <div className="left_wrap">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                  smoothScrolling={true}
                  default={true}
                >
                  <div className="form_bg">
                    <form>

                      <div className="form-group">
                        <div className="fileUpload mlUpload_btn">
                          <span>Profile Pic</span>
                          <input type="file" name="logo" id="logo" className="upload"  accept="image/*" onChange={this.onLogoFileUpload.bind(this)}  />
                        </div>
                        <div className="previewImg ProfileImg">
                          <img src="/images/ideator_01.png"/>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="panel panel-default mart20">
                        <div className="panel-heading"> Investment Budget Per Years:</div>

                        <div className="panel-body">
                          <div className="form-group">
                            <input type="text" placeholder="From" name="from" defaultValue={this.state.data.investmentBudget && this.state.data.investmentBudget.from?this.state.data.investmentBudget.from:""} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon un_lock" id="isFromPrivate" onClick={this.onClick.bind(this, "isFromPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.investmentBudget && this.state.data.investmentBudget.isFromPrivate?this.state.data.investmentBudget.isFromPrivate:""}/>
                          </div>
                          <div className="form-group">
                            <input type="text" placeholder="To" name="to" defaultValue={this.state.data.investmentBudget && this.state.data.investmentBudget.from?this.state.data.investmentBudget.from:""} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                            <FontAwesome name='unlock' className="input_icon un_lock" id="to" onClick={this.onClick.bind(this, "to")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.investmentBudget && this.state.data.investmentBudget.isToPrivate?this.state.data.investmentBudget.isToPrivate:""}/>
                          </div>
                        </div>
                      </div>


                      <div className="clearfix"></div>
                      <div className="panel panel-default">
                        <div className="panel-heading"> Investment From:</div>

                        <div className="panel-body">
                          <div className="input_types">
                            <input id="radio1" type="radio" name="radio" value="1"/><label
                            htmlFor="radio1"><span><span></span></span>Personal</label>
                          </div>
                          <div className="input_types">
                            <input id="radio2" type="radio" name="radio" value="2"/><label
                            htmlFor="radio2"><span><span></span></span>Family Fund</label>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="form-group">
                        <input type="text" placeholder="Number of Investments" name="investmentCount" defaultValue={this.state.data.investmentCount} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isInvestmentCountPrivate" onClick={this.onClick.bind(this, "isInvestmentCountPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isInvestmentCountPrivate}/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Phone No" name="mobileNumber" defaultValue={this.state.data.mobileNumber} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isMobileNumberPrivate" onClick={this.onClick.bind(this, "isMobileNumberPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isMobileNumberPrivate}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Email Id" name="emailId" defaultValue={this.state.data.emailId} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isEmailIdPrivate" onClick={this.onClick.bind(this, "isEmailIdPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isEmailIdPrivate}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Fcebook Id" name="facebookUrl" defaultValue={this.state.data.facebookUrl} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isFacebookUrlPrivate" onClick={this.onClick.bind(this, "isFacebookUrlPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isFacebookUrlPrivate}/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Linkdin URL" name="linkedInUrl" defaultValue={this.state.data.linkedInUrl} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>
                        <FontAwesome name='unlock' className="input_icon un_lock" id="isLinkedInUrlPrivate" onClick={this.onClick.bind(this, "isLinkedInUrlPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isLinkedInUrlPrivate}/>
                      </div>

                      {/*<div className="form-group">*/}
                        {/*<input type="text" placeholder="Twitter Id" className="form-control float-label"*/}
                               {/*id="cluster_name"/>*/}
                        {/*<input type="text" placeholder="Gender" name="gender" defaultValue={this.state.data.gender} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>*/}
                        {/*<FontAwesome name='unlock' className="input_icon un_lock" id="isGenderPrivate" onClick={this.onClick.bind(this, "isGenderPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isGenderPrivate}/>*/}
                      {/*</div>*/}

                      {/*<div className="form-group">*/}
                        {/*<input type="text" placeholder="Googleplus Id" className="form-control float-label"*/}
                               {/*id="cluster_name"/>*/}
                        {/*<input type="text" placeholder="Gender" name="gender" defaultValue={this.state.data.gender} className="form-control float-label" id="cluster_name" onBlur={this.handleBlur.bind(this)}/>*/}
                        {/*<FontAwesome name='unlock' className="input_icon un_lock" id="isGenderPrivate" onClick={this.onClick.bind(this, "isGenderPrivate")}/><input type="checkbox" className="lock_input" id="makePrivate" checked={this.state.data.isGenderPrivate}/>*/}
                      {/*</div>*/}
                    </form>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </ScrollArea>
          <br className="brclear"/>
        </div>
      </div>
          )}
      </div>
    )
  }
};
MlFunderAbout.contextTypes = {
  funderPortfolio: PropTypes.object,
};
