/**
 * All Services list component
 * @Author :: Mukhil P
 * @Dated :: 20/06/2017
 */

// import NPM module(s)
import React, { Component } from 'react';
import CDNImage from "../../../../../commons/components/CDNImage/CDNImage";
// import custom method(s) and component(s)
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";
import { fetchServicesActionHandler } from '../actions/MlServiceActionHandler';

export default class MlAppServiceList extends Component {

  constructor(props){
    super(props);
    this.state = {
      services:[]
    };
    this.profileId = FlowRouter.getParam('profileId');
    this.fetchServices = this.fetchServices.bind(this);
  }

  componentDidMount(){
    this.fetchServices();
  }

  /**
   * Method :: fetchServices
   * Desc :: Get all services from server
   * @returns {Promise.<void>}
   */
  async fetchServices(){
    let response = await fetchServicesActionHandler(this.profileId);
    if(response){
      this.setState({ services: response });
    }
  }

  /**
   * Method :: createService
   * Desc :: Redirect with creating service component
   */
  createService() {
    FlowRouter.go(`/app/calendar/manageSchedule/${this.profileId}/createService`);
  }

  /**
   * Method :: updateService
   * Desc :: Redirect with updating service component
   * @param id :: current service id
   */
  updateService(id, selectedProfileId) {
    this.profileId = this.profileId === "all" ? selectedProfileId : this.profileId;
    FlowRouter.go(`/app/calendar/manageSchedule/${this.profileId}/editService?id=${id}`);
  }

  /**
   * Method :: React render
   * Desc :: Showing html page
   * @returns {XML}
   */
  render() {
    const { services } = this.state;
    const that = this;
    return (
      <div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          <MlAppScheduleHead type="service" />
          <div className="col-lg-12" id="show">
            <div className="row">
              {this.profileId !== "all" ? <div className="col-lg-2 col-md-4 col-sm-4">
                <a href=" " onClick={() => this.createService()}>
                  <div className="list_block notrans">
                    <div className="hex_outer"><span className="ml ml-plus "></span></div>
                    <h3>Create a service</h3>
                  </div>
                </a>
              </div>: <div></div> }

              {services && services.map((service, index) => {
                return (
                  <div className="col-lg-2 col-md-4 col-sm-4" key={index}>
                    <div className="card_block"  onClick={()=>that.updateService(service._id, service.profileId)}><h3>{service.displayName}</h3>
                      <div className="clearfix"></div>
                      <div className="list_icon mart0">
                        <span className="price">Rs. {service.finalAmount ? service.finalAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : '0.00'}</span>
                        <span className="price pull-right">{service.status ? 'TRUE' : 'FALSE'}</span>
                        <div className="clearfix"></div>
                        <i className="c_image ml my-ml-Ideator"></i>
                        <div className="clearfix"></div>
                        <span className="price">{service.duration ? `${service.duration.hours ? service.duration.hours : 0} Hrs ${service.duration.minutes ? service.duration.minutes : 0} Mins` : ''}</span>
                        <span className="price pull-right">{`${service.noOfSession ? service.noOfSession : '0'} Sessions`}</span>
                      </div><div className="block_footer"><span>{(service.termsAndCondition && service.termsAndCondition.isCancelable) ? 'CAN BE CANCELLED' : 'NON - CANCELLABLE'}</span></div></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
};
