import React, {Component} from "react";
import {render} from "react-dom";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {multipartASyncFormHandler} from '../../../../../commons/MlMultipartFormAction'
import Moolyaselect from  '../../../../commons/components/MlAdminSelectWrapper'
import _ from "lodash";


var Select = require('react-select');
var options = [
  {value: 'Audio', label: 'Audio'},
  {value: 'Video', label: 'Video'},
  {value: 'MeetUp', label: 'MeetUp'}
];
export default class  FunderCreateServicesView extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedIndustryType:[],
      responsePic:[],
      attachmentDocs:[{}],
      uploadedProfilePic:"",
      data:{},
      selectedIndex: 0,
      funderService: [],
      saveData: false
    }
    this.handleBlur.bind(this);
    this.sendDataToParent.bind(this);
    this.onOptionSelected.bind(this);
    this.saveBeSpoke.bind(this);
  }

  componentDidMount() {
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    $(function () {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function () {
      if ($(this).parent().hasClass('nocolor-switch')) {

        if ($(this).is(':checked')) {
          $('.state_label:nth-of-type(1)').removeClass('acLabel');
          $('.state_label:nth-of-type(2)').addClass('acLabel');
        } else {
          $('.state_label:nth-of-type(2)').removeClass('acLabel');
          $('.state_label:nth-of-type(1)').addClass('acLabel');
        }
      } else {
        if ($(this).is(':checked')) {
          $(this).parent('.switch').addClass('on');
        } else {
          $(this).parent('.switch').removeClass('on');
        }
      }
    });

    $('.tab_wrap_scroll').height(WinHeight - ($('.app_header').outerHeight(true) + 120));
    if (WinWidth > 768) {
      $(".tab_wrap_scroll").mCustomScrollbar({theme: "minimal-dark"});
    }
  }

  componentWillMount(){
    console.log(this.props)
}

  /**
   * Method :: handleBlur
   * Description :: Every text fields hits this function onBlur and respective data is stored in data Object
   * @params ::  event Handler
   * returns ::  data is redirected to sendDataToParent()
   **/


  handleBlur(e) {
    let details = this.state.data;
    let name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, {[name]: e.target.value});
    this.setState({data: details}, function () {
      this.sendDataToParent()
    })
  }

  handleDuration(e) {
    var details = this.state.data;
    let name = e.target.name;
    if (name === 'hour') {
      var duration1 = {
        name: e.target.name
      }
    }
    if (name === 'minute') {
      var duration = {
        name: e.target.name
      }
    }
      details = _.extend(duration, duration1);
  }

  /**
   * Method :: sendDataToParent
   * Description :: Sends data in the form of an Object back to the parent
   * @params ::  No params
   * returns ::  this.props.getServiceDetails(funderService)
   **/

  sendDataToParent() {
    let data = this.state.data;
    for (var propName in data) {
      if (data[propName] === null || data[propName] === undefined) {
        delete data[propName];
      }
    }
    this.props.saveServiceDetails(data)
  }

  /**
   * Method :: onOptionSelected
   * Description :: Multi-select to determine the types of industries
   * @params ::  selectedIndustry : type :: String
   * returns ::  data is redirected to sendDataToParent()
   **/

  onOptionSelected(selectedIndustry) {
    let details = this.state.data;
    details = _.omit(details, ["industryId"]);
    details = _.extend(details, {["industryId"]: selectedIndustry});
    this.setState({data: details}, function () {
      this.setState({selectedIndustryType: selectedIndustry})
      this.sendDataToParent()
    })
  }

  /**
   * Method :: onConversationSelected
   * Description :: Multi-select to determine the types of conversation
   * @params ::  selectedConversation : type :: String
   * returns ::  data is redirected to sendDataToParent()
   **/


  onConversationSelected(selectedConversation) {
    let temp = [];
    selectedConversation.map(function(data){
      temp.push(data.label)
    })
    let details = this.state.data;
    // let details = this.state.data;
    console.log(selectedConversation)
    details = _.omit(details, ["conversation"]);
    details = _.extend(details, {["conversation"]: temp});
    console.log(details)
    this.setState({data: details}, function () {
      this.setState({selectedConversationType: temp})
      this.sendDataToParent()
    })
  }

  /**
   * Method :: modeSwitchHandler
   * Description :: Checkbox to determine the mode of operation
   * @params ::  event handler
   * returns ::  data is redirected to sendDataToParent()
   **/

  modeSwitchHandler(e){
    let details = this.state.data;
    let name = e.target.name;
    details = _.omit(details, [name]);
    details = _.extend(details, {[name]: e.target.checked?"offline":"online"});
    this.setState({data: details}, function () {
      this.sendDataToParent()
    })
  }

  /**
   * Method :: onFileUpload
   * Description :: File uploading action is done here. Once uploaded it hits onFileUploadCallBack()
   * and the return to current function and call storeImage()
   * returns :: Hits onFileUploadCallBack()
   * **/
  async onFileUpload(index, e) {
    let user = {
      profile: {
        InternalUprofile: {moolyaProfile: {profileImage: " "}}
      }
    }
    let file = e.target.files[0];//document.getElementById("fileinput").files[0];
    if (file) {
      let data = {moduleName: "PROFILE", actionName: "UPDATE", user: user}
      let response = await multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this, index));
      return response;
    }
  }

  onFileUploadCallBack(index,resp) {
    let details = this.state.data;
    let attach = this.state.attachmentDocs;
    let tempObject = [];
    if (resp) {
      this.setState({uploadedProfilePic: resp});
      var temp = $.parseJSON(this.state.uploadedProfilePic).result;
      if(attach[index].fileUrl){
        attach[index].fileUrl.push(temp)
        // attach[index].images = tempObject
      }else {
        tempObject.push(temp)
        attach[index].fileUrl = tempObject
      }
      details = _.omit(details, ["attachments"]);
      details = _.extend(details, {["attachments"]: attach});
      this.setState({data: details}, function () {
        this.setState({attachmentDocs: attach})
        this.sendDataToParent()
      })
      return temp;
    }
  }

  addComponent(index) {
    let attach = this.state.attachmentDocs;
    attach.push({})
    this.setState({attachmentDocs: attach})
  }

  documentName(index, e) {
    let attach = this.state.attachmentDocs;
    let temp = e.target.value;
    attach[index].documentName = temp;
    this.setState({attachmentDocs: attach})
  }

  saveBeSpoke(){
    let details = this.state.data;
    details = _.omit(details, ["saveData"]);
    details = _.extend(details, {["saveData"]: !this.state.saveData});
    this.setState({data: details}, function () {
      this.sendDataToParent()
    })
  }

  render() {
    let that = this;
    let industryTypeQuery = gql`
    query{
    data:fetchIndustries{label:industryName,value:_id}
    }
    `

    // const pictures = picsArray.map(function(image){
    //   return (
    //     <div className="upload-image">
    //       <img src={image} id="output"/>
    //     </div>
    //   )
    // })

    let attach = this.props.beSpokeDetails?this.props.beSpokeDetails[0].attachments:[{}] || this.state.attachmentDocs || [{}];
    const attachments = attach.map(function(details, index){
      return(
          <div className="panel panel-default step5">
            <div className="panel-heading">Attachments if any ?
              <div className="pull-right block_action">
                <div className="fileUpload upload_file_mask">
                  &nbsp;&nbsp;<span className="ml ml-plus" onClick={that.addComponent.bind(that, index)} ></span>
                </div>
              </div>
              <div className="pull-right">
                {/*style={{'marginTop': '-15px'}}*/}
                <input type="text" placeholder="Document Name" value={details.documentName?details.documentName:" "} onChange={that.documentName.bind(that, index)}/>
              </div>
            </div>
            <div className="panel-body nopadding">
              <div className="upload-file-wrap">
                <input type="file"   id="fileinput"  onChange={that.onFileUpload.bind(that, index)} multiple/>
                {/*<input type="file" name="fileinput[]" id="fileinput" className="inputfile inputfile-upload"*/}
                {/*data-multiple-caption="{count} files selected" accept="image/*" onchange="loadFile(event)"*/}
                {/*multiple/>*/}

                <label for="fileinput">
                  <figure>
                    <i className="fa fa-upload" aria-hidden="true"></i>
                  </figure>
                </label>
              </div>
              {details.fileUrl ? details.fileUrl.map(function(image){
                return(
                  <div className="upload-image">
                    <img src={image} id="output"/>
                  </div>
                )
              }): [] }
              <div className="upload-image"></div>
            </div>
          </div>
        )
          return(
      <div>
        <div className="tab_wrap_scroll">
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group switch_wrap switch_names">
                  <span className="state_label">Online
                  </span>
                  <label className="switch nocolor-switch">
                    <input type="checkbox" name="mode" onChange={this.modeSwitchHandler.bind(this)} value={this.state.mode} checked={this.props.beSpokeDetails?this.props.beSpokeDetails[0].mode==="offline"?true:false:false}/>
                    <div className="slider">
                    </div>
                  </label>
                  <span className="state_label acLabel">Offline</span>
                </div>
                <div className="clearfix"/>
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="About" name="about" onBlur={this.handleBlur.bind(this)} value={this.props.beSpokeDetails?this.props.beSpokeDetails[0].about:""}></textarea>
                </div>
                <div className="form-group">
                  <label>Required number of Sessions <input type="text" name="noOfSession" onChange={(e)=>this.handleBlur(e)} value={this.props.beSpokeDetails?this.props.beSpokeDetails[0].noOfSessions?this.props.beSpokeDetails[0].noOfSessions: this.state.data.session?parseInt(this.state.data.session):this.state.data.session:""}  className="form-control inline_input medium_in"/> </label>
                </div>
                <div className="form-group">
                  <label>Duration &nbsp; <input type="text" name="hour" onBlur={(e)=>this.handleDuration(e)} value={this.state.data.hour?parseInt(this.state.data.hour):this.state.data.hour} className="form-control inline_input"/> Hours
                    <input  name="minute" onBlur={(e)=>this.handleDuration(e)} value={this.state.data.minute?parseInt(this.state.data.minute):this.state.data.minute} type="text" className="form-control inline_input"/> Mins </label>
                </div>
                {/*<div className="form-group">*/}
                {/*<textarea className="form-control float-label" placeholder="Expected input"></textarea>*/}
                {/*</div>*/}
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <Moolyaselect multiSelect={true} className="form-control float-label" valueKey={'value'}
                                labelKey={'label'} queryType={"graphql"} query={industryTypeQuery}
                                isDynamic={true} placeholder="Select Industry Type"
                                onSelect={that.onOptionSelected.bind(that)}
                                selectedValue={that.state.selectedIndustryType} value={this.props.beSpokeDetails?this.props.beSpokeDetails[0].industryId:"" || that.state.selectedIndustryType}/>
                </div>
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="Expected input" name="expectedInput" onBlur={this.handleBlur.bind(this)} value={this.props.beSpokeDetails?this.props.beSpokeDetails[0].expectedInput:""}></textarea>
                </div>
                <div className="form-group">
                  <div className="form-group">
                    <Select name="form-field-name"  multi={true} options={options} value={this.props.beSpokeDetails?this.props.beSpokeDetails[0].conversation:"" || that.state.selectedConversationType} placeholder='Conversation Type' onChange={that.onConversationSelected.bind(that)} />
                  </div>
                </div>
                <div className="ml_btn" style={{'textAlign':'center'}}>
                  <div className="save_btn" onClick={this.saveBeSpoke.bind(this)}>Save</div>
                  <div className="cancel_btn">Cancel</div>
                </div>
                {/*<div className="form-group">*/}
                {/*<select className="form-control float-label" placeholder="Frequency">*/}
                {/*<option>Video</option>*/}
                {/*</select>*/}
                {/*</div>*/}
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="Expected Output" name="expectedOutput" onBlur={this.handleBlur.bind(this)} value={this.props.beSpokeDetails?this.props.beSpokeDetails[0].expectedOutput:""}></textarea>
                </div>
                <div className="clearfix"/>
                {attachments}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
    })
  }
};
