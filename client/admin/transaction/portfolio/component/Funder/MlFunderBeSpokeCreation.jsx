import React, {Component} from "react";
import {render} from "react-dom";
import FunderCreateServicesView from './funderCreateServicesView'
import {fetchServicesActionHandler} from '../../../../../app/calendar/manageScheduler/service/actions/MlServiceActionHandler'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import {multipartASyncFormHandler} from '../../../../../commons/MlMultipartFormAction'
import Moolyaselect from  '../../../../commons/components/MlAdminSelectWrapper'
import _ from "lodash";
import MlAppServiceList from '../../../../../app/calendar/manageScheduler/service/components/MlAppServiceList'
import MlAppServiceManageSchedule from '../../../../../app/calendar/manageScheduler/service/components/MlAppServiceManageSchedule'

export default class MlBeSpokeListView extends Component {
  constructor(props) {
  super(props)
    this.state={
      createNewBeSpoke: false,
      showService: false,
      services:[],
      serviceId:"",
      profileId:""
    }
    this.getServiceDetails.bind(this);
}
  componentWillMount(){
    this.getServiceDetails();
  }

  async getServiceDetails(){
    const response  =  await fetchServicesActionHandler(this.props.portfolioDetailsId)
    this.setState({services:response})
    return response
  }

  addBeSpoke(){
    this.setState({createNewBeSpoke: true, showBeSpoke:true})
  }
  viewMode(index,serviceId,profileId,){
    this.setState({createNewBeSpoke: true, showBeSpoke:false,showService:true, serviceId:serviceId, profileId:profileId})
  }
render(){
    let that = this;
    return(
      <div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          {!this.state.createNewBeSpoke?
              <div className="col-lg-12" id="show">
          <div className="col-lg-2 col-md-4 col-sm-4">
            <a href=" " onClick={() => that.addBeSpoke()}>
              <div className="list_block notrans">
                <div className="hex_outer"><span className="ml ml-plus "></span></div>
                <h3>Create a BeSpoke</h3>
              </div>
            </a>
          </div>
            {this.state.services.map(function (services, index) {
              return (
              <div className="col-lg-2 col-md-4 col-sm-4" key={index}>
                <div className="list_block img_list_block notrans" onClick={()=>that.viewMode(index,services._id, services.profileId)}>
                  <img src="/images/activity_1.jpg"/>
                  <h3>{services.displayName}</h3>
                </div>
              </div>)})}
            </div> :""}
          {this.state.showBeSpoke?<FunderCreateServicesView/>:""}
          {this.state.showService?<MlAppServiceManageSchedule viewMode={true} serviceId={this.state.serviceId} profileId={this.state.profileId}/>:""}
        </div>
        </div>
    )
}
}

