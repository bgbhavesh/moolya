import React from 'react';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import Datetime from "react-datetime";
import {fetchActivitiesTeamsActionHandler,getTeamUsersActionHandler,fetchOfficeActionHandler } from '../../../calendar/myCalendar/components/myTaskAppointments/actions/MlAppointmentActionHandler';
import moment from "moment";
import {fetchConnections} from '../actions/fetchConnectionsForCalendar'
import {storeSharedDetailsHandler} from '../actions/mlSharedCalendarActionHandler'


export default class CalendarSharePopOver extends React.Component {

  constructor(props) {
    super(props);
    this.state={isSessionExpand: true}
    this.toggle = this.toggle.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.state = {
      popoverOpen: false,
      popoverTwoOpen: false,
      selectedDatasToShare: props.Details?props.Details:[],
      startDate: "",
      endDate: "",
      isDownloadable: false
    };
  }

  componentWillMount() {
    this.fetchOffice()
  }


  async fetchOffice(resourceId) {
    this.setState({resourceId: resourceId})
    let that = this;
    const resp = await fetchOfficeActionHandler()
    this.setState({resp: resp})
  }

  getOffice() {
    let resp = this.state.resp || [];
    let temp = [];
    resp.map(function(data){
      temp.push({value:data._id, label: data.branchType+'-'+data.officeName})
    });
    temp.push({value:'moolyaAdmin', label: 'MoolyaAdmin'},{value:'myConnections', label: 'My Connections'} );
    return temp
  }

  async getUsers(resourceId){
    let tempArray = [];
    const resp = await getTeamUsersActionHandler(resourceId);
    resp.map(function (user) {
      let userInfo = {
        name: user.name,
        profileId: user.profileId,
        profileImage: user.profileImage,
        userId: user.userId
      };
      tempArray.push(userInfo)
    });
    this.setState({teamData: tempArray})
    return tempArray;
  }

  toggle() {

    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }


  toggleButton() {

    this.setState({
      popoverTwoOpen: !this.state.popoverTwoOpen
    });
  }

  selectUserType(selectedUserType) {
    let that = this;
    that.setState({userType: selectedUserType}, () => {
      if(selectedUserType.value == 'myConnections') {
        that.getMyConnections();
      } else if( selectedUserType.value == "moolyaAdmin" ){
        // To do
      } else {
        that.getUsers(selectedUserType.value)
      }
    })
  }

  async getMyConnections(){
    let resp = await fetchConnections();
    let users = resp.map(function (user) {
      let userInfo = {
        name: user.displayName,
        profileId: user.profileId,
        profileImage: user.profileImage,
        userId: user.userId
      };
      return userInfo;
    });
    this.setState({teamData: users});
  }

  validDate(current) {
    let yesterday = Datetime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  }

  validTillToggle(id){
    $('#'+id).toggleClass('rdtOpen');
  }

  isDownloadable(e) {
    this.setState({downloadable: e.target.checked})
  }

  sharedStartDate(event) {
    if(event._d) {
      let value = moment(event._d);//.format('DD-MM-YYYY');
      this.setState({startDate: value})
    }
  }
  sharedEndDate(event) {
    if(event._d) {
      let value = moment(event._d);//.format('DD-MM-YYYY');
      this.setState({endDate: value})
    }
  }

  deleteSelectedDate(index) {
    let data = this.state.selectedDatasToShare || [];
    data.splice(index,1);
    this.setState({selectedDatasToShare: data})
    // this.props.deletedData(data)
  }

  deleteTeamMembers(index) {
    let teamMembers = this.state.teamData || [];
    teamMembers.splice(index,1);
    this.setState({teamData: teamMembers})
  }

  selectedData() {
    let that = this;
    let data = that.state.selectedDatasToShare || [];
    let datas = data.map(function(value, index) {
      return (
        <ul className="doc_upload" key={index}>
          <li><FontAwesome name='minus' onClick={()=>that.deleteSelectedDate(index)}/><img src={value.fileUrl}/></li>
        </ul>
      )
    })
    return datas;
  }

  teamMembersData() {
    let that = this;
    let data = that.state.teamData || [];
    let datas = data.map(function(value, index) {
      return (
        <ul className="img_upload ul-hide" key={index}>
          <li ><FontAwesome name='minus' onClick={that.deleteTeamMembers.bind(that,index)}/><img src={value.profileImage?value.profileImage:""}/><span>{value.name}</span></li>
        </ul>
      )
    })
    return datas;
  }

  saveDetails() {
    let that = this;
    let teamMembers = that.state.teamData || [];
    let file = [];
    let user = [];
    teamMembers.map(function(team) {
      let userDetails = {
        userId: team.userId ? team.userId : 'userId',
        profileId: team.profileId ? team.profileId : ''
      };
      user.push(userDetails)
    });
    let Details = {
      users:user,
    }
    if(this.state.startDate) {
      Details.sharedStartDate =  this.state.startDate.format("MM-DD-YYYY hh:mm:ss");
    }

    if(this.state.endDate) {
      Details.sharedEndDate = this.state.endDate.format("MM-DD-YYYY hh:mm:ss");
    }
    if(this.state.startDate < this.state.endDate) {
      this.saveInfo(Details);
    }else{
      toastr.error('End date should be after the start date')
    }
  }

  async saveInfo(Details) {

    const response  = await storeSharedDetailsHandler(Details)
    if(response.success){
      toastr.success(response.result);
      this.props.toggle();
    } else {
      toastr.error(response.result);
    }
    console.log(response)
  }




  render(){
    return(
      <div className="popover-lg">
        {this.selectedData()}
        <div className="clearfix" />
        <div className="form-group">
          <Select        className="form-field-name"
                         options={this.getOffice()}
                         value={this.state.userType}
                         onChange={this.selectUserType.bind(this)}
          />
        </div>
        {/*<div className="form-group">*/}
        {/*<input type="text" placeholder="Search here" className="form-control float-label" id=""></input>*/}
        {/*</div>*/}
        {this.teamMembersData()}
        <div className="clearfix" />
        <div className="col-md-6 nopadding-left">
          <div className="form-group" id="start-time">
            <Datetime dateFormat={"DD-MM-YYYY"}
                      timeFormat={false}
                      inputProps={{placeholder: "Shared Start Date"}}
                      closeOnSelect={true}
                      isValidDate={(current) => this.validDate(current)}
                      onChange={(event) => this.sharedStartDate(event)}
            />
            <FontAwesome name="calendar"
                         className="password_icon"
                         onClick={this.validTillToggle.bind(this, "start-time")}
            />
          </div>
        </div>
        <div className="col-md-6 nopadding-right">
          <div className="form-group" id="end-time">
            <Datetime dateFormat={"DD-MM-YYYY"}
                      timeFormat={false}
                      inputProps={{placeholder: "Shared End Date"}}
                      closeOnSelect={true}
                      isValidDate={(current) => this.validDate(current)}

                      onChange={(event) => this.sharedEndDate(event)}
                      disabled={this.props.viewMode}/>
            <FontAwesome name="calendar"
                         className="password_icon"
                         onClick={this.validTillToggle.bind(this, "end-time")}
            />
          </div>
        </div>
        <div className="clearfix" />
        <div className="clearfix" />
        <div className="ml_btn">
          <a href="" className="save_btn" onClick={this.saveDetails.bind(this)}>Share</a>
          <a href="" className="cancel_btn" onClick={this.props.toggle.bind(this)} >Cancel</a>
        </div>
      </div>
    )
  }
}
