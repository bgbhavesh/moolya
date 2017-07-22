import React, {Component} from "react";
import {render} from "react-dom";
import FunderCreateServicesView from './funderCreateServicesView'
import {fetchServicesActionHandler, createServiceActionHandler, fetchBeSpokeServicesActionHandler} from '../../../../../app/calendar/manageScheduler/service/actions/MlServiceActionHandler'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {multipartASyncFormHandler} from '../../../../../commons/MlMultipartFormAction'
import Moolyaselect from  '../../../../commons/components/MlAdminSelectWrapper'
import _ from "lodash";
import MlAppServiceList from '../../../../../app/calendar/manageScheduler/service/components/MlAppServiceList'
import FunderAboutView from './MlFunderServiceBooking'
import MlAppServiceManageSchedule from '../../../../../app/calendar/manageScheduler/service/components/MlAppServiceManageSchedule'


export default class MlBeSpokeListView extends Component {
  constructor(props) {
  super(props)
    this.state={
      createNewBeSpoke: false,
      showService: false,
      services:[],
      serviceDetails:{},
      serviceId:"",
      profileId:"",
      beSpokeServices:[],
      bookingStatus: false,

    }
    this.getServiceDetails.bind(this);
}
  componentWillMount(){
    this.getServiceDetails();
    this.getBeSpokeServiceDetails();
  }

  async getServiceDetails(){
    const response  =  await fetchServicesActionHandler(this.props.portfolioDetailsId)
    this.setState({services:response})
    return response
  }

  async getBeSpokeServiceDetails(){
    const response  =  await fetchBeSpokeServicesActionHandler(this.props.portfolioDetailsId)
    this.setState({beSpokeServices:response})
    return response
  }

  async saveServiceDetails(data){
    if(data.saveData){
      delete data['saveData'];
      data.profileId = this.props.portfolioDetailsId;
      const res = await createServiceActionHandler(data)
      return res
    }
  }

  bookService(bookingStatus){
    if(bookingStatus){
      this.setState({createNewBeSpoke: true, showBeSpoke:false,showService:false,showBeSpokeService:false, bookingStatus: true})
    }
  }

  serviceDetails(details){
    console.log(details)
    this.setState({serviceDetails:details})
  }


  addBeSpoke(){
    this.setState({createNewBeSpoke: true, showBeSpoke:true, showService: false, showBeSpokeService: false})
  }
  viewMode(index,serviceId,profileId){
    console.log("---service---",serviceId, "----profile---", profileId)
    this.setState({createNewBeSpoke: true, showBeSpoke:false,showService:true, serviceId:serviceId, profileId:profileId})
  }
  viewModeBeSpoke(index,serviceId,profileId){
    this.setState({createNewBeSpoke: true, showBeSpoke:false,showService:false,showBeSpokeService:true, serviceId:serviceId, profileId:profileId})
  }
render(){
    let that = this;
    return(
      <div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          {!this.state.createNewBeSpoke?
              <div className="col-lg-12" id="show">
                {this.props.viewingMode || this.props.editingMode? <div className="col-lg-2 col-md-4 col-sm-4">
            <a href=" " onClick={() => that.addBeSpoke()}>
              <div className="list_block notrans">
                <div className="hex_outer"><span className="ml ml-plus "></span></div>
                <h3>Create a BeSpoke</h3>
              </div>
            </a>
          </div>:<div></div>}
            {this.state.services.map(function (services, index) {
              return (
              <div className="col-lg-2 col-md-4 col-sm-4" key={index}>
                <div className="list_block img_list_block notrans" onClick={()=>that.viewMode(index,services._id, services.profileId)}>
                  <img src="/images/activity_1.jpg"/>
                  <h3>{services.displayName}</h3>
                </div>
              </div>)})}
          {this.state.beSpokeServices.map(function (services, index) {
            return (
              <div className="col-lg-2 col-md-4 col-sm-4" key={index}>
                <div className="list_block img_list_block notrans" onClick={()=>that.viewModeBeSpoke(index,services._id, services.profileId)}>
                  <img src="/images/activity_1.jpg"/>
                  <h3>{services.profileId}</h3>
                </div>
              </div>)})}
        </div> :""}
          {this.state.showBeSpoke?<FunderCreateServicesView saveServiceDetails={this.saveServiceDetails.bind(this)} portfolioDetailsId={this.props.portfolioDetailsId}/>:""}
          {this.state.showService?<MlAppServiceManageSchedule viewMode={true} viewingMode={this.props.viewingMode?this.props.viewingMode: false} editingMode={this.props.editingMode?this.props.editingMode:false} serviceId={this.state.serviceId} profileId={this.state.profileId} serviceDetails={this.serviceDetails.bind(this)} bookService={this.bookService.bind(this)}/>:""}
          {this.state.showBeSpokeService?<FunderCreateServicesView beSpokeDetails={this.state.beSpokeServices}/> :""}
          {this.state.bookingStatus?<FunderAboutView serviceDetails={this.state.serviceDetails}/>:""}
          </div>
        </div>
    )
}
}

