/** ************************************************************
 * Date: 19 Jun, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This is the expanded component described in detail
 * JavaScript XML file MlServiceCardsDetailsComponent.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React from "react";
import {render} from "react-dom";
import {initalizeFloatLabel,OnToggleSwitch} from "../../../utils/formElemUtil";
import MlServiceManageSchedule from '../component/MlServicesComponent'
import _ from "lodash";
import moment from "moment";
import {getServiceBasedOnProfileId} from '../actions/mlFindService'
var FontAwesome = require('react-fontawesome');

export default class MlServiceCardsDetailsComponent extends React.Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */

  constructor(props){
    super(props);
    this.state= {
      data: {}
    }
    this.getServiceDetails.bind(this);
    return this;
  }
  /**
   * ComponentDidMount
   * Desc :: Initializing the float labels
   */

  componentDidMount() {
    initalizeFloatLabel();
  }

  /**
   * componentDidUpdate
   * Desc :: Updating the toggle switch
   */

  componentDidUpdate(){
    OnToggleSwitch(true,true);
  }

  /**
   * componentWillMount
   * Desc :: Calls getServiceDetails with profileId as param
   */
  componentWillMount() {
    let profileId = this.props.data.profileId;
    this.getServiceDetails(profileId)
  }

  /**
   * Method :: getServiceDetails
   * Desc   :: Get the service details based on the profileId
   * @param :: profileId - type : String
   * @returns resp
   */

 async getServiceDetails(profileId) {
    console.log(profileId)
    const resp = await getServiceBasedOnProfileId(profileId)
   console.log(resp);
    this.setState({
      data: resp
    })
   return resp;
  }

  /**
   * Render
   * Desc   :: Render the HTML for this component
   * @returns {HTML}
   */

  render() {
    let that = this;
    return (
      <div className="ml_tabs">
        <ul  className="nav nav-pills">
          <li className="active">
            <a  href={`#customerDetails${that.props.data._id}`} data-toggle="tab">Customer Details</a>
          </li>
          <li>
            <a href={`#processSetup${that.props.data._id}`} data-toggle="tab">Activity Details</a>
          </li>
          <li>
            <a  href={`#deviceDetails${that.props.data._id}`} data-toggle="tab">Device Details</a>
          </li>
          <li>
            <a  href={`#history${that.props.data._id}`} data-toggle="tab">History</a>
          </li>
          <li>
            <a  href={`#notes${that.props.data._id}`} data-toggle="tab">Notes</a>
          </li>
        </ul>
        <div className="tab-content clearfix">
          <div className="tab-pane active" id={`customerDetails${that.props.data._id}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="User Id" value={that.state.data.userId} className="form-control float-label" readOnly="true"/>
                </div>
                <div className="form-group ">
                  <input type="text" placeholder="Transaction Id" value={that.state.data.transactionId} className="form-control float-label"  readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Date & Time" value={moment(that.props.data.createdAt).format('DD-MM-YYYY')} className="form-control float-label"  readOnly="true"/>
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  <input type="text" placeholder="Name" value={that.props.data.name} className="form-control float-label"  readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Email" value={that.props.data.email} className="form-control float-label"  readOnly="true"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Phone Number" value={that.props.data.userDetails.mobileNumber} className="form-control float-label"  readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Cluster" value={that.props.data.userDetails.clusterName} className="form-control float-label"  readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Chapter" value={that.props.data.userDetails.chapterName} className="form-control float-label"  readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Sub Chapter" value={that.props.data.userDetails.subChapterName} className="form-control float-label"  readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Community" value={that.props.data.userDetails.communityName} className="form-control float-label"  readOnly="true"/>
                </div>
                 <br className="clearfix" />
              </div>
            </div>
          </div>
          <div className="tab-pane" id={`processSetup${that.props.data._id}`}>
            <div className="panel panel-default">
              <MlServiceManageSchedule data={this.props.data}/>
            </div>
          </div>
          <div className="tab-pane" id={`deviceDetails${that.props.data._id}`}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="Device Name" value={that.state.data.deviceDetails&&that.state.data.deviceDetails.deviceName?that.state.data.deviceDetails.deviceName:""} className="form-control float-label"  readOnly="true"/>
                </div>
                <div className="form-group ">
                  <input type="text" placeholder="Device Id" value={that.state.data.deviceDetails&&that.state.data.deviceDetails.deviceId?that.state.data.deviceDetails.deviceId:""} className="form-control float-label" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input type="text" placeholder="IP Address" value={that.state.data.deviceDetails&&that.state.data.deviceDetails.ipAddress?that.state.data.deviceDetails.ipAddress:""} className="form-control float-label"  readOnly="true"/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="IP Location" value={that.state.data.deviceDetails&&that.state.data.deviceDetails.location?that.state.data.deviceDetails.location:""} className="form-control float-label"  readOnly="true"/>
                </div>
                <br className="clearfix" />
              </div>
            </div>
          </div>
          <div className="tab-pane" id={`notes${this.props.data._id}`}>
            <div className="row">
              <div className="col-md-9">
                <div className="form-group">
                  <textarea placeholder="Notes"  className="form-control float-label" id=""></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



