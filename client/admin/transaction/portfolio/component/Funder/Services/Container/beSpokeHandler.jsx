import React, {Component} from "react";
import {render} from "react-dom";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {multipartASyncFormHandler} from '../../../../../../../commons/MlMultipartFormAction'
import {fetchServicesActionHandler, createBeSpokeServiceActionHandler, fetchBeSpokeServicesActionHandler, updateBeSpokeServiceActionHandler} from '../../../../../../../app/calendar/manageScheduler/service/actions/MlServiceActionHandler'
import Moolyaselect from  '../../../../../../commons/components/MlAdminSelectWrapper'
import _ from "lodash";
import BeSpokeView from '../Presentation/beSpokeView'


var Select = require('react-select');

export default class  BeSpokeHandler extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedIndustryType:[],
      responsePic:[],
      attachmentDocs:[{}],
      uploadedProfilePic:"",
      data:{},
      emptyData:{},
      selectedIndex: 0,
      funderService: [],
      selectedFrequencyType:[],
      saveData: false,
      updateData: false,
      mode: false,
      details:{
        mode: 'offline'
      }
    };
    this.handleBlur.bind(this);
    this.onOptionSelected.bind(this);
    this.saveBeSpokeServiceDetails.bind(this)
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
    if(this.props.beSpokeDetails){
      let details = this.props.beSpokeDetails[this.props.beSpokeIndex];
      this.setState({details:details})
      console.log(details)
      let mode = this.props.beSpokeDetails[this.props.beSpokeIndex].mode;
      if(mode === 'offline')
        this.setState({mode: true})
        else
          this.setState({mode: false})
      }
    }

  /**
   * Method :: handleBlur
   * Description :: Every text fields hits this function onBlur and respective data is stored in data Object
   * @params ::  event Handler
   * returns ::  data is redirected to sendDataToParent()
   **/


  handleBlur(value, name) {
    let details = this.state.details;
    details = _.omit(details, [name]);
    details = _.extend(details, {[name]: value});
    this.setState({details: details})
    if(name === "hours"){
      this.setState({hour: value})
      this.handleDuration()
    }else if(name === "minutes"){
      this.setState({minute: value})
      this.handleDuration();
    }
  }

  handleDuration() {
    let duration = {
      hours: this.state.hour?parseInt(this.state.hour):0,
      minutes: this.state.minute?parseInt(this.state.minute):0
    }
    let details = this.state.details;
    details = _.omit(details, ['duration']);
    details = _.extend(details, {['duration']:duration});
    this.setState({details: details})
  }

  /**
   * Method :: sendDataToParent
   * Description :: Sends data in the form of an Object back to the parent
   * @params ::  No params
   * returns ::  this.props.getServiceDetails(funderService)
   **/


  async updateBeSpokeData(data){
    if(data){
      let detailsData = _.cloneDeep(this.state.details);
       _.omit(detailsData.duration, '__typename')
      let service = _.omit(detailsData, '__typename');
      const resp = await updateBeSpokeServiceActionHandler(service, this.props.portfolioDetailsId)
      if(resp && resp.success) {
        toastr.success("Bespoke request updated successfully");
        this.props.componentToView('landingPage');
      } else {
        if(!resp) {
          toastr.error("No response from server");
        } else {
          toastr.error(res.result);
        }
      }
      return resp;
    }
  }


   async saveBeSpokeServiceDetails(data){
    if(data){
      const res = await createBeSpokeServiceActionHandler(this.state.details, this.props.portfolioDetailsId);
      if(res && res.success) {
        toastr.success("Bespoke request created successfully");
        this.props.componentToView('landingPage');
      } else {
        if(!res) {
          toastr.error("No response from server");
        } else {
          toastr.error(res.result);
        }
      }
    }
  }


  /**
   * Method :: onOptionSelected
   * Description :: Multi-select to determine the types of industries
   * @params ::  selectedIndustry : type :: String
   * returns ::  data is redirected to sendDataToParent()
   **/

  onOptionSelected(selectedIndustry) {
    let details = this.state.data;
    details['industryId'] = selectedIndustry;
    this.setState({details: details})
  }

  /**
   * Method :: onConversationSelected
   * Description :: Multi-select to determine the types of conversation
   * @params ::  selectedConversation : type :: String
   * returns ::  data is redirected to sendDataToParent()
   **/


  onConversationSelected(selectedConversation) {
    let temp = []
    selectedConversation.map(function(data){
      temp.push(data.label)
    })
    let details = this.state.details;
    details['conversation'] = temp;
    this.setState({details: details}, function(){
      console.log(this.state.details)
    })
  }


  onFrequencySelected(selectedFrequency) {
    let details = this.state.details;
    details['sessionFrequency'] = selectedFrequency.value;
    this.setState({details: details}, function () {
      console.log(this.state.details)
    })
  }

  /**
   * Method :: modeSwitchHandler
   * Description :: Checkbox to determine the mode of operation
   * @params ::  event handler
   * returns ::  data is redirected to sendDataToParent()
   **/

  modeSwitchHandler(response, name){
    let details = this.state.details;
    details = _.omit(details, [name]);
    details = _.extend(details, {[name]: response?"offline":"online"});
    this.setState({details: details})
  }

  /**
   * Method :: onFileUpload
   * Description :: File uploading action is done here. Once uploaded it hits onFileUploadCallBack()
   * and the return to current function and call storeImage()
   * returns :: Hits onFileUploadCallBack()
   * **/
  async onFileUpload(e, index) {
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
    let details = this.state.details;
    let tempObject = [];
    if (resp) {
      this.setState({uploadedProfilePic: resp});
      var temp = $.parseJSON(resp).result;
      if(details['attachments'] && Object.keys(details['attachments'][index]).length > 0 && details['attachments'][index].fileUrl.length > 0) {
        tempObject.push({fileUrl: temp})
        details['attachments'][index].fileUrl.push(temp);
        // attach[index].images = tempObject
      }else {
        tempObject.push(temp)
        if(!details['attachments']){
          details['attachments'] = [{}];
        }
        details['attachments'][index].fileUrl = tempObject;
      }
      return temp;
    }
  }

  addComponent() {
    let details =  this.state.details;
    if(details['attachments']){
      details['attachments'].push({})
      this.setState({details: details})
    }else{
      details['attachments'] = [{}];
      details['attachments'].push({})
      this.setState({details: details})
    }
    // details['attachments'] = [{}
  }

  documentName(index, e) {
    let attach = this.state.attachmentDocs;
    let temp = e.target.value;
    attach[index].documentName = temp;
    this.setState({attachmentDocs: attach})
  }

  DataToBeSet(response, name){
    if(name === 'mode'){
      let details = this.state.details;
      details = _.omit(details, [name]);
      details = _.extend(details, {[name]: response?'offline':'online'});
      this.setState({details: details})
      console.log(this.state.details)
    }else{
      let details = this.state.details;
      details = _.omit(details, [name]);
      details = _.extend(details, {[name]: response});
      this.setState({details: details}, function(){
        console.log(this.state.details)
      })
    }
  }

  render() {
    return(
      <BeSpokeView
          saveBeSpokeServiceDetails={this.saveBeSpokeServiceDetails.bind(this)}
          updateBeSpokeData={this.updateBeSpokeData.bind(this)}
          dataToSet={this.DataToBeSet.bind(this)}
          data={this.state.details}
          addComponent={this.addComponent.bind(this)}
          conversation={this.onConversationSelected.bind(this)}
          frequency={this.onFrequencySelected.bind(this)}
          industry={this.onOptionSelected.bind(this)}
          duration={this.handleBlur.bind(this)}
          fileUpload={this.onFileUpload.bind(this)}
          modeSwitchHandler={this.modeSwitchHandler.bind(this)}
          componentToView={this.props.componentToView}
    />
    )
  }
};
