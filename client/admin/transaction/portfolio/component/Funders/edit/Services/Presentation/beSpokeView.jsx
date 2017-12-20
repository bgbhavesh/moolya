import React, {Component} from "react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {multipartASyncFormHandler} from '../../../../../../../../commons/MlMultipartFormAction'
import Moolyaselect from '../../../../../../../commons/components/MlAdminSelectWrapper'
import _ from "lodash";
var FontAwesome = require('react-fontawesome');
import BeSpokeAttachment from './beSpokeAttachmentsSeeMore'
import generateAbsolutePath from '../../../../../../../../../lib/mlGenerateAbsolutePath'



var Select = require('react-select');

export default class  BeSpokeView extends Component {
  constructor(props) {
    super(props)
    this.state = {updateMode: false, disableMode: false, showMore: false}
  }

  componentDidMount() {
    $('.float-label').jvFloat();
    $(".information").unbind("click").click(function () {
      if ($(this).hasClass('ml-information')) {
        $(this).removeClass('ml-information').addClass('ml-delete');
        $(this).parents('.panel').find('.panel-body').css({ 'overflow': 'hidden' });

      } else {
        $(this).removeClass('ml-delete').addClass('ml-information');
        $(this).parents('.panel').find('.panel-body').css({ 'overflow': 'auto' });
      }
      $(this).parents('.panel').find(".show-information").toggle(200);
    });
    setTimeout(function(){
      var mySwiper = new Swiper('.manage_tasks', {
        slidesPerView: 'auto',
        speed: 400,
        spaceBetween: 5
    });
  },300);
  }

  saveData() {
    if(this.props.data && this.props.data._id) {
      this.props.updateBeSpokeData(true);
    }else {
      this.props.saveBeSpokeServiceDetails(true);
    }
  }

  cancel(){
    this.props.componentToView('landingPage');
  }

  componentWillMount(){
    if(this.props.data){
      this.setState({updateMode: true})
    }
    if(this.props.module === 'appointments') {
      this.setState({disableMode: true})
    }
  }

  toggleSeeMore() {
    this.setState({showMore: !this.state.showMore})
  }

