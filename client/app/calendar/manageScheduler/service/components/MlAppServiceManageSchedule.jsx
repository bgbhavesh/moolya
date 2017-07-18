/**
 * Parent component for service
 * @Author :: Mukhil P
 * @Dated :: 20/06/2017
 */

// import NPM module(s)
import React, {Component} from "react";
import Moment from "moment";
import _ from 'lodash';

// import custom method(s) and component(s)
import MlAppScheduleHead from '../../commons/components/MlAppScheduleHead';
import StepZilla from '../../../../../commons/components/stepzilla/StepZilla';
import MlAppServiceBasicInfo from './MlAppServiceBasicInfo';
import MlAppServiceSelectTask from './MlAppServiceSelectTask';
import MlAppServiceTermsAndConditions from './MlAppServiceTermsAndConditions';
import MlAppServicePayment from './MlAppServicePayment';
import MlAppServiceHistory from "./MlAppServiceHistory";
import {
  createServiceActionHandler,
  fetchServiceActionHandler,
  fetchProfileActionHandler,
  updateServiceActionHandler,
  fetchTasksAmountActionHandler,
  fetchTaskDetailsForServiceCard
} from '../actions/MlServiceActionHandler';
import {fetchTaskDetailsActionHandler} from '../../task/actions/fetchTaskDetails';

