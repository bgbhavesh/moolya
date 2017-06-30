/**
 * Created by Mukhil on 19/6/17.
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import Moolyaselect from  '../../../../../commons/components/select/MoolyaSelect'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { createActivityActionHandler , getActivityActionHandler, updateActivityActionHandler}  from './../actions/activityActionHandler';
import {multipartASyncFormHandler} from '../../../../../commons/MlMultipartFormAction'

var Select = require('react-select');
var options = [
  {value: 'Audio', label: 'Audio'},
  {value: 'Video', label: 'Video'},
  {value: 'MeetUp', label: 'MeetUp'}
];

export default class MlAppCreateTeam extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      radioAction: "",
      radioAction2: "",
      selectedIndustryType:[],
      activityName:"",
      displayName:"",
      notes:"",
      isInternal:false,
      isExternal:false,
      serviceCard:"",
      conversationType:[],
      isVideo:false,
      isAudio:false,
      isMeetUp:false,
      data:"",
      mode:"",
      online:false,
      offline:false,
      responsePic:"",
      editScreen: false,
      deliverable:[" "]
    }
    this.radioAction = this.radioAction.bind(this)
    // this.radioAction2 =  this.radioAction2.bind(this)
    // this.conversation =  this.conversation.bind(this);
    this.saveDetails.bind(this);
    this.getDetails.bind(this)
  }

  componentWillMount(){
    this.getDetails()
  }

  async getDetails(){
    let id = FlowRouter.getQueryParam('id')
    if(!id) {
      this.setState({editScreen:false})
    }else {
      this.setState({editScreen: true})

      const resp = await getActivityActionHandler(id);
      console.log(resp)
      if(resp) {
        this.setState({data: resp})
        this.setState({
          activityName: resp.name, displayName: resp.displayName, hour: resp.duration.hours,
          minute: resp.duration.minutes, isExternal: resp.isExternal,
          isInternal: resp.isInternal, radioAction: resp.mode, serviceCard: resp.isServiceCardElligible,
          notes: resp.note, responsePic: resp.imageLink
        })
        let industries = [];
        resp.industryTypes.map(function (indi) {
          industries.push(indi)
        })
        let deli = [];
        resp.deliverable.map(function(del){
          deli.push(del)
        })
        this.setState({deliverable:deli})
        this.setState({selectedIndustryType: industries})
        if (this.state.radioAction === "online") {
          this.setState({online: true, offline: false})
        } else {
          this.setState({online: false, offline: true})
        }
        if (resp.conversation) {
          this.setState({
            isVideo: resp.conversation.isVideo,
            isAudio: resp.conversation.isAudio,
            isMeetUp: resp.conversation.isMeetUp
          })
          let temp = []
          if (this.state.isMeetUp & this.state.isAudio) {
            temp.push("Meetup", "Audio")
          } else if (this.state.isMeetUp & this.state.isVideo) {
            temp.push("Meetup")
            temp.push("Video")
          } else if (this.state.isAudio & this.state.isVideo) {
            temp.push("Audio", "Video")
          } else if (this.state.isAudio & this.state.isVideo & this.state.isMeetUp) {
            temp.push("Audio", "Video", "Meetup")
          }
          else if (this.state.isVideo) {
            temp.push("Video")
          } else if (this.state.isAudio) {
            temp.push("Audio")
          } else if (this.state.isMeetUp) {
            temp.push("Meetup")
          }
          this.setState({conversationType: temp})
        }
      }
      // console.log(this.state.activityName)
      return resp;
    }
  }

  radioAction(e){
    let value = e.target.value;
    this.setState({radioAction: value})
    if(value === "online"){
      this.setState({online:true, offline:false})
    } else {
      this.setState({offline:true, online:false})
    }
  }
  //
  // radioAction2(e) {
  //   this.setState({radioAction: value})
  //   if(value === "online"){
  //     this.setState({online:true, offline:false})
  //   } else {
  //     this.setState({offline:true, online:false})
  //   }
  // }

  SelectIndustry(value){
    this.setState({selectedIndustryType:value})

  }
  updateHours(e){
    if(e.currentTarget.value >= 0) {
      this.setState({"hour":e.currentTarget.value});
    } else {
      this.setState({"hour":0});
    }
  }

  updateMinutes(e){
  if(e.currentTarget.value >= 0) {
    this.setState({"minute":e.currentTarget.value});
  } else {
    this.setState({"minute":0});
  }
}

  textFieldSaves(type,e){
    switch(type){
      case "ActivityName":
        let activityNameValue = e.target.value;
        this.setState({activityName:activityNameValue})
        break;
      case "DisplayName":
        let displayNameValue = e.target.value;
        this.setState({displayName:displayNameValue})
        break;
      case "Notes":
        let notesValue = e.target.value;
        this.setState({notes:notesValue})
        break;
    }
  }

  checkBoxHandler(type,e){
    switch(type){
      case "ServiceCard":
        let service = e.target.checked;
        this.setState({serviceCard:service})
            break;
      case "Internal":
        let internal = e.target.checked;
        this.setState({isInternal:internal})
            break;
      case "External":
        let external = e.target.checked;
        this.setState({isExternal:external})
            break;
    }
  }

  async onFileUpload() {
    let user = {
      profile: {
        InternalUprofile: {moolyaProfile: {profileImage: " "}}
      }
    }
    let file = document.getElementById("profilePic").files[0];
    if (file) {
      let data = {moduleName: "PROFILE", actionName: "UPDATE", user: user}
      let response = await multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this));
      return response;
    }
  }

  onFileUploadCallBack(resp) {
    if (resp) {
      console.log(resp);
      this.setState({"uploadedProfilePic": resp});
      var temp = $.parseJSON(this.state.uploadedProfilePic).result;
      this.setState({"responsePic": temp});
      this.showImage(temp);
      return temp;
    }
  }
  async showImage(temp) {
    this.setState({responsePic: temp})
    console.log(this.state.responsePic)
  }


  conversation(val) {
    let that = this
    var temp = [];
    val.map(function(label){
      temp.push(label.value)
    })
    that.setState({conversationType:temp})
      temp.map(function(label) {
        if (label === "Video") {
          that.setState({isVideo: true })
        } else if (label === "Audio") {
          that.setState({isAudio: true})
        } else if(label === "MeetUp") {
          that.setState({isMeetUp: true })
        }
      })


  }

  async saveDetails(){
    let profileId = FlowRouter.getParam('profileId')
    let step1Details = {
      userId:" ",
      profileId:profileId,
      name: this.state.activityName,
      displayName:this.state.displayName,
      isInternal:this.state.isInternal,
      isExternal:this.state.isExternal,
      mode:this.state.radioAction,
      note:this.state.notes,
      deliverable:this.state.deliverable,
      industryTypes:this.state.selectedIndustryType,
      duration:{
        hours:this.state.hour,
        minutes:this.state.minute
      },
      conversation:{
        isVideo:this.state.isVideo,
        isAudio:this.state.isAudio,
        isMeetUp:this.state.isMeetUp
      },
      imageLink:this.state.responsePic,
      isServiceCardElligible:this.state.serviceCard,
    }
    if(this.state.editScreen) {
      let id = FlowRouter.getQueryParam('id')
      let profileId = FlowRouter.getParam('profileId')
      const res = await updateActivityActionHandler(id,step1Details)
      this.getDetails();
      if(res) {
        toastr.success("Saved Successfully")
        FlowRouter.go('/app/calendar/manageSchedule/'+profileId+'/editActivity/?id='+id)
        return res;
      }
    }
    const resp = await createActivityActionHandler(step1Details);
    if(resp) {
      toastr.success("Saved Successfully")
      FlowRouter.go('/app/calendar/manageSchedule/'+profileId+'/editActivity/?id='+id)
    }
    let id = resp.result;
    this.props.setId(id)
    FlowRouter.setQueryParams({id:id})
    this.getDetails();
  }

    addDeliverables() {
    let deli = this.state.deliverable || []
      deli.push("")
      this.setState({deliverable:deli})
    }

  removeDeliverables(index,e) {
    let deli = this.state.deliverable || []
    deli.splice(index,1)
    this.setState({
      deliverable: deli
    })
  }


   deliverableData(index,e) {
    let deli = this.state.deliverable
    deli[index] = e.target.value;
    this.setState({
      deliverable: deli
    })
  }


  componentDidMount()
  {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.admin_header').outerHeight(true)));
  }
  render(){
let that = this;
    let industryTypeQuery = gql`
    query{
    data:fetchIndustries{label:industryName,value:industryName}
    }
    `
    const deliverables = that.state.deliverable || []
   const deli =  deliverables.map(function(data, index){

    return (
      <div className="panel panel-default">
        <div className="panel-heading">Deliverables <span className="see-more pull-right"><FontAwesome name='plus-square' onClick={that.addDeliverables.bind(that)} /><FontAwesome name='minus-square' onClick={that.removeDeliverables.bind(that,index)} /></span></div>
        <div className="panel-body">
          <textarea className="form-control" value={data} onChange={that.deliverableData.bind(that,index)}></textarea>
        </div>
      </div>
    )
   })
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input className="form-control float-label" placeholder="Activity Name" value={this.state.activityName} onChange={this.textFieldSaves.bind(this,"ActivityName")}/>
                </div>
                <div className="form-group">
                  <div className="input_types">
                    <input id="checkbox1" type="checkbox"  onChange={this.checkBoxHandler.bind(this, "Internal")} checked={this.state.isInternal} value="Internal"/><label htmlFor="radio1"><span><span></span></span>Internal</label>
                  </div>
                  <div className="input_types">
                    <input id="checkbox2" type="checkbox"  onChange={this.checkBoxHandler.bind(this, "External")} checked={this.state.isExternal} value="External"/><label htmlFor="radio2"><span><span></span></span>External</label>
                  </div>
                  <br className="brclear"/>
                </div>
                {this.state.radioAction === "online"? <div className="form-group">
                  <span className="placeHolder active">Conversation type</span>
                  <div className="form-group">
                    <Select name="form-field-name"  multi={true} options={options} value={this.state.conversationType} placeholder='Conversation Type' onChange={this.conversation.bind(this)} />
                  </div>
                </div> : <div></div>}
                <div className="form-group">
                  <textarea className="form-control float-label" placeholder="Notes" value={this.state.notes} onChange={this.textFieldSaves.bind(this,"Notes")}></textarea>
                </div>
                <div className="form-group">
                  <label>Duration: &nbsp;
                    <div className="form-group ">
                      <input type="number" onChange={(e)=>this.updateHours(e)} value={this.state.hour}  className="form-control "/>
                    </div>Hours
                    <div className="form-group ">
                      <input type="number" onChange={(e)=>this.updateMinutes(e)} value={this.state.minute}  className="form-control "/>
                    </div>
                    Mins
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <form>
                <div className="form-group">
                  <input className="form-control float-label" placeholder="Display Name" value={this.state.displayName} onChange={this.textFieldSaves.bind(this,"DisplayName")}/>
                </div>
                <div className="form-group">
                  <div className="input_types">
                    <input id="Online" type="radio" name="radio1" value="online" checked={this.state.online} onChange={this.radioAction}/><label htmlFor="Online" ><span><span></span></span>Online</label>
                  </div>
                  <div className="input_types">
                    <input id="Offline" type="radio" name="radio1" value="offline" checked={this.state.offline} onChange={this.radioAction} /><label htmlFor="Offline"  ><span><span></span></span>Offline</label>
                  </div>
                  <br className="brclear"/>
                </div>
                <Moolyaselect multiSelect={true} className="form-control float-label" valueKey={'value'}
                              labelKey={'label'} queryType={"graphql"} query={industryTypeQuery}
                              isDynamic={true} placeholder="Select Industry Type"
                              onSelect={this.SelectIndustry.bind(this)}
                              selectedValue={this.state.selectedIndustryType} value={this.state.selectedIndustryType}/>
                <div className="previewImg ProfileImg">
                  <img src={this.state.responsePic?this.state.responsePic:'/images/def_profile.png'}/>
                </div>
                <div className="form-group">
                  <div className="fileUpload mlUpload_btn">
                    <span>Upload Image</span>
                    <input type="file" className="upload" id="profilePic"  onChange={this.onFileUpload.bind(this)} />
                  </div>
                  <br className="brclear"/>
                </div>
                <div className="form-group">
                  <div className="input_types">
                    <input id="check1" type="checkbox" name="check1" value="1" checked={this.state.serviceCard} onChange={this.checkBoxHandler.bind(this, "ServiceCard")}/><label ><span><span></span></span>Eligible for service card</label>
                  </div>
                  <br className="brclear"/>
                </div>
              </form>
            </div>
          </div>
          <br className="brclear"/>
          {deli}
        </ScrollArea>
        <div className="ml_btn" style={{'textAlign':'center'}}>
          <div className="save_btn" onClick={this.saveDetails.bind(this)}>Save</div> <div className="cancel_btn">Cancel</div>
        </div>
      </div>
    )
  }
};


