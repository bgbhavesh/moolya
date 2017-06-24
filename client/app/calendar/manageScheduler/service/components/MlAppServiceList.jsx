/**
 * Created by Mukhil on 20/6/17.
 */
import React from 'react';
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";
import {fetchServicesActionHandler } from '../actions/MlServiceActionHandler';

export default class MlAppServiceList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      services:[]
    }
    this.fetchServices.bind(this)
  }

  componentWillMount(){
    this.fetchServices();
  }
  async fetchServices(){
    let profileId = FlowRouter.getParam('profileId');
    let response = await fetchServicesActionHandler(profileId);
    if(response){
      this.setState({
        services:response
      });
    }
  }
  addActivity() {
    let profileId = FlowRouter.getParam('profileId');
    console.log(profileId)
    FlowRouter.go('/app/calendar/manageSchedule/'+profileId+'/createService');
  }

  editMode(id) {
    let profileId = FlowRouter.getParam('profileId');
    FlowRouter.go('/app/calendar/manageSchedule/'+profileId+'/editService?id='+id);
  }

  render(){
    let that = this;
    let services = this.state.services || []
    return (
      <div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          <MlAppScheduleHead type="service"/>
          <div className="col-lg-12" id="show">
            <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-4">
                <a href=" " onClick={() => that.addActivity()}>
                  <div className="list_block notrans">
                    <div className="hex_outer"><span className="ml ml-plus "></span></div>
                    <h3>Add New</h3>
                  </div>
                </a>
              </div>

              {services.map(function (service, index) {
                return (
                  <div className="col-lg-2 col-md-4 col-sm-4" key={index}>
                    <div className="list_block img_list_block notrans" onClick={()=>that.editMode(service._id)}>
                      <img src="/images/activity_1.jpg"/>
                      <h3>{service.displayName}</h3>
                    </div>
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
