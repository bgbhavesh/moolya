/** ************************************************************
 * Date: 19 Jun, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This is the expanded component described in detail
 * JavaScript XML file MlServiceCardsDetailsComponent.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React from 'react';
import { initalizeFloatLabel, OnToggleSwitch } from '../../../../../../commons/utils/formElemUtil';
import MlServiceManageSchedule from './MlServicesComponent'
import _ from 'lodash';
import {
  getServiceBasedOnServiceId,
  fetchTaskDetailsForAdminServiceCard
} from '../../action/mlFindService'
// import { getAdminUserContext } from '../../../../../commons/getAdminUserContext';
const FontAwesome = require('react-fontawesome');

export default class MlServiceCardsDetailsComponent extends React.Component {
  /**
   * Constructor
   * @param props :: Object - Parents data
   */

  constructor(props) {
    super(props);
    this.state = {
      profileId: props.profileId,
      serviceId: props._id,
      data: {
        finalAmount: 0,
        prevFinalAmount: 0,
        serviceBasicInfo: {
          duration: {}
        },
        serviceTask: {
          selectedTaskDetails: {
            displayName: '',
            noOfSession: '',
            sessionFrequency: '',
            duration: {
              hours: 0,
              minutes: 0
            }
          }
        },
        service: {},
        serviceTermAndCondition: {},
        attachments: [],
        servicePayment: {},
        facilitationCharge: {},
        tasks: [],
        taxStatus: 'taxexclusive',
        clusterData: {},
        isLoding: false
      }
    };
    this.options = [
      { value: 'Weekly', label: 'Weekly' },
      { value: 'Daily', label: 'Daily' },
      { value: 'Monthly', label: 'Monthly' }
    ];
    this.getServiceDetails = this.getServiceDetails.bind(this);
    this.constructServiceData = this.constructServiceData.bind(this);
  }
  /**
   * ComponentDidMount
   * Desc :: Initializing the float labels
   */

  componentDidMount() {
    initalizeFloatLabel();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profileId: nextProps.profileId,
      serviceId: nextProps._id
    });
    if (nextProps.data) {
      this.constructServiceData(nextProps.data);
      // this.loggedUserDetails = {};// getAdminUserContext();
      // this.getServiceDetails();
    }
  }

  /**
   * componentDidUpdate
   * Desc :: Updating the toggle switch
   */

  componentDidUpdate() {
    OnToggleSwitch(true, true);
  }

  /**
   * componentWillMount
   * Desc :: Calls getServiceDetails with profileId as param
   */
  // componentWillMount() {
  //   this.loggedUserDetails = {};//getAdminUserContext();
  //   this.getServiceDetails();
  // }

  /**
   * Method :: getServiceDetails
   * Desc   :: Get the service details based on the profileId
   * @param :: profileId - type : String
   * @returns resp
   */

  async getServiceDetails() {
    const resp = await getServiceBasedOnServiceId(this.state.serviceId, this.loggedUserDetails);
    if (resp) {
      this.constructServiceData(resp);
    }
  }

  /**
   * Method :: constructServiceData
   * Desc   :: construct the current service details from server and set in state
   * @returns Void
   */
  async constructServiceData(serviceDeatails) {
    let {
      serviceBasicInfo, finalAmount, prevFinalAmount, clusterData, serviceTask, service, tasks, serviceTermAndCondition, attachments, servicePayment, taxStatus, facilitationCharge
    } = this.state.data;
    let { data } = this.state;
    const resp = await fetchTaskDetailsForAdminServiceCard(this.state.profileId, this.state.serviceId, {});
    serviceTask.serviceTaskDetails = resp;
    if (this.state.serviceId && serviceDeatails) {
      service = serviceDeatails;
      tasks = [];
      const { state, city, community } = service;
      finalAmount = service.finalAmount || 0;
      prevFinalAmount = service.finalAmount || 0;
      serviceBasicInfo = {
        duration: service.duration,
        profileId: service.profileId,
        name: service.name,
        displayName: service.displayName,
        noOfSession: service.noOfSession,
        sessionFrequency: service.sessionFrequency,
        status: service.status,
        validTill: service.validTill,
        cluster: service.cluster,
        isBeSpoke: service.isBeSpoke,
        isApproved: service.isApproved,
        city: service.city,
        state: service.state,
        community: service.community
      };
      tasks = _.cloneDeep(service.tasks) || [];
      tasks.sessions = _.cloneDeep(service.tasks.sessions) || [];
      serviceTask.serviceOptionTasks = [];
      const attachmentDetails = [];
      serviceTask.tasks = service.tasks || [];
      if (serviceTask.serviceTaskDetails && serviceTask.serviceTaskDetails.length > 0) {
        serviceTask.tasks = _.intersectionBy(serviceTask.serviceTaskDetails, service.tasks, 'id');
        serviceTask.serviceTaskDetails.forEach((task, key) => {
          if (service.tasks.map(data => data.id).indexOf(task.id) === -1) {
            serviceTask.serviceOptionTasks.push(task);
          }
        });
        serviceTask.tasks.forEach((task) => {
          if (task.attachments && task.attachments.length > 0) {
            task.attachments.forEach((attachment) => {
              attachmentDetails.push(attachment)
            });
          }
        });
      }
      if (service.termsAndCondition) {
        serviceTermAndCondition = _.omit(service.termsAndCondition, '__typename');
      }
      if (service.facilitationCharge) {
        facilitationCharge = _.cloneDeep(service.facilitationCharge);
      }
      if (service.payment) {
        servicePayment = _.cloneDeep(service.payment);
        servicePayment.isTaxInclusive = !!servicePayment.isTaxInclusive;
        taxStatus = servicePayment.isTaxInclusive ? 'taxinclusive' : 'taxexclusive';
      }
      attachments = _.cloneDeep(attachmentDetails);
      if (state && state.length > 0) {
        const states = [];
        state.forEach((data) => {
          states.push(data.id);
        });
        clusterData.state = states;
      }
      if (city && city.length > 0) {
        const cities = [];
        city.forEach((data) => {
          cities.push(data.id);
        });
        clusterData.chapters = cities;
      }
      if (community && community.length > 0) {
        const communities = [];
        community.forEach((data) => {
          communities.push(data.id);
        });
        clusterData.community = communities;
      }
    }
    const validTillDate = Date.parse(serviceBasicInfo.validTill);
    const currentDate = new Date();
    let remainingDate = Math.floor((validTillDate - currentDate) / (1000 * 60 * 60 * 24));
    remainingDate = isNaN(remainingDate) ? '' : remainingDate;
    data = {
      serviceBasicInfo,
      daysRemaining: remainingDate,
      clusterData,
      serviceTask,
      serviceTermAndCondition,
      attachments,
      service,
      tasks,
      facilitationCharge,
      servicePayment,
      taxStatus,
      isLoding: true,
      finalAmount,
      prevFinalAmount,
      userDetails: {}
    };
    this.setState({ data });
  }

  /**
   * Render
   * Desc   :: Render the HTML for this component
   * @returns {HTML}
   */

  render() {
    const that = this;
    if (!this.state.data.isLoding) {
      return null;
    }
    return (
      <MlServiceManageSchedule
        data={this.state.data}
        profileId={this.state.profileId}
        serviceId={this.state.serviceId} />
    );
  }
}