  render() {

    var options = [
      {value: 'Audio', label: 'Audio'},
      {value: 'Video', label: 'Video'},
      {value: 'MeetUp', label: 'MeetUp'}
    ];
    let frequencyOptions=[
      {value: 'Daily', label: 'Daily'},
      {value: 'Weekly', label: 'Weekly'},
      {value: 'Monthly', label: 'Monthly'}
    ];



    let that = this;
    let attach = this.props.data && this.props.data.beSpokeAttachments? this.props.data.beSpokeAttachments : [{}];
    let industryTypeQuery = gql`
    query{
    data:fetchIndustries{label:industryName,value:_id}
    }
    `

    return(
      !this.state.showMore ? <div>
        <div className="tab_wrap_scroll">
          <div className="col-md-12 nopadding">
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" className="form-control float-label" placeholder="Display Name" name="displayName" disabled={this.state.disableMode} defaultValue={this.props.data.displayName} onChange={(e)=>this.props.dataToSet(e.target.value,"displayName")} ></input>
                </div>
                <div className="form-group switch_wrap switch_names">
                  <span className="state_label">Online
                  </span>
                  <label className="switch nocolor-switch">
                    <input type="checkbox" name="mode" checked={this.props.data.mode === 'online'?false: true} disabled={this.state.disableMode} onChange={(e)=>this.props.modeSwitchHandler(e.target.checked,"mode")}  />
                    <div className="slider">
                    </div>
                  </label>
                  <span className="state_label acLabel">Offline</span>
                </div>
                <div className="clearfix"/>
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="About" disabled={this.state.disableMode} name="about" onBlur={(e)=>this.props.dataToSet(e.target.value,"about")} defaultValue={this.props.data.about} ></textarea>
                </div>
                <div className="form-group">
                  <label>Required number of Sessions <input type="number" min="0"  name="noOfSession" disabled={this.state.disableMode} onChange={(e)=>this.props.dataToSet(e.target.value,"noOfSession")} defaultValue={this.props.data.noOfSession}  className="form-control inline_input medium_in"/> </label>
                </div>
                <div className="form-group">
                  <label>Duration &nbsp;</label>
                    <input type="number" value={this.props.data.duration && this.props.data.duration.hours ? this.props.data.duration.hours : '' }  min="0"  name="hours" onChange={(e)=>this.props.duration(e.target.value,"hours")} disabled={this.state.disableMode} className="form-control inline_input"/> Hours
                    <input type="number" value={this.props.data.duration && this.props.data.duration.minutes ? this.props.data.duration.minutes : '' } name="minutes" min="0" max="59"  onChange={(e)=>this.props.duration(e.target.value,"minutes")} disabled={this.state.disableMode} className="form-control inline_input"/> Mins
                </div>
                <div className="form-group">
                  <textarea className="form-control float-label" disabled={this.state.disableMode} placeholder="Expected input" name="expectedInput" defaultValue={this.props.data.expectedInput} onChange={(e)=>this.props.dataToSet(e.target.value,"expectedInput")} ></textarea>
                </div>
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
                                onSelect={(e)=>this.props.industry(e,"industryId")}
                                disabled={this.state.disableMode}
                                selectedValue={this.props.data ? this.props.data.industryId : ""}
                                />
                </div>
                <div className="form-group">
                  <Select
                    name="form-field-name"
                    multi
                    options={options}
                    placeholder='Conversation Type'
                    disabled={this.props.data.mode === 'online'?false: true}
                    defaultValue={ this.props.data ? this.props.data.conversation : ""}
                    value={ this.props.data ? this.props.data.conversation : ""}
                    onChange={(e)=>this.props.conversation(e,'conversation')} >
                  </Select>
                </div>
                <div className="form-group">
                  <div className="form-group">
                    <Select
                      className="form-field-name"
                      options={frequencyOptions}
                      placeholder="Frequency"
                      defaultValue={ this.props.data ? this.props.data.sessionFrequency : "" }
                      value={ this.props.data ? this.props.data.sessionFrequency : "" }
                      disabled={this.state.disableMode}
                      onChange={(e)=>this.props.frequency(e,"sessionFrequency")}>
                    </Select>
                  </div>
                </div>
                <div className="form-group">
                  <textarea className="form-control float-label" disabled={this.state.disableMode} placeholder="Expected Output" name="expectedOutput" defaultValue={this.props.data.expectedOutput} onChange={(e)=>this.props.dataToSet(e.target.value,"expectedOutput")} ></textarea>
                </div>
                <div className="clearfix"/>
          <div className="col-lg-6 col-md-6 col-sm-12 library-wrap nopadding-left hide_panel" style={{"width": "590px"}}>
            <div className="panel panel-default uploaded_files">
              <div className="panel-heading">
              Attachments if any ?
                <span className="see-more pull-right" onClick={this.toggleSeeMore.bind(this)}>See More</span>
                {/*<span className="see-less pull-right" style={{'display':'none'}}><a href="">See Less</a></span>*/}
                <div className="pull-right block_action">
                  <div className="fileUpload upload_file_mask pull-right" id="create_client">
                    <a href="javascript:void(0);">
                      <span className="ml ml-upload">
                        <input type="file" className="upload_file upload"
                            name="video_source" id="video_upload"
                            onChange={e=>that.props.fileUpload(e)} />
                      </span>
                    </a>
                  </div>
                </div>
                <div className="pull-right block_action">
                  <span className="single_icon ml ml-information information"></span>
                </div>
              </div>
              <div className="panel-body" onContextMenu={(e) => e.preventDefault()}>
              <p className="show-information" style={{ 'display': 'none' }}>Document Format : .png, .jpg, .jpeg , .doc, .docx, .xls, .xlsx, .pdf<br/>Document Size : 10 MB <br/></p>
                <div className="swiper-container manage_tasks">
                  <div className="manage_swiper swiper-wrapper">
                  {attach.map(function(details, index){return(
                   <div className="upload-image">
                      <img src={generateAbsolutePath(details.fileUrl)} id="output"/>
                  </div> )})}        
                </div>
              </div>
            </div>
          </div>
        </div>
              </form>
            </div>
          </div>
          </div>
          <br className="brclear"/>
          {!this.state.disableMode ?<div className="ml_btn" style={{'textAlign':'center'}}>
            <a href="" className="save_btn" onClick={this.saveData.bind(this)} >Save</a>
            <a href="" className="cancel_btn" onClick={this.cancel.bind(this)}>Cancel</a>
          </div>:<div></div>}

          <br className="clearfix"/>
        </div>
      </div> : <BeSpokeAttachment
                  attach={attach}  
                  toggleSeeMore={this.toggleSeeMore.bind(this)}
                  fileUpload = {this.props.fileUpload.bind(this)}
                  />
    )
  }
};
