/**
 * Created by pankaj on 7/6/17.
 */

import React from 'react';
import ScrollArea from 'react-scrollbar';
var Select = require('react-select');
import {Popover, PopoverContent, PopoverTitle} from "reactstrap";
import {createOfficeMembers} from '../actions/addOfficeMembers';
import {fetchOfficeMembers} from '../actions/findOfficeMembers';

function logChange(val) {
  console.log("Selected: " + val);
}


export default class MlAppAddOfficeMember extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      popoverOpen: false,
      members: [],
      selected: props.availableCommunities ? '' : 'principle',
      options : props.availableCommunities ? props.availableCommunities.map(function (item) {
        return { value: item.communityId, label: item.communityName }
      }) : [{ value: 'principle', label: 'Principle' }],
      userType:"isFreeUser"
    }
  }

  async getMembers(){
    let isPrinciple = this.props.availableCommunities ? true : false;
    let officeId = FlowRouter.getParam('officeId');
    let result = await fetchOfficeMembers(officeId, isPrinciple);
    this.setState({
      members:result
    });
  }
  componentWillMount(){
    this.getMembers();
  }
  componentDidMount() {
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
      }
    });
  }
  togglePopover(){
    this.setState({popoverOpen:!this.state.popoverOpen});
  }
  toggleUserType(evt){
    this.setState({
      userType:evt.currentTarget.value
    })
  }
  changeUserCommunityType(evt){
    if(evt.value !== 'principle'){
      this.setState({
        selected:evt.value
      })
    }
  }
  async addPrincipal(){
    let data = {
      isFreeUser:false,
      isPaidUser: false,
      isAdminUser: false,
      name: this.refs.name.value,
      emailId: this.refs.email.value,
      mobileNumber: this.refs.phoneNumber.value,
      isPrincipal: (this.state.selected == 'principle' ? true : false),
      communityType: (this.state.selected == 'principle' ? '' : this.state.selected)
    };
    data[this.state.userType] = true;
    let id = FlowRouter.getParam('officeId');
    let response = await createOfficeMembers(id, data);
    if(response.success){
      toastr.success(response.result);
      this.setState({
        popoverOpen:false
      });
      this.getMembers();
    } else {
      toastr.success(response.result);
    }
  }
  render(){
    const that = this;
    console.log(this.state.selected);
    return (
      <div>
        <div className="main_wrap_scroll">
          <ScrollArea
            speed={0.8}
            className="main_wrap_scroll"
            smoothScrolling={true}
            default={true}
          >
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-2 col-md-4 col-sm-4">
                  <a href="#" id="create_client1" onClick={()=>this.togglePopover()} data-class="large_popover" >
                    <div className="list_block notrans">
                      <div className="hex_outer"><span className="ml ml-plus "></span></div>
                      <h3>Add New</h3>
                    </div>
                  </a>
                </div>
                {that.state.members.map(function (data, i) {
                  return (
                    <div className="col-lg-2 col-md-4 col-sm-4" key={i}>
                      <a href="#" >
                        <div className="list_block notrans">
                          <div className="cluster_status active_cl"></div>
                          <div className="hex_outer"><span className="ml ml-funder"></span></div>
                          <h3>{data.name}</h3>
                        </div>
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollArea>

          <Popover placement="right" isOpen={this.state.popoverOpen}
                   target={"create_client1"}>
            <PopoverTitle> Add New Member </PopoverTitle>
            <PopoverContent>
              <div className="ml_create_principle">
            <div className="medium-popover"><div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <input type="text" ref="name" placeholder="Name" className="form-control float-label" id=""/>

                </div>
                <div className="form-group">
                  <input type="text" ref="email" placeholder="Email Id" className="form-control float-label" id=""/>

                </div>
                <div className="form-group">
                  <input type="number" ref="phoneNumber" placeholder="Phone Number" className="form-control float-label" id=""/>

                </div>

                <div className="form-group">
                  <Select
                    name="form-field-name"
                    options={that.state.options}
                    value={that.state.selected}
                    onChange={that.changeUserCommunityType.bind(that)}
                  />
                </div>
                <div className="form-group invitation">
                  <div className="input_types">
                    <input defaultChecked={true} onClick={(e)=>this.toggleUserType(e)} type="radio" name="radio" value="isFreeUser" />
                    <label htmlFor="checkbox1"><span></span>Free User</label>
                  </div>
                  <div className="input_types">
                    <input onClick={(e)=>this.toggleUserType(e)} type="radio" name="radio" value="isPaidUser" />
                    <label htmlFor="checkbox1"><span></span>Paid User</label>
                  </div>
                  <div className="input_types">
                    <input onClick={(e)=>this.toggleUserType(e)} type="radio" name="radio" value="isAdminUser" />
                    <label htmlFor="checkbox1"><span></span>Admin User</label>
                  </div>
                  <br className="brclear"/>
                </div>
                <div className="ml_btn mart20" style={{'textAlign': 'center'}}>
                  <button onClick={()=>that.addPrincipal()} className="save_btn">Invite</button>
                </div>
              </div>
            </div></div>
          </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    )
  }
};