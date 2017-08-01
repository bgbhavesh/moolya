/**
 * Created by pankaj on 20/6/17.
 */
import React from "react";
var FontAwesome = require('react-fontawesome');
import {fetchAllOfficeMembers} from '../actions/fetchAllTeamMember';
let Select = require('react-select');
import {createInternalTaskActionHandler} from '../actions/createInternalTask'

export default class MlCreateDiscussInternalTask extends React.Component {

  constructor(props){
    super(props);
    console.log(props);
    this.state={
      showAdd : true,
      users: [],
      members:[],
      selectedUser:[],
      docs:[],
      modes:[
        {value:"offline", label:"Offline"},
        {value:"online", label:"Online"}
      ],
      mode:'',
    }
  }
  componentDidMount(){
    this.fetchAllOfficeMembers();
  }

  async submit(){
    if( !this.props.data.state.selected || !this.props.data.state.selected.resourceId ){
      toastr.error("Select a portfolio");
      return false;
    }
    if(!this.state.selectedUser.length){
      toastr.error("Select at least one user");
      return false;
    }
    let members = this.state.members;
    let dataToInsert = {
      name : this.props.config.actionName,
      stage : this.props.data.props.currentStage.stageId,
      attendees: this.state.selectedUser.map(function (userId) {
        let user = members.find(function (user) {
          return user.userId == userId;
        });
        return {
          userId: userId,
          profileId: user.profileId
        }
      }),
      resourceId: this.props.data.state.selected.resourceId,
      community: {
        code: this.props.data.state.selected.portfolio.communityCode,
        name: this.props.data.state.selected.portfolio.communityName,
        type: this.props.data.state.selected.portfolio.communityType
      },
      docs:this.state.docs,
      note:this.refs.note.value,
      mode:this.state.mode
    };

    let response = await createInternalTaskActionHandler(dataToInsert);
    if(response.success) {
      toastr.success('Internal Task Created');
      this.props.toggle();
    } else {
      toastr.error(response.result);
    }
  }

  async fetchAllOfficeMembers(){
    let response = await fetchAllOfficeMembers();
    if(response){
      console.log(response);
      let options = response.map(function (user) {
        return {
          value:user.userId,
          label:user.name
        }
      });
      this.setState({
        users:options,
        members:response
      });
    }
  }

  toggleAddUser(){
    this.setState({
      showAdd : !this.state.showAdd
    });
  }

  addUser(user){
    let seletectUsers = this.state.selectedUser;
    let isAlready = seletectUsers.find(function (userId) {
      return userId == user.value;
    });
    if(!isAlready){
      seletectUsers.push(user.value);
      this.setState({
        selectedUser: seletectUsers
      });
    }
  }

  removeUser(userId) {
    let seletectUsers = this.state.selectedUser;
    seletectUsers.splice(seletectUsers.indexOf(userId), 1);
    this.setState({
      selectedUser: seletectUsers
    });
  }

  addMode(mode){
    this.setState({
      mode:mode.value
    });
  }

  render(){
    const that = this;
    return(
      <div className="popover-lg">
        <h1>Attached Documents <a href="#" className="pull-right">Add</a></h1>
        <ul className="doc_upload">
          <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/></li>
          <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/></li>
          <li><FontAwesome name='minus'/><img src="/images/data_balance.jpg"/></li>
        </ul>

        <div className="clearfix" />
        <h1>
          Set priority of attendes
          <a href="#" className="pull-right attendes-btn" onClick={()=>this.toggleAddUser()} style={ this.state.showAdd ? {} : {'display':'none'} }>Add</a>
          <a href="#" className="pull-right close-btn"  onClick={()=>this.toggleAddUser()} style={ this.state.showAdd ? {'display':'none'} : {} }>Close</a>
        </h1>
        <div className="clearfix" />
        <div className="" style={ this.state.showAdd ? {'display':'none'} : {}}>
          <Select
            name="form-field-name"
            value=""
            className="form-control float-label"
            options={that.state.users}
            onChange={(value)=>that.addUser(value)}
          />
          <h2><span className="pull-left popover-search"><div className="form-group">

            {/*<input type="text" placeholder="Search here" className="form-control float-label" id=""></input>*/}
            </div></span>
          </h2>
          <div className="clearfix" />
        </div>
        <div className="clearfix" />
        <div className="col-md-12">
          <ul className="img_upload">
            {that.state.selectedUser.map(function (userId , index) {
              let user = that.state.members.find(function (user) {
                return userId == user.userId;
              });
              return (
                <li key={index}>
                  <FontAwesome onClick={()=>that.removeUser(userId)} name='minus'/><img src="/images/img2.png"/><span>{user.name}</span>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="clearfix" />
        <hr/>
        <Select
          name="form-field-name"
          value={that.state.mode}
          placeholder="Select Mode"
          className="form-control float-label"
          options={that.state.modes}
          onChange={(value)=>that.addMode(value)}
        />
        <div className="clearfix" />
        <div className="form-group">
          <textarea ref="note" placeholder="Notes / Remarks" className="form-control float-label" id=""></textarea>
        </div>
        <div className="clearfix" />
        <a href="#" onClick={()=>that.submit()} className="save_btn">Assign</a>
      </div>
    )
  }
}
