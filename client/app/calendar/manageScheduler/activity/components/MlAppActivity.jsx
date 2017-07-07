/** ************************************************************
 * Date: 19 Jun, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This will manage the activities
 * JavaScript XML file MlAppActivity.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React, {Component} from "react";
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";
import StepZilla from "../../../../../commons/components/stepzilla/StepZilla";
import MlAppBasicInfo from "./MlAppActivityBasicInfo";
import MlAppChooseTeam from "./MlAppChooseTeam";
import MlAppActivityPayment from "./MlAppActivityPayment";
import MlAppActivityHistory from "./MlAppActivityHistory";
import { createActivityActionHandler , getActivityActionHandler, updateActivityActionHandler }  from './../actions/activityActionHandler';

export default class MlAppActivity extends Component {

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props) {
    super(props)
    this.state = {
      activityId: " ",
      basicInfo: {
        industryTypes:[],
        duration: {},
        deliverable: ['']
      },
      teamInfo: [{
        users:[]
      }],
      paymentInfo:{
        isDiscount: false
      },
    };
  }

  /**
   * ComponentDidMount
   * Desc :: Initializing the switch and fetch activity data in edit mode
   */
  componentDidMount() {
    $('.switch input').change(function () {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
    this.getActivityDetails();
  }

  /**
   * Method :: getActivityDetails
   * Desc   :: fetch the current activity details from server and set in state
   * @returns Void
   */
  async getActivityDetails(){
    const that = this;
    let id = FlowRouter.getQueryParam('id');
    if(!id) {
      this.setState({editScreen:false})
    }else {
      let activity = await getActivityActionHandler(id);
      if(activity) {
        let duration = activity.duration ? activity.duration :{};
        duration = {
          hours   : duration.hours ? duration.hours   : '',
          minutes : duration.minutes ? duration.minutes : ''
        };

        /**
         * Set activity basic info
         */
        let activityBasicInfo = {
          name                  : activity.name,
          displayName           : activity.displayName,
          isInternal            : activity.isInternal,
          isExternal            : activity.isExternal,
          mode                  : activity.mode ? activity.mode : "online",
          isServiceCardEligible : activity.isServiceCardEligible,
          industryTypes         : activity.industryTypes ? activity.industryTypes : [],
          duration              : duration,
          deliverable           : activity.deliverable && activity.deliverable.length ? (new Array(activity.deliverable))[0] : [''],
          note                  : activity.note,
          imageLink             : activity.imageLink,
          conversation          : activity.conversation && activity.conversation.length ? (new Array(activity.conversation))[0] : []
        };
        let teamInfo = activity.teams ? activity.teams : [{users: []}];
        teamInfo = teamInfo.map(function (team) {
          return {
            resourceId: team.resourceId,
            resourceType: team.resourceType,
            users: team.users.map(function (user) {
              return {
                userId: user.userId,
                profileId: user.profileId,
                isMandatory: user.isMandatory
              }
            })
          }
        });

        let paymentInfo = activity.payment ? activity.payment : {};

        paymentInfo = {
          amount: paymentInfo.amount ? paymentInfo.amount : '',
          derivedAmount: paymentInfo.derivedAmount ? paymentInfo.derivedAmount : '',
          discountType: paymentInfo.discountType ? paymentInfo.discountType : '',
          discountValue: paymentInfo.discountValue ? paymentInfo.discountValue : '',
          isDiscount: paymentInfo.isDiscount ? paymentInfo.isDiscount : false
        };

        that.setState({
          basicInfo: activityBasicInfo,
          teamInfo: teamInfo,
          paymentInfo: paymentInfo
        });
      }
    }
  }

  /**
   * Method :: saveActivity
   * Desc   :: Save activity data on server
   * @param data :: Object :: Activity data
   * @returns Void
   */
  async saveActivity(data) {
    let id = FlowRouter.getQueryParam('id');
    let profileId = FlowRouter.getParam('profileId');
    if(!profileId) {
      toastr.error("Please a profile");
      return false;
    }
    data.profileId = profileId;
    if(id){
      const res = await updateActivityActionHandler(id, data);
      if(res){
        toastr.success("Saved Successfully");
      }
    } else {
      const res = await createActivityActionHandler(data);
      if(res) {
        toastr.success("Saved Successfully");
        FlowRouter.setQueryParams({id:res.result});
      }
    }
  }

  /**
   * Render
   * Desc   :: Render the HTML for this component
   * @returns {HTML}
   */
  render() {
    const that = this;

    /**
     * Setting up steps for activity different step
     */
    const steps = [
        {
          name: 'Create',
          component: <MlAppBasicInfo saveActivity={that.saveActivity} data={that.state.basicInfo} />,
          icon: <span className="ml fa fa-plus-square-o"></span>
        },
        {
          name: 'Choose team',
          component: <MlAppChooseTeam saveActivity={that.saveActivity} data={this.state.teamInfo}/>,
          icon: <span className="ml fa fa-users"></span>
        },
        {
          name: 'Payment', component:
          <MlAppActivityPayment saveActivity={that.saveActivity} data={this.state.paymentInfo} />,
          icon: <span className="ml ml-payments"></span>
        },
        {
          name: 'History',
          component: <MlAppActivityHistory />,
          icon: <span className="ml ml-moolya-symbol"></span>
        }
      ];

    /**
     * Return the html to render
     */
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <MlAppScheduleHead s/>
          <div className="clearfix"/>
          <div className="col-md-12">
            <div className='step-progress'>
              <div id="root">
                <StepZilla steps={steps} stepsNavigation={false} prevBtnOnLastStep={true}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