export default class MlAppServiceManageSchedule extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props) {
    super(props);
    this.state = {
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
      taxStatus: 'taxexclusive',
      clusterData: {}
    };
    this.options = [
      {value: 'Weekly', label: 'Weekly'},
      {value: 'Daily', label: 'Daily'},
      {value: 'Monthly', label: 'Monthly'}
    ];
    this.profileId = FlowRouter.getParam('profileId');
    this.serviceId = FlowRouter.getQueryParam('id');
    this.getServiceDetails = this.getServiceDetails.bind(this);
    this.saveService = this.saveService.bind(this);
    this.onChangeFormField = this.onChangeFormField.bind(this);
    this.checkBoxHandler = this.checkBoxHandler.bind(this);
    this.validTill = this.validTill.bind(this);
    this.setSessionFrequency = this.setSessionFrequency.bind(this);
    this.optionsBySelectstates = this.optionsBySelectstates.bind(this);
    this.optionsBySelectChapters = this.optionsBySelectChapters.bind(this);
    this.optionsBySelectCommunities = this.optionsBySelectCommunities.bind(this);
    this.optionsBySelectService = this.optionsBySelectService.bind(this);
    this.updateSessionSequence = this.updateSessionSequence.bind(this);
    this.onChangeCheckBox = this.onChangeCheckBox.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.checkDiscountEligibility = this.checkDiscountEligibility.bind(this);
    this.calculateDiscounts = this.calculateDiscounts.bind(this);
    this.checkTaxStatus = this.checkTaxStatus.bind(this);
    this.checkPromoStatus = this.checkPromoStatus.bind(this);
    this.checkDiscountStatus = this.checkDiscountStatus.bind(this);
  }

  componentWillMount() {
    this.getUserProfile();
    this.getTaskDetailsForService();
  }

  componentDidMount() {
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
  }

  /**
   * Method :: setServiceSteps
   * Desc :: Sets components steps for stepzila to create and update service data
   */
  setServiceSteps() {
    const {
      serviceBasicInfo,
      daysRemaining,
      clusterCode,
      clusters,
      clusterName,
      serviceTermAndCondition,
      attachments,
      servicePayment,
      facilitationCharge,
      taxStatus,
      serviceTask
    } = this.state;
    let steps = [
      {
        name: 'Create',
        component: <MlAppServiceBasicInfo data={serviceBasicInfo}
                                          clusterCode={clusterCode}
                                          clusterName={clusterName}
                                          clusters={clusters}
                                          clusterData={this.state.clusterData}
                                          daysRemaining={daysRemaining}
                                          optionsBySelectstates={this.optionsBySelectstates}
                                          optionsBySelectChapters={this.optionsBySelectChapters}
                                          optionsBySelectCommunities={this.optionsBySelectCommunities}
                                          getServiceDetails={this.getServiceDetails}
                                          saveService={this.saveService}
                                          options={this.options}
                                          checkBoxHandler={this.checkBoxHandler}
                                          validTill={this.validTill}
                                          setSessionFrequency={this.setSessionFrequency}
                                          onChangeFormField={this.onChangeFormField}/>,
        icon: <span className="ml fa fa-plus-square-o"></span>
      },
      {
        name: 'Select Tasks',
        component: <MlAppServiceSelectTask serviceTask={serviceTask}
                                           profileId={this.profileId}
                                           serviceId={this.serviceId}
                                           getServiceDetails={this.getServiceDetails}
                                           saveService={this.saveService}
                                           optionsBySelectService={this.optionsBySelectService}
                                           updateSessionSequence={this.updateSessionSequence}
        />,
        icon: <span className="ml fa fa-users"></span>
      },
      {
        name: 'Terms & Conditions',
        component: <MlAppServiceTermsAndConditions serviceTermAndCondition={serviceTermAndCondition}
                                                   attachments={attachments}
                                                   onChangeCheckBox={this.onChangeCheckBox}
                                                   onChangeValue={this.onChangeValue}
                                                   getServiceDetails={this.getServiceDetails}
                                                   saveService={this.saveService}/>,
        icon: <span className="ml ml-payments"></span>
      },
      {
        name: 'Payment',
        component: <MlAppServicePayment servicePayment={servicePayment}
                                        taxStatus={taxStatus}
                                        facilitationCharge={facilitationCharge}
                                        checkDiscountEligibility={this.checkDiscountEligibility}
                                        calculateDiscounts={this.calculateDiscounts}
                                        checkTaxStatus={this.checkTaxStatus}
                                        checkPromoStatus={this.checkPromoStatus}
                                        checkDiscountStatus={this.checkDiscountStatus}
                                        saveService={this.saveService}/>,
        icon: <span className="ml ml-payments"></span>
      },
      {
        name: 'History',
        component: <MlAppServiceHistory />,
        icon: <span className="ml ml-moolya-symbol"></span>
      }
    ];
    return steps;
  }

  async getTaskDetailsForService() {
    let {serviceTask} = this.state;
    if (this.profileId) {
      const resp = await fetchTaskDetailsForServiceCard(this.profileId, this.serviceId);
      serviceTask.serviceTaskDetails = resp;
      this.setState({serviceTask: serviceTask})
    }
  }

  /**
   * Method :: optionsBySelectService
   * Desc :: Set the current selected task and tab
   */
  optionsBySelectService(taskId) {
    let {serviceTask} = this.state;
    if (taskId) {
      serviceTask.selectedTaskId = taskId;
      let selectedTaskDetails = serviceTask.serviceTaskDetails.filter((task) => {
        return task.id === taskId
      });
      selectedTaskDetails = selectedTaskDetails[0];
      serviceTask.selectedTaskDetails = {
        id: selectedTaskDetails.id,
        sequence: selectedTaskDetails.sequence,
        displayName: selectedTaskDetails.displayName || '',
        noOfSession: selectedTaskDetails.noOfSession || '',
        sessionFrequency: selectedTaskDetails.sessionFrequency || '',
        duration: selectedTaskDetails.duration || {},
        session: selectedTaskDetails.session || []
      };
    } else {
      serviceTask.selectedTaskDetails = {
        id: '',
        sequence: '',
        displayName: '',
        noOfSession: '',
        sessionFrequency: '',
        duration: {hours: '', minutes: ''},
        session: []
      };
      serviceTask.selectedTaskId = '';
    }
    this.setState({
      serviceTask: serviceTask
    });
  }

  /**
   * Method :: updateSessionSequence
   * Desc :: Update the session sequence of task
   */
  updateSessionSequence(evt, sessionId) {
    let {selectedTaskId, serviceTaskDetails, selectedTaskDetails} = this.state.serviceTask;
    if (evt.target.id === 'tasksequence') {
      selectedTaskDetails.sequence = evt.target.value;
    } else {
      let sessionIndex = selectedTaskDetails.session.findIndex((session) => {
        return session.sessionId === sessionId;
      });
      if (sessionIndex !== -1) {
        let sessionDetails = _.cloneDeep(selectedTaskDetails.session);
        sessionDetails[sessionIndex]['sequence'] = evt.target.value;
        selectedTaskDetails.session = sessionDetails;
      }
    }
    this.setState({selectedTaskDetails: selectedTaskDetails});
  }

  /**
   * Method :: getServiceDetails
   * Desc   :: fetch the current service details from server and set in state
   * @returns Void
   */
  async getServiceDetails() {
    let {serviceBasicInfo, clusterData, serviceTask, service, serviceTermAndCondition, attachments, servicePayment, taxStatus, facilitationCharge} = this.state;
    if (this.serviceId) {
      service = await fetchServiceActionHandler(this.serviceId);
      if (service) {
        let {state, city, community} = service;
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
        serviceTask.serviceOptionTasks = [];
        let attachmentDetails = [];
        serviceTask.tasks = service.tasks || [];
        if (serviceTask.serviceTaskDetails && serviceTask.serviceTaskDetails.length > 0) {
          serviceTask.tasks = _.intersectionBy(serviceTask.serviceTaskDetails, service.tasks, 'id');
          serviceTask.serviceTaskDetails.forEach((task, key) => {
            if (service.tasks.map((data) => data.id).indexOf(task.id) === -1) {
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
          taxStatus = servicePayment.isTaxInclusive ? 'taxinclusive' : 'taxexclusive';
        }
        attachments = _.cloneDeep(attachmentDetails);
        if (state && state.length > 0) {
          let states = [];
          state.forEach((data) => {
            states.push(data.id);
          });
          clusterData.state = states;
        }
        if (city && city.length > 0) {
          let cities = [];
          city.forEach((data) => {
            cities.push(data.id);
          });
          clusterData.chapters = cities;
        }
        if (community && community.length > 0) {
          let communities = [];
          community.forEach((data) => {
            communities.push(data.id);
          });
          clusterData.community = communities;
        }
      }
    }
    var validTillDate = Date.parse(serviceBasicInfo.validTill);
    var currentDate = new Date();
    let remainingDate = Math.floor((validTillDate - currentDate) / (1000 * 60 * 60 * 24));
    remainingDate = isNaN(remainingDate) ? '' : remainingDate;
    this.setState({
      serviceBasicInfo: serviceBasicInfo,
      daysRemaining: remainingDate,
      clusterData: clusterData,
      serviceTask: serviceTask,
      serviceTermAndCondition: serviceTermAndCondition,
      attachments: attachments,
      service: service,
      facilitationCharge: facilitationCharge,
      servicePayment: servicePayment,
      taxStatus: taxStatus
    }, () => {
      this.getUserProfile();
    });
  }

  /**
   * Method :: getUserProfile
   * Desc :: Get the current user profile
   */
  async getUserProfile() {
    const resp = await fetchProfileActionHandler(this.profileId);
    if (resp) {
      this.setState({
        clusters: resp.clusterId,
        clusterName: resp.clusterName,
        clusterCode: resp.countryId
      });
    }
  }

  /**
   * Method :: showResponseMsg
   * Desc :: Show to error(s) or success(es) msg
   * @param response :: server response
   */
  showResponseMsg(response, msg) {
    if (response.success) {
      toastr.success(msg);
    } else {
      toastr.error(response.result);
    }
  }

  /**
   * Method :: onChangeCheckBox
   * Desc :: Set the boolean value
   */
  onChangeCheckBox(event) {
    let {serviceTermAndCondition} = this.state;
    if (event.target.id === 'schedulable') {
      serviceTermAndCondition.isReschedulable = !event.target.checked;
    } else {
      serviceTermAndCondition.isCancelable = !event.target.checked;
    }
    this.setState({serviceTermAndCondition: serviceTermAndCondition});
  }

  /**
   * Method :: onChangeValue
   * Desc :: Sets the current value in term and condition
   */
  onChangeValue(event) {
    let {serviceTermAndCondition} = this.state;
    let {id, value} = event.target;
    if (event.target.id === 'rescheduler') {
      serviceTermAndCondition.noOfReschedulable = value;
    } else {
      serviceTermAndCondition.noOfDaysBeforeCancelation = value;
    }
    this.setState({serviceTermAndCondition: serviceTermAndCondition});
  }

  /**
   * Method :: saveService
   * Desc   :: Save service data on server
   * @param data :: Object :: Service data
   * @returns Void
   */
  async saveService(isRedirectWithList) {
    let {clusters, clusterName, chapterName, stateName, communitiesName, serviceBasicInfo, serviceTask, service, serviceTermAndCondition, servicePayment, facilitationCharge} = this.state;
    if (chapterName) {
      let cities = [];
      chapterName.map((data) => {
        cities.push({id: data.value, name: data.label})
      });
      serviceBasicInfo.city = cities;
    }

    if (stateName) {
      let states = [];
      stateName.map((data) => {
        states.push({id: data.value, name: data.label})
      });
      serviceBasicInfo.state = states;
    }

    if (communitiesName) {
      let communities = [];
      communitiesName.map((data) => {
        communities.push({id: data.value, name: data.label})
      });
      serviceBasicInfo.community = communities;
    }
    let services = {
      userId: '',
      profileId: this.profileId,
      name: serviceBasicInfo.name,
      displayName: serviceBasicInfo.displayName,
      noOfSession: serviceBasicInfo.noOfSession,
      sessionFrequency: serviceBasicInfo.sessionFrequency,
      duration: {
        hours: serviceBasicInfo.duration.hours,
        minutes: serviceBasicInfo.duration.minutes
      },
      status: serviceBasicInfo.status,
      validTill: serviceBasicInfo.validTill ? new Moment(serviceBasicInfo.validTill).format(Meteor.settings.public.dateFormat) : null,
      city: serviceBasicInfo.city,
      cluster: {
        id: clusters,
        name: clusterName
      },
      state: serviceBasicInfo.state,
      community: serviceBasicInfo.community
    };
    if (serviceTask.selectedTaskDetails && serviceTask.selectedTaskId) {
      let sessions = [];
      let serviceDetails = service.tasks && service.tasks.filter((task) => {
          return task.id === serviceTask.selectedTaskId
        });
      let taskSequence;
      if (serviceTask.selectedTaskDetails.session && serviceTask.selectedTaskDetails.session.length > 0) {
        if (serviceDetails && serviceDetails.length > 0) {
          taskSequence = serviceDetails[0].sequence;
        }
        serviceTask.selectedTaskDetails.session.forEach((session, index) => {
          let seqData = '';
          if (taskSequence) {
            seqData = serviceDetails[0]['sessions'][index].sequence;
          }
          sessions.push({id: session.sessionId, sequence: (session.sequence || seqData)})
        });
      }
      services.tasks = [];
      let task = {
        id: serviceTask.selectedTaskDetails.id,
        sequence: serviceTask.selectedTaskDetails.sequence || taskSequence,
        sessions: sessions
      };
      services.tasks.push(task);
      serviceTask.tasks.map((task) => {
        if (task.id !== serviceTask.selectedTaskId) {
          let sessionDetails = [];
          let serviceDetails = service.tasks && service.tasks.filter((taskData) => {
              return task.id === taskData.id
            });
          let isServiceDetails = false;
          if (serviceDetails && serviceDetails.length > 0) {
            isServiceDetails = true
          }
          if (task.session && task.session.length > 0) {
            task.session.forEach((session, index) => {
              let seqData = '';
              if (isServiceDetails) {
                seqData = serviceDetails[0]['sessions'][index].sequence;
              }
              sessionDetails.push({id: session.sessionId, sequence: session.sequence || seqData})
            });
          }
          services.tasks.push({
            id: task.id,
            sequence: task.sequence || serviceDetails[0].sequence,
            sessions: sessionDetails
          })
        }
      });
    }
    if (!_.isEmpty(serviceTermAndCondition)) {
      services.termsAndCondition = _.cloneDeep(serviceTermAndCondition);
    }
    services.payment = servicePayment;
    services.facilitationCharge = facilitationCharge;
    if (!this.serviceId) {
      const resp = await createServiceActionHandler(services);
      this.showResponseMsg(resp, 'Created Successfully');
      if (resp.success) {
        this.serviceId = resp.result;
        this.setState({serviceTask: service});
        FlowRouter.setQueryParams({id: this.serviceId});
      }
    } else {
      const resp = await updateServiceActionHandler(this.serviceId, services);
      if (resp.success && serviceTask.selectedTaskId) {
        serviceTask.tasks = _.intersectionBy(serviceTask.serviceTaskDetails, services.tasks, 'id');
        serviceTask.serviceOptionTasks = [];
        let attachmentDetails = [];
        serviceTask.serviceTaskDetails.forEach((task) => {
          if (services.tasks.map((data) => data.id).indexOf(task.id) === -1) {
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
        this.setState({serviceTask: serviceTask, attachments: attachmentDetails});
      }
      this.showResponseMsg(resp, 'Updated Successfully');
      if (isRedirectWithList) {
        FlowRouter.go(`/app/calendar/manageSchedule/${this.profileId}/serviceList`);
      }
    }
  }

  /**
   * Method :: checkDiscountEligibility
   * Desc :: Check the eligibility
   */
  checkDiscountEligibility(event) {
    let {servicePayment} = this.state;
    servicePayment.isDiscount = !event.target.checked;
    if (!servicePayment.isDiscount) {
      servicePayment.discountType = '';
    }
    this.setState({servicePayment: servicePayment});
  }

  /**
   * Method :: calculateDiscounts
   * Desc :: Calculate the discount as per discount status
   */
  calculateDiscounts(event) {
    let {servicePayment, facilitationCharge} = this.state;
    if (servicePayment.isDiscount) {
      switch (servicePayment.discountType) {
        case 'amount':
          if (parseFloat(event.target.value) >= 0) {
            servicePayment.discountValue = event.target.value;
            if (facilitationCharge.amount) {
              let facilitationAmount = facilitationCharge.amount ? parseFloat(facilitationCharge.amount) : 0;
              if (facilitationAmount) {
                facilitationCharge.derivedAmount = parseFloat(servicePayment.tasksDerived) + parseFloat(facilitationCharge.amount);
              }
            } else {
              facilitationCharge.derivedAmount = parseFloat(servicePayment.tasksDerived) - parseFloat(servicePayment.discountValue);
            }
            this.setState({
              servicePayment: servicePayment,
              facilitationCharge: facilitationCharge
            });
          }
          break;
        case 'percent':
          if (parseFloat(event.target.value) >= 0) {
            servicePayment.discountValue = event.target.value;
            if (facilitationCharge.percentage) {
              let facilitationAmount = facilitationCharge.percentage ? parseFloat(facilitationCharge.percentage) : 0;
              if (facilitationAmount) {
                let percentageAmmount = (parseFloat(servicePayment.tasksDerived) * parseFloat(facilitationCharge.percentage)) / 100;
                facilitationCharge.derivedAmount = percentageAmmount + parseFloat(servicePayment.tasksDerived);
              }
            } else {
              let percentageAmmount = (parseFloat(servicePayment.tasksDerived) * parseFloat(servicePayment.discountValue)) / 100;
              facilitationCharge.derivedAmount = parseFloat(servicePayment.tasksDerived) - percentageAmmount;
            }
            this.setState({
              servicePayment: servicePayment,
              facilitationCharge: facilitationCharge
            });
          }
          break;
        default:
        // do nothing
      }
    }
    this.setState({servicePayment: servicePayment});
  }

  /**
   * Method :: checkDiscountStatus
   * Desc :: Check the discount as per discount eligibility
   */
  checkDiscountStatus(event) {
    let {servicePayment} = this.state;
    if (servicePayment.isDiscount) {
      servicePayment.discountType = event.target.id;
    }
    this.setState({servicePayment: servicePayment});
  }

  /**
   * Method :: checkTaxStatus
   * Desc :: Check the tax status
   */
  checkTaxStatus(event) {
    let {servicePayment, taxStatus} = this.state;
    taxStatus = event.target.id;
    if (taxStatus === 'taxinclusive') {
      servicePayment.isTaxInclusive = true;
    } else {
      servicePayment.isTaxInclusive = false;
    }
    this.setState({servicePayment: servicePayment, taxStatus: taxStatus});
  }

  /**
   * Method :: checkPromoStatus
   * Desc :: Check the promo code status
   */
  checkPromoStatus(event) {
    let {servicePayment} = this.state;
    servicePayment.isPromoCodeApplicable = !event.target.checked;
    this.setState({servicePayment: servicePayment});
  }

  /**
   * Method :: onChangeFormField
   * Desc :: Set the current changed value in state
   * @return Void
   */
  onChangeFormField(event) {
    const {id, value} = event.target;
    let {serviceBasicInfo} = this.state;
    serviceBasicInfo[id] = value ? value.trim() : '';
    this.setState({serviceBasicInfo: serviceBasicInfo});
  }

  /**
   * Method :: checkBoxHandler
   * Desc :: set the current status
   * @return Void
   */
  checkBoxHandler(event) {
    let {serviceBasicInfo} = this.state;
    serviceBasicInfo.status = event.target.checked;
    this.setState({serviceBasicInfo: serviceBasicInfo});
  }

  /**
   * Method :: validTill
   * Desc :: set the current date time picker
   */
  validTill(event) {
    if (event._d) {
      let value = new Moment(event._d);
      let {serviceBasicInfo} = this.state;
      serviceBasicInfo.validTill = value;
      this.setState({serviceBasicInfo: serviceBasicInfo});
    }
  }

  /**
   * Method :: optionsBySelectChapters
   * Desc :: set the current chapter details
   */
  optionsBySelectChapters(value, calback, selObject) {
    let {serviceBasicInfo, clusterData} = this.state;
    serviceBasicInfo.chapters = value;
    clusterData.chapters = value;
    this.setState({
      serviceBasicInfo: serviceBasicInfo,
      clusterData: clusterData,
      chapterName: selObject,
      subChapterName: null
    });
  }

  /**
   * Method :: optionsBySelectstates
   * Desc :: set the current state details
   */
  optionsBySelectstates(value, calback, selObject) {
    let {serviceBasicInfo, clusterData} = this.state;
    serviceBasicInfo.state = value;
    clusterData.state = value;
    this.setState({
      serviceBasicInfo: serviceBasicInfo,
      clusterData: clusterData,
      stateName: selObject
    });
  }

  /**
   * Method :: optionsBySelectCommunities
   * Desc :: set the current community details
   */
  optionsBySelectCommunities(value, calback, selObject) {
    let {serviceBasicInfo, clusterData} = this.state;
    serviceBasicInfo.community = value;
    clusterData.community = value;
    this.setState({
      serviceBasicInfo: serviceBasicInfo,
      clusterData: clusterData,
      communitiesName: selObject
    });
  }

  /**
   * Method :: setSessionFrequency
   * Desc :: set the current frequency details
   */
  setSessionFrequency(value) {
    let serviceBasicInfo = this.state.serviceBasicInfo;
    serviceBasicInfo.sessionFrequency = value;
    this.setState({serviceBasicInfo: serviceBasicInfo})
  }

  /**
   * Method :: React render
   * Desc :: Showing html page
   * @returns {XML}
   */
  render() {
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <MlAppScheduleHead type="service"/>
          <div className="clearfix"/>
          <div className="col-md-12">
            <div className='step-progress'>
              <div id="root">
                <StepZilla steps={this.setServiceSteps()}
                           stepsNavigation={false}
                           prevBtnOnLastStep={true}/>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
};
