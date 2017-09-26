import React, {Component} from "react";
import {render} from "react-dom";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {multipartASyncFormHandler} from '../../../../../../../commons/MlMultipartFormAction'
import Moolyaselect from  '../../../../../../commons/components/MlAdminSelectWrapper'
import _ from "lodash";
var FontAwesome = require('react-fontawesome');


var Select = require('react-select');

export default class  BeSpokeView extends Component {
  constructor(props) {
    super(props)
    this.state = {updateMode: false}
  }

  componentDidMount() {
    $('.float-label').jvFloat();
  }

  saveData() {
    console.log("this.props.data:",this.props.data);
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
    let attach = this.props.data && this.props.data.attachments? this.props.data.attachments : [{}];
    let industryTypeQuery = gql`
    query{
    data:fetchIndustries{label:industryName,value:_id}
    }
    `

    return(
      <div>
        <div className="tab_wrap_scroll">
          <div className="col-md-12 nopadding">
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input type="text" className="form-control float-label" placeholder="Display Name" name="displayName" defaultValue={this.props.data.displayName} onChange={(e)=>this.props.dataToSet(e.target.value,"displayName")} ></input>
                </div>
                <div className="form-group switch_wrap switch_names">
                  <span className="state_label">Online
                  </span>
                  <label className="switch nocolor-switch">
                    <input type="checkbox" name="mode" checked={this.props.data.mode === 'online'?false: true} onChange={(e)=>this.props.modeSwitchHandler(e.target.checked,"mode")}  />
                    <div className="slider">
                    </div>
                  </label>
                  <span className="state_label acLabel">Offline</span>
                </div>
                <div className="clearfix"/>
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="About" name="about" onBlur={(e)=>this.props.dataToSet(e.target.value,"about")} defaultValue={this.props.data.about} ></textarea>
                </div>
                <div className="form-group">
                  <label>Required number of Sessions <input type="number" min="0"  name="noOfSession" onChange={(e)=>this.props.dataToSet(e.target.value,"noOfSession")} defaultValue={this.props.data.noOfSession}  className="form-control inline_input medium_in"/> </label>
                </div>
                <div className="form-group">
                  <label>Duration &nbsp;
                    <input type="number" value={this.props.data.duration && this.props.data.duration.hours ? this.props.data.duration.hours : '' }  min="0"  name="hours" onChange={(e)=>this.props.duration(e.target.value,"hours")} className="form-control inline_input"/> Hours
                    <input type="number" value={this.props.data.duration && this.props.data.duration.minutes ? this.props.data.duration.minutes : '' } name="minutes" min="0"  onChange={(e)=>this.props.duration(e.target.value,"minutes")} className="form-control inline_input"/> Mins </label>
                </div>
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="Expected input" name="expectedInput" defaultValue={this.props.data.expectedInput} onChange={(e)=>this.props.dataToSet(e.target.value,"expectedInput")} ></textarea>
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
                                selectedValue={this.props.data ? this.props.data.industryId : ""}
                                />
                </div>

                <div className="form-group">
                  <Select
                    name="form-field-name"
                    multi
                    options={options}
                    placeholder='Conversation Type'
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
                      onChange={(e)=>this.props.frequency(e,"sessionFrequency")}>
                    </Select>
                  </div>
                </div>
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="Expected Output" name="expectedOutput" defaultValue={this.props.data.expectedOutput} onChange={(e)=>this.props.dataToSet(e.target.value,"expectedOutput")} ></textarea>
                </div>
                <div className="clearfix"/>
                {
                  attach.map(function(details, index){
                    return(
                      <div className="panel panel-default step5" key={index}>
                        <div className="panel-heading">Attachments if any ?
                          <div className="pull-right block_action">
                            <div className="fileUpload upload_file_mask" onClick={() => that.props.addComponent()} >
                              &nbsp;&nbsp;<span className="ml ml-plus" ></span>
                            </div>
                          </div>
                          <div className="pull-right">
                            {/*style={{'marginTop': '-15px'}}*/}
                            {/*<input type="text" placeholder="Document Name" />*/}
                          </div>
                        </div>
                        <div className="panel-body nopadding">
                          <div className="upload-file-wrap">
                            {/*<input type="file" name="logo" id="logoFileinput" className="inputfile inputfile-upload" data-multiple-caption="{count} files selected" accept="image/*" onChange={(e)=>that.props.fileUpload(e, index)} multiple />*/}
                            {/*<label htmlFor="logoFileinput">*/}
                            <input type="file" className="inputfile inputfile-upload"  name="fileinput[]" id="fileinput" onChange={(e)=>that.props.fileUpload(e, index)}  />
                            {/*<input type="file" name="fileinput[]" id="fileinput" className="inputfile inputfile-upload"*/}
                            {/*data-multiple-caption="{count} files selected" accept="image/*" onchange="loadFile(event)"*/}
                            {/*multiple/>*/}
                            <label htmlFor="fileinput">
                              <figure>
                                <i className="fa fa-upload" aria-hidden="true"></i>
                              </figure>
                            </label>
                          </div>
                          {details.fileUrl ? details.fileUrl.map(function(image, id){
                            return(
                              <div className="upload-image">
                                <FontAwesome className="pull-right" onClick={()=>that.props.deleteAttachments(id, index)} name='minus'/>
                                <img src={image} id="output"/>
                              </div>
                            )
                          }): [] }
                          <div className="upload-image"></div>
                        </div>
                      </div>
                    )})
                }
              </form>
            </div>
          </div>
          </div>
          <br className="brclear"/>
          <div className="ml_btn" style={{'textAlign':'center'}}>
            <a href="" className="save_btn" onClick={this.saveData.bind(this)} >Save</a>
            <a href="" className="cancel_btn" onClick={this.cancel.bind(this)}>Cancel</a>
          </div>
        
          <br className="clearfix"/>
        </div>
      </div>
    )
  }
};
