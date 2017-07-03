/** ************************************************************
 * Date: 19 Jun, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This will manage the activities basic information
 * JavaScript XML file MlAppActivityBasicInfo.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React from 'react';
import ScrollArea from 'react-scrollbar';
import Moolyaselect from  '../../../../../commons/components/select/MoolyaSelect'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {multipartASyncFormHandler} from '../../../../../commons/MlMultipartFormAction'
let FontAwesome = require('react-fontawesome');
let Select = require('react-select');

/**
 * Initialize conversation types
 */
const options = [
  {value: 'audio', label: 'Audio'},
  {value: 'video', label: 'Video'},
  {value: 'meetup', label: 'MeetUp'}
];

export default class MlAppBasicInfo extends React.Component{

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props){
    super(props);
    this.state ={
      basicData : {
        name                  : "",
        displayName           : "",
        isInternal            : false,
        isExternal            : false,
        mode                  : "online",
        isServiceCardEligible : false,
        industryTypes         : [],
        duration              : {},
        deliverable           : [''],
        note                  : '',
        imageLink             : '',
        conversation          : []
      },
    };
  }

  /**
   * Component Will Receive Props
   * Desc :: Set basic date in steps from props
   * @param props :: Object - Parents data
   */
  componentWillReceiveProps(props){
    let id = FlowRouter.getQueryParam('id');
    if(id) {
      this.setState({
        basicData: props.data
      });
    }
  }

  /**
   * Method :: selectIndustry
   * Desc   :: update industry data in state
   * @param value :: Object :: Selected industries
   * @returns Void
   */
  selectIndustry(value) {
    let data = this.state.basicData;
    data.industryTypes = value;
    this.setState({
      basicData: data
    });
  }

  /**
   * Method :: updateConversation
   * Desc   :: update conversation data in state
   * @param value :: Object :: Selected conversation types
   * @returns Void
   */
  updateConversation(value) {
    let data = this.state.basicData;
    data.conversation = value.map(function (data) {
      return data.value;
    });
    this.setState({
      basicData: data
    });
  }

  /**
   * Method :: updateDuration
   * Desc   :: update state duration data
   * @param evt  :: Object :: javascript event object
   * @param type :: String :: type of duration hours or minutes
   * @returns Void
   */
  updateDuration(evt, type){
    if(evt.target.value >= 0 ) {
      let data = this.state.basicData;
      data.duration[type] = evt.target.value;
      this.setState({
        basicData: data
      });
    }
  }

  /**
   * Method :: textFieldSaves
   * Desc   :: update input and input area text in state
   * @param type :: String :: type of field in state data
   * @param evt  :: Object :: javascript event object
   * @returns Void
   */
  textFieldSaves(type,evt){
    let data = this.state.basicData;
    data[type] = evt.target.value;
    this.setState({
      basicData: data
    });
  }

  /**
   * Method :: checkBoxHandler
   * Desc   :: update checkbox flag in state
   * @param type :: String :: type of field in state data
   * @param evt  :: Object :: javascript event object
   * @returns Void
   */
  checkBoxHandler(type,evt){
    let data = this.state.basicData;
    data[type] = evt.target.checked;
    this.setState({
      basicData: data
    });
  }

  /**
   * Method :: changeMode
   * Desc   :: update mode in state
   * @param evt  :: Object - javascript event object
   * @returns Void
   */
  changeMode(evt){
    let data = this.state.basicData;
    if(evt.target.checked){
      data.mode = 'offline';
    } else {
      data.mode = 'online';
    }
    this.setState({
      basicData: data
    });
  }

  /**
   * Method :: onFileUpload
   * Desc   :: Upload img on server and set response data in state
   * @returns Void
   */
  async onFileUpload() {
    const that = this;
    let user = {
      profile: {
        InternalUprofile: {moolyaProfile: {profileImage: " "}}
      }
    };
    let file = document.getElementById("profilePic").files[0];
    if (file) {
      let data = {moduleName: "PROFILE", actionName: "UPDATE", user: user};

      /**
       * Call the multipartASyncFormHandler to upload file
       */
      let response = await multipartASyncFormHandler(data, file, 'registration', function (res) {
        res = JSON.parse(res);
        if(res.success){
          let data = that.state.basicData;
          data.imageLink = res.result;
          that.setState({
            basicData : data
          });
        }
      });
      return response;
    }
  }

  /**
   * Method :: saveDetails
   * Desc   :: save activity details
   * @returns Void
   */
  async saveDetails(){
    const that = this;
    let profileId = FlowRouter.getParam('profileId');
    let data = that.state.basicData;
    let duration = data.duration;

    /**
     * Remove duration key if they are not in int format
     */
    if(!parseInt(duration.hours)){
      delete duration.hours;
    }
    if(!parseInt(duration.minutes)){
      delete duration.minutes;
    }
    if(data.mode !== 'online') {
      delete data.conversation;
    }
    data.duration = duration ;
    that.props.saveActivity(data);
  }

  /**
   * Method :: addDeliverables
   * Desc   :: Add new deliverable after a specific index
   * @param index :: Integer - Index of deliverable
   * @param evt   :: Object  - javascript event object
   * @returns Void
   */
  addDeliverables(index, evt) {
    let data = this.state.basicData;
    data.deliverable.splice(index+1, 0, '');
    this.setState({
      basicData: data
    });
  }

  /**
   * Method :: removeDeliverables
   * Desc   :: remove deliverable of specific index
   * @param index :: Integer - Index of deliverable
   * @param evt   :: Object  - javascript event object
   * @returns Void
   */
  removeDeliverables(index,evt) {
    let data = this.state.basicData;
    data.deliverable.splice(index, 1);
    this.setState({
      basicData: data
    });
  }

  /**
   * Method :: deliverableData
   * Desc   :: update deliverable data of specific index
   * @param index :: Integer - Index of deliverable
   * @param evt   :: Object  - javascript event object
   * @returns Void
   */
  deliverableData(evt, index) {
    let data = this.state.basicData;
    data.deliverable[index] = evt.target.value;
    this.setState({
      basicData: data
    });
  }

  /**
   * Component Did Mount
   * Desc :: intilize float labels
   */
  componentDidMount() {
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.admin_header').outerHeight(true)));
  }

  /**
   * Render
   * Desc   :: Render the HTML for this component
   * @returns {HTML}
   */
  render() {
    const that = this;
    /**
     * fetch industries graphql query
     */
    let industryTypeQuery = gql` query{
                               data:fetchIndustries{label:industryName,value:_id}
                                  }`;

    /**
     * Return the html to render
     */
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input className="form-control float-label" placeholder="Activity Name" value={( that.state.basicData.name ? that.state.basicData.name : '' )} onChange={this.textFieldSaves.bind(that,"name")}/>
                </div>
                <div className="form-group">
                  <div className="input_types">
                    <input id="internalCheckbox" name="internalCheckbox" type="checkbox"  onChange={that.checkBoxHandler.bind(that, "isInternal")} checked={this.state.basicData.isInternal} value="Internal"/>
                    <label htmlFor="internalCheckbox">
                      <span><span></span></span>
                      Internal
                    </label>
                  </div>
                  <div className="input_types">
                    <input id="externalCheckbox" name="externalCheckbox" type="checkbox"  onChange={that.checkBoxHandler.bind(that, "isExternal")} checked={this.state.basicData.isExternal} value="External"/>
                    <label htmlFor="externalCheckbox">
                      <span><span></span></span>
                      External
                    </label>
                  </div>
                  <br className="brclear"/>
                </div>
                <div className="form-group">
                  <span className="placeHolder active">Conversation type</span>
                  <div className="form-group">
                    <Select name="form-field-name"
                            multi={true}
                            disabled={that.state.basicData.mode !== 'online'}
                            valueKey={'value'}
                            labelKey={'label'}
                            options={options}
                            value={this.state.basicData.conversation}
                            placeholder='Conversation Type'
                            onChange={this.updateConversation.bind(this)} />
                  </div>
                </div>
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="Notes" value={that.state.basicData.note} onChange={that.textFieldSaves.bind(that, "note")}></textarea>
                </div>
                <div className="form-group">
                  <label>Duration: &nbsp;
                    <div className="clearfix"></div>
                    Hours
                    <div className="form-group ">
                      <input type="number" onChange={(evt)=>that.updateDuration(evt , 'hours')} value={that.state.basicData.duration.hours ? that.state.basicData.duration.hours : '' }  className="form-control "/>
                    </div>
                    Mins
                    <div className="form-group ">
                      <input type="number" onChange={(evt)=>that.updateDuration(evt , 'minutes')} value={that.state.basicData.duration.minutes ? that.state.basicData.duration.minutes : '' }  className="form-control "/>
                    </div>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input className="form-control float-label" placeholder="Display Name" value={that.state.basicData.displayName} onChange={that.textFieldSaves.bind(that,"displayName")}/>
                </div>
                <div className="form-group switch_wrap switch_names inline_switch">
                  <label>Activity Mode</label>
                  <span className="state_label">
                    Online
                  </span>
                  <label className="switch nocolor-switch">
                    <input type="checkbox" checked={this.state.basicData.mode !== 'online'} onChange={(evt) => that.changeMode(evt)}/>
                    <div className="slider"></div>
                  </label>
                  <span className="state_label acLabel">
                    Offline
                  </span>
                </div>

                <Moolyaselect multiSelect={true}
                              className="form-control float-label"
                              valueKey={'value'}
                              labelKey={'label'}
                              queryType={"graphql"}
                              query={industryTypeQuery}
                              isDynamic={true} placeholder="Select Industry Type"
                              onSelect={that.selectIndustry.bind(that)}
                              selectedValue={that.state.basicData.industryTypes}
                />

                <div className="previewImg ProfileImg">
                  <img src={ that.state.basicData.imageLink ? that.state.basicData.imageLink :'/images/def_profile.png'}/>
                </div>
                <div className="form-group">
                  <div className="fileUpload mlUpload_btn">
                    <span>Upload Image</span>
                    <input type="file" className="upload" id="profilePic"  onChange={that.onFileUpload.bind(that)} />
                  </div>
                  <br className="brclear"/>
                </div>
                <div className="form-group">
                  <div className="input_types">
                    <input id="isServiceCardEligible" type="checkbox" name="check1" value="true" checked={that.state.basicData.isServiceCardEligible} onChange={that.checkBoxHandler.bind(that, "isServiceCardEligible")}/>
                    <label htmlFor="isServiceCardEligible" ><span><span></span></span>
                      Eligible for service card
                    </label>
                  </div>
                  <br className="brclear"/>
                </div>
              </form>
            </div>
          </div>
          <br className="brclear"/>
          {that.state.basicData.deliverable.map(function (data, index) {
            return (
              <div className="panel panel-default" key={index}>
                <div className="panel-heading">
                  Deliverables
                  <span className="see-more pull-right">
                    <FontAwesome name='plus-square' onClick={that.addDeliverables.bind(that, index)} />
                    <FontAwesome name='minus-square' onClick={that.removeDeliverables.bind(that,index)} />
                  </span>
                </div>
                <div className="panel-body">
                  <textarea className="form-control" value={data} onChange={(evt) => that.deliverableData(evt,index)}></textarea>
                </div>
              </div>
            )
          })}
        </ScrollArea>
        <div className="ml_btn" style={{'textAlign':'center'}}>
          <div className="save_btn" onClick={this.saveDetails.bind(this)}>Save</div> <div className="cancel_btn">Cancel</div>
        </div>
      </div>
    )
  }
};


