/**
 * Created by pankaj on 6/6/17.
 */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var Select = require('react-select');
import {initalizeFloatLabel} from '../../../utils/formElemUtil'
import {findOfficeTransactionHandler} from '../actions/findOfficeTransaction'
import {updateSubcriptionDetail} from '../actions/updateSubscriptionDetail'
import {updateOfficeStatus} from '../actions/updateOfficeStatus'

export default class MlOfficeItem extends React.Component {
  constructor(props){
    super(props);
    this.state={
      transId:props.data.id,
      transInfo:{},
      userInfo:{},
      officeInfo:{
        availableCommunities:[]
      },
      cost: 0,
      tax:false,
      about:'',
      isGenerateLinkDisable: false
    }
    this.getTransaction(this.state.transId);
    return this;
  }
  componentDidMount() {
    initalizeFloatLabel();
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
    // console.log(this.props.data)
  }

  async getTransaction(id){
    let response = await findOfficeTransactionHandler(id);
    if(response){
      let result = JSON.parse(response.result)[0];
      if(result){
        this.setState({
          transInfo: result.trans,
          userInfo: result.user,
          officeInfo: result.office,
          tax: result.trans.orderSubscriptionDetails && result.trans.orderSubscriptionDetails.isTaxInclusive ? result.trans.orderSubscriptionDetails.isTaxInclusive : false,
          cost: result.trans.orderSubscriptionDetails && result.trans.orderSubscriptionDetails.cost ? result.trans.orderSubscriptionDetails.cost : '',
          about: result.trans.orderSubscriptionDetails && result.trans.orderSubscriptionDetails.about ? result.trans.orderSubscriptionDetails.about : '',
          isGenerateLinkDisable: result.trans.orderSubscriptionDetails ? true : false
        });
      }
    }
  }

  updateCost(e){
    this.setState({"cost":e.currentTarget.value});
  }

  updateTax(e){
    this.setState({"tax":e.currentTarget.checked});
  }

  updateAbout(e){
    this.setState({"about":e.currentTarget.value});
  }

  async generateLink(){
    if(this.state.isGenerateLinkDisable){
      toastr.error('Payment Link is already generated');
      return false;
    }
    this.setState({
      isGenerateLinkDisable:true
    })
    if(!this.state.cost){
      toastr.error('Cost is required');
      return false;
    }
    if(this.state.cost < 1){
      toastr.error('Enter tha valid cost');
      return false;
    }
    let generateLinkInfo = {
      SubscriptionName: this.state.officeInfo && this.state.officeInfo.subscriptionName ? this.state.officeInfo.subscriptionName : '' ,
      cost: this.state.cost,
      isTaxInclusive: this.state.tax,
      about: this.state.about
    }
    let id = this.state.transId;
    let response = await updateSubcriptionDetail(id ,generateLinkInfo);
    if(response.success){
      toastr.success(response.result);
    } else {
      toastr.error(response.result);
      this.setState({
        isGenerateLinkDisable:false
      })
    }
  }

  async acitvateOffice(){
    if(this.state.officeInfo.isActive){
      toastr.error('Office already activated');
      return false;
    }
    let response = await updateOfficeStatus(this.state.officeInfo._id);
    if(response.success){
      toastr.success(response.result);
    } else {
      toastr.error(response.result);
    }
  }

