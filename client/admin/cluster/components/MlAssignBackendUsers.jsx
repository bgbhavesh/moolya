
import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
import Moolyaselect from '../../../commons/components/select/MoolyaSelect'

let FontAwesome = require('react-fontawesome');
let Select = require('react-select');

let options = [
    { value: 'role', label: 'Role' },
    { value: 'role', label: 'Role' }
];

function logChange(val) {
    console.log("Selected: " + val);
}

let initSwiper = () => {
    new Swiper('.blocks_in_form', {
        speed: 400,
        spaceBetween: 25,
        slidesPerView:2,
        pagination: '.swiper-pagination',
        paginationClickable: true
    });
}

export default class MlAssignBackendUsers extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectedBackendUser:'',
            users:[{username: '', _id:''}]
        }
        this.optionsBySelectUser.bind(this)
        // this.enableAssignUser = this.enableAssignUser().bind(this);
        return this;
    }

    componentDidMount(){
      initSwiper();
    }

    enableAssignUser(){

    }

    optionsBySelectUser(index, selectedIndex){
    }

    getBackendUsers(users){
        console.log(users)
    }

    render(){
        let that = this;
        let query=gql`query{data:fetchUsersByClusterDepSubDep{label:username,value:_id}}`;
        return(
            <div className="admin_main_wrap">
                <div className="admin_padding_wrap">
                    <h2>Assign internal user to Cluster</h2>
                    <div className="col-md-6 nopadding-left">
                          <div className="row">
                              <div className="left_wrap left_user_blocks">
                                  <ScrollArea speed={0.8} className="left_wrap">
                                      <div className="col-md-4 col-sm-4">
                                          <div className="list_block provider_block">
                                              <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                                              <div className="provider_mask"> <img src="/images/funder_bg.png" /> <img className="user_pic" src="/images/def_profile.png" /> </div>
                                              <h3>Assign <br/> Backend Users</h3>
                                          </div>
                                      </div>

                                      <div className="col-md-4 col-sm-4">
                                        <div className="list_block provider_block">
                                            <div className="cluster_status active_cl"><FontAwesome name='check'/></div>
                                            <div className="provider_mask"> <img src="/images/funder_bg.png" /> <img className="user_pic" src="/images/ideator_01.png" /> </div>
                                            <h3>User Name1<br />USA</h3>
                                        </div>
                                      </div>
                                  </ScrollArea>
                              </div>
                          </div>
                    </div>
                    <div className="col-md-6 nopadding-right">
                        <div className="left_wrap">
                            <ScrollArea speed={0.8} className="left_wrap">
                                  <form>
                                      <div className="form-group">
                                          <div className="fileUpload mlUpload_btn">
                                              <span>Profile Pic</span>
                                              <input type="file" className="upload" />
                                          </div>
                                          <div className="previewImg ProfileImg">
                                              <img src="/images/ideator_01.png"/>
                                          </div>
                                      </div>
                                      <br className="brclear"/>
                                      <div className="form-group">
                                          <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} queryType={"graphql"} query={query} isDynamic={true} onSelect={this.optionsBySelectUser.bind(this)} selectedValue={this.state.selectedBackendUser}/>
                                      </div>
                                      <div>
                                          <div className="form-group">
                                              <input type="text" id="AssignedAs" placeholder="Also Assigned As" className="form-control float-label" disabled="true"/>
                                          </div>
                                          <div className="form-group">
                                              <input type="text" placeholder="Display Name" className="form-control float-label" id="dName" />
                                          </div>
                                          {/*<div className="form-group">*/}
                                              {/*<input type="text" placeholder="User Name" className="form-control float-label" id="uName" />*/}
                                          {/*</div>*/}
                                          {/*<div className="form-group">*/}
                                              {/*<input type="text" placeholder="Department" className="form-control float-label" id="Dept" />*/}
                                          {/*</div>*/}
                                          {/*<div className="form-group">*/}
                                              {/*<input type="text" placeholder="Sub Department" className="form-control float-label" id="sDept" />*/}
                                          {/*</div>*/}
                                          {/*<div className="form-group">*/}
                                              {/*<div className="input_types"><input id="chapter_admin_check" type="checkbox" name="checkbox" value="1" /><label htmlFor="chapter_admin_check"><span></span>Is a Chapter admin</label></div>*/}
                                          {/*</div>*/}
                                          <br className="brclear"/>
                                      </div>
                                      <div className="swiper-container blocks_in_form">
                                          <div className="swiper-wrapper">
                                              <div className="form_inner_block swiper-slide">
                                                  <div className="add_form_block"><img src="/images/add.png"/></div>
                                                  <div className="form-group">
                                                      <Select name="form-field-name" options={options} value='role' onChange={logChange}/>
                                                  </div>
                                                  <div className="form-group left_al">
                                                      <input type="text" placeholder="Valid from" className="form-control float-label" id="" />
                                                  </div>
                                                  <div className="form-group left_al">
                                                      <input type="text" placeholder="Valid to" className="form-control float-label" id="" />
                                                  </div>
                                                  <div className="form-group switch_wrap">
                                                      <label>Status</label>
                                                      <label className="switch">
                                                          <input type="checkbox" />
                                                          <div className="slider"></div>
                                                      </label>
                                                  </div>
                                                  <br className="brclear"/>
                                              </div>
                                              <div className="form_inner_block swiper-slide">
                                                  <div className="add_form_block"><img src="/images/add.png"/></div>
                                                  <div className="form-group">
                                                      <select className="form-control float-label" placeholder="Role"><option>Select User Role</option><option>test</option></select>
                                                  </div>
                                                  <div className="form-group left_al">
                                                      <input type="text" placeholder="Valid from" className="form-control float-label" id="" />
                                                  </div>
                                                  <div className="form-group left_al">
                                                      <input type="text" placeholder="Valid to" className="form-control float-label" id="" />
                                                  </div>
                                                  <div className="form-group switch_wrap">
                                                      <label>Status</label>
                                                      <label className="switch">
                                                          <input type="checkbox" />
                                                          <div className="slider"></div>
                                                      </label>
                                                  </div>
                                                  <br className="brclear"/>
                                              </div>
                                              <div className="form_inner_block swiper-slide">
                                                  <div className="add_form_block"><img src="/images/add.png"/></div>
                                                  <div className="form-group">
                                                      <select className="form-control float-label" placeholder="Role"><option>Select User Role</option><option>test</option></select>
                                                  </div>
                                                  <div className="form-group left_al">
                                                      <input type="text" placeholder="Valid from" className="form-control float-label" id="" />
                                                  </div>
                                                  <div className="form-group left_al">
                                                      <input type="text" placeholder="Valid to" className="form-control float-label" id="" />
                                                  </div>
                                                  <div className="form-group switch_wrap">
                                                      <label>Status</label>
                                                      <label className="switch">
                                                          <input type="checkbox" />
                                                          <div className="slider"></div>
                                                      </label>
                                                  </div>
                                                  <br className="brclear"/>
                                              </div>
                                          </div>
                                          <br className="brclear"/>
                                          <div className="swiper-pagination"></div>
                                      </div>
                                      <br className="brclear"/>
                                      <div className="form-group switch_wrap inline_switch">
                                          <label className="">De-Activate User</label>
                                          <label className="switch">
                                              <input type="checkbox" />
                                              <div className="slider"></div>
                                          </label>
                                      </div>
                                  </form>
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