  render() {
    let statusOptions = [
      {value: 'WIP', label: 'WIP' , clearableValue: true},
      {value: 'Approved', label: 'Approved',clearableValue: true}
    ];
    return (
      <div className="ml_tabs">
        <ul className="nav nav-pills">
          <li className="active">
            <a href="#1a" data-toggle="tab">Customer Details</a>
          </li>
          <li>
            <a href="#2a" data-toggle="tab">Order Details</a>
          </li>
          <li>
            <a href="#3a" data-toggle="tab">Payment Details</a>
          </li>
          <li>
            <a href="#4a" data-toggle="tab">Device Details</a>
          </li>
          <li>
            <a href="#5a" data-toggle="tab">History</a>
          </li>
        </ul>
        <div className="tab-content clearfix">
          <div className="tab-pane active" id="1a">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="User Id" value={this.state.transInfo.userId} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Transaction Id" value={this.state.transInfo.transactionId} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Date & Time" defaultValue="27/08/2016 10:20:20" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Name" value={this.state.userInfo.name} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email ID" value={this.state.userInfo.email} className="form-control float-label" id=""/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Phone no" value={this.state.userInfo.mobile} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Cluster" value={this.state.transInfo.clusterName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Chapter" value={this.state.transInfo.chapterName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Sub Chapter" value={this.state.transInfo.subChapterName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Community" value={this.state.transInfo.communityName} className="form-control float-label" id=""/>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="2a">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Order ID" defaultValue="Moo12345" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Subscription Name" value={this.state.officeInfo.subscriptionName} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Total number of users" value={this.state.officeInfo.totalCount} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Total number of principal" value={this.state.officeInfo.principalUserCount} className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Total number of Team" value={this.state.officeInfo.teamUserCount} className="form-control float-label" id=""/>
                </div>
                <div className="form-group switch_wrap switch_names">
                  <span className="state_label acLabel">Specific</span><label className="switch nocolor-switch">
                  <input type="checkbox" checked={this.state.officeInfo.availableCommunities.length > 2 ? true : false} />
                  <div className="slider"></div>
                </label>
                  <span className="state_label">All Communities</span>
                </div>
                <div className="clearfix" />

                <div className="swiper-container blocks_in_form">
                  <div className="clearfix" />
                  <div className="swiper-wrapper">
                    {this.state.officeInfo.availableCommunities.map(function (item, i) {
                      return(
                        <div className="swiper-slide" key={i}>
                          <div className="team-block marb0">
                            <span className="ml ml-moolya-symbol"></span>
                            <h3>
                              {item.communityName}
                            </h3>
                          </div>
                          <div className="form-group mart20">
                            <input type="text" value={item.userCount} placeholder="Enter Total Numbers" className="form-control float-label" id="cluster_name"/>
                          </div>
                        </div>
                      )
                    })}

                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-heading">Office location</div>
                  <div className="panel-body">
                    <div className="form-group">
                      <input type="text" placeholder="Plot no/Flat no/Door no" value={this.state.officeInfo.officeLocation} className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Street no / Locality" value={this.state.officeInfo.streetLocality} className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Landmark" value={this.state.officeInfo.landmark} className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Area" value={this.state.officeInfo.area} className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="town /city" value={this.state.officeInfo.city} className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="State" value={this.state.officeInfo.state} className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Country" value={this.state.officeInfo.country} className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Zip Code" value={this.state.officeInfo.zipCode} className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder ="Duration" value='' className="form-control float-label" id=""/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="panel panel-default">
                  <div className="panel-heading">Generate payment link</div>
                  <div className="panel-body">
                    <div className="form-group">
                      <input type="text" value={this.state.officeInfo.subscriptionName} placeholder="Subscription Name" className="form-control float-label" id="" />
                    </div>
                    <br className="brclear"/>
                    <div className="form-group ">
                      <input type="number" onChange={(e)=>this.updateCost(e)} value={this.state.cost} placeholder="Cost" className="form-control float-label"/>
                      <div className="email_notify">
                        <div className="input_types">
                          <input id="checkbox1" onChange={(e)=>this.updateTax(e)} checked={this.state.tax} type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>TAX inclusive</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea onChange={(e)=>this.updateAbout(e)} value={this.state.about} placeholder="About" className="form-control float-label" id=""></textarea>
                    </div>
                    <a href="#" className="fileUpload mlUpload_btn" onClick={()=>this.generateLink()}>Genrate Link</a>
                    <a href="#" className="fileUpload mlUpload_btn" onClick={()=>this.acitvateOffice()}>Activate office</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane active" id="3a">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Transaction Date & Time" defaultValue="27/08/2016 10:20:20" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Transaction ID" defaultValue="moo1234" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Total amount paid" defaultValue="Rs 25,000" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Payment mode" defaultValue="Debit Card" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Card number" defaultValue="1234 2545 2565 4585" className="form-control float-label" id=""/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Card Holder name" defaultValue="Kiran Kumar" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Promotion Code" defaultValue="Null" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Code Amount" defaultValue="Null" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Status" defaultValue="Null" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Voucher Code" defaultValue="Null" className="form-control float-label" id=""/>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane active" id="4a">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Device name" defaultValue="Ipad air 2" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Device ID" defaultValue="L8125#585" className="form-control float-label" id=""/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Device IP" defaultValue="10.20.1.6" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="IP Location" defaultValue="Hyderabad" className="form-control float-label" id=""/>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane active" id="5a">
            <div className="row">
              <div className="col-md-6">
                One
              </div>
              <div className="col-md-6">
                Two
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
